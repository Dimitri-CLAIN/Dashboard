'use strict'

const epitech = require('../../controllers/epitech/epitech');
const jwt = require('../../controllers/auth/jwtAuth');
const router = require('express').Router();

router
    .get('/', epitech.getLogin);
router
    .get('/notes', epitech.getProfile);

module.exports = router;