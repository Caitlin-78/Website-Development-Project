const express = require("express");
const router = express();
const User = require("../models/user");
//will render sign-on page
router.get('/', (req, res) => {
    res.send("Hello world");
})

router.post('/create-account', (req, res) => {
    res.send("create account page");
})

module.exports = router; //App will break if this line is removed