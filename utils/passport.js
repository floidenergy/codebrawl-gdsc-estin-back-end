/** @format */

const passport = require("passport");
const LocalStrategy = require("passport-local");

const User = require("../model/user");
const { validatePassword } = require("./passwordUtils");

// client authentication
passport.use(
    new LocalStrategy(async (username, password, done) => {
        const resultUser = await User.findOne({
            $or: [{ username: username }, { email: username }],
        });

        if (!resultUser)
            return done(
                { message: "Invalid Credentials" },
                false,
                "Invalid Credentials"
            );

        if (validatePassword(password, resultUser.hash, resultUser.salt)) {
            

            return done(null, resultUser);
        } else
            return done(
                { message: "Invalid Credentials" },
                false,
                "Invalid Credentials"
            )
    })
);

// //admin authentication
passport.use('admin-local',
    new LocalStrategy(async (username, password, done) => {
        const resultUser = await User.findOne({
            $or: [{ username: username }, { email: username }],
        });

        if (!resultUser)
            return done(
                { message: "Invalid Credentials" },
                false,
                "Invalid Credentials"
            );

        if (validatePassword(password, resultUser.hash, resultUser.salt)) {

            if(!resultUser.isAdmin)
                return done({message: "You Dont have access"}, false, "You Dont have access");

            return done(null, resultUser);
        } else
            return done(
                { message: "Invalid Credentials" },
                false,
                "Invalid Credentials"
            )
    })
)

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((userID, done) => {
    User.findById(userID)
        .then((user) => done(null, user))
        .catch((err) => done(err));
});
