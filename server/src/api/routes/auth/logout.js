'use strict';

const router = require('express').Router();
const jwt = require('../../controllers/auth/jwtAuth');

router.get('/', jwt.requireAuth,function (req, res) {
    req.logout();
    jwt.blacklistToken(req);
    res.redirect('/');
});

module.exports = router;