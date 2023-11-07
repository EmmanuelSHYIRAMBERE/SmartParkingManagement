import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import "dotenv/config";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

import holidaysRouter from "./routes";
import morgan from "morgan";
import session from "express-session";

import passport from "passport";
require("./utility/passport-setup");

const app = express();
const port = process.env.PORT;

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Holiday-Planners-Project API Documentation",
      version: "1.0.0",
      description:
        "This Holiday-Planners-Project API Documentation is designed to provide basics of how this API functions.",
    },
    servers: [
      {
        url: "https://holiday-planer-project.onrender.com/",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJSDoc(options);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));

app.use("/holidays", holidaysRouter);
app.use("/api-documentation", swaggerUI.serve, swaggerUI.setup(specs));
app.use("/uploads", express.static("tour_images"));

app.use(
  session({
    secret: process.env.JWT_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("htmlFiles/emailMessage.ejs");
});
app.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get("/success", (req, res) => {
  res.render("htmlFiles/profile.ejs", {
    name: req.user.displayName,
    email: req.user.emails[0].value,
    pic: req.user.photos[0].value,
  });
});

app.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/failed" }),
  function (req, res) {
    //Successful authentication, redirect home.
    res.redirect("/success");
  }
);

app.get("/logout", (req, res) => {
  req.session = null;
  req.logout();
  res.redirect("/");
});

// mongoose.set("strictQuery", false)
mongoose
  .connect(process.env.DB_connect_devs)
  .then((res) => {
    console.log(`connected to mongo DB`);
    app.listen(port, () =>
      console.log(
        `HoldaysPlanners project is running on port http://localhost:${port}`
      )
    );
  })
  .catch((error) => {
    console.log(error);
  });
