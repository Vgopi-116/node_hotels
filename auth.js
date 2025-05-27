const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy; // Also called as UserName and Password strategy

const Person = require("./models/Person");

passport.use(
  new LocalStrategy(async (USERNAME, password, done) => {
    //authentication logic here
    try {
      console.log("Received Credentials:", USERNAME, password);
      const user = await Person.findOne({ username: USERNAME });
      if (!user) return done(null, false, { message: "Incorrect username." });
      const isPasswordMatch = await user.comparePassword(password); // this checks if user schmema pass( which is entered is true with the current one)
      if (isPasswordMatch) {
        return done(null, user); // done has 3 param (err, user, info)
      } else {
        return done(null, false, { message: "Incorrect Password" });
      }
    } catch (error) {
      return done(error);
    }
  })
);

module.exports = passport;
