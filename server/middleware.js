// middleware for check auth
export const needAuth = (req, res, next) => {
    if (req.isAuthenticated()) return next();

    throw new Error('unauthorized');
}

// middleware for check auth
export const alreadyLogin = (req, res, next) => {
    if (req.isAuthenticated()) return res.redirect('/api/meal');

    next();
}
