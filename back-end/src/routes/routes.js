const express = require('express');

const router = express.Router();
const loginRouter = require('./login.router');
const registerRouter = require('./register.route');

router.use('/register', registerRouter);

router.use('/login', loginRouter);

module.exports = router;
