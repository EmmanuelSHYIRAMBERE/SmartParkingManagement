import passport from "passport";
import googleStrategy from "passport-google-oauth2";

googleStrategy.Strategy;

passport.serializeUser(function (user, done) {
  /*
    From the user take just the id (to minimize the cookie size) and just code 
    to the done callback
    PS: You don't have to do it like this its just usually done like this
     
     */

  done(null, user);
});

passport.deserializeUser(function (user, done) {
  /*
    Instead of user this function usually receives the id
    then you use the id to select the user from the db and pass the user
    PS: You can later access this data in any routes in: req.user
    */

  done(null, user);
});

passport.use(
  new googleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);
