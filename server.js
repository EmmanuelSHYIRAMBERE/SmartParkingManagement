import express from "express";
import cors from "cors";

import bodyParser from "body-parser";
import mongoose from "mongoose";
import "dotenv/config";
import holidaysRouter from "./routes";

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use("/holidays", holidaysRouter)

mongoose.set("strictQuery", false)
mongoose.connect(process.env.DB_connect_devs).then((res) => {
    console.log(`connected to mongo DB`)
    app.listen(port, () => console.log(`Holday-tour project is running on port http://localhost:${port}`))

}) .catch ((error) => {
    console.log(error)
})
