import passportLocal, { Strategy as LocalStrategy } from 'passport-local';
import { compare } from 'bcrypt';
import passport from 'passport';
import { findUserByEmail, findUserById } from './user-service.js';

/**
 * @type {passportLocal.VerifyFunction}
 */
const authenticateUser = (email, password, done) => {
    const user = findUserByEmail(email);
    if (!user) {
        return done(null, false, { message: 'user not found'});
    }

    compare(password, user.password).then((result) => {
        if (!result) {
            return done(null, false, { message: 'wrong password'});
        }

        done(null, user);
    }).catch(err => {
        done(err);
    });
}

export default () => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
    }, authenticateUser));

    // serialize user to session
    passport.serializeUser((user, done) => done(null, user.id));

    // get user ID from session, then use the ID to get user
    passport.deserializeUser((userId, done) => done(null, findUserById(userId)));

    return passport;
};
