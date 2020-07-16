const redirectLogin = (req, res, next) => {
    if (!req.session.signin) {
        res.redirect('/signin');
    } else {
        next();
    }
}

const redirectDashboard = (req, res, next) => {
    if (req.session.signin) {
        res.redirect('/home');
    } else {
        next();
    }
}

const test = 'this is a test';

module.exports = {
    redirectLogin,
    redirectDashboard
}