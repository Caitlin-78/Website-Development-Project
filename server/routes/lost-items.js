const express = require("express");
const router = express();
const User = require("../models/user");
const LostItem = require("../models/lost-item");


router.get('/', (req, res) => {
    res.send("Hello world");
})

router.post('/new', (req, res) => {
    
})

module.exports = router; //App will break if this line is removed