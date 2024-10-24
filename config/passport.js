const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User.model');  
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
},
async (accessToken, refreshToken, profile, done) => {
  try {
  //console.log(profile)
  console.log("ën ruta passport")
    let user = await User.findOne({ googleId: profile.id });
    if (!user) {
      user = await new User({
        googleId: profile.id,
        username: profile.displayName,
        email: profile.email || profile.emails[0].value
      }).save();
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    console.log("ën ruta passport deserialized")
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
