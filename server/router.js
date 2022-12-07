import express from 'express';
import passport from 'passport';
import * as controller from './controller.js';
import { alreadyLogin, needAuth } from './middleware.js';

const router = express.Router();

router.post(`/register`, controller.register);
router.get(`/login`, [alreadyLogin], controller.login);
router.get(`/profile`, [needAuth], controller.getUserProfile);
router.get(`/meal`, [needAuth], controller.listMeal);
router.post(`/auth`, passport.authenticate('local', {
    successRedirect: '/api/meal',
    failWithError: true, // throw error to be caught by error handler
    
    /* "failWithError" will be omitted if this prop is set */
    // failureRedirect: '/api/login'
}));
router.get('/logout', controller.logout)
router.get(`/send-message`, controller.publishMessage);

export default router;
