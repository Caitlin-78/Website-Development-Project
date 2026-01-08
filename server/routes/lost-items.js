const express = require("express");
const router = express();

router.get('/', (req, res) => {
    res.send("Hello world");
})

router.post('/new', (req, res) => {
    
})

module.exports = router; //App will break if this line is removed