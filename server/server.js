require('dotenv').config();
// imports
const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = {
    origin: ["http://localhost:5173"],
};

app.use(cors(corsOptions));
// To connect routers
const indexRouter = require('./routes/index');
const lostItemsRouter = require('./routes/lost-items');
const userRouter = require('./routes/users');

app.use('/', indexRouter);
app.use('/lost-items', lostItemsRouter);
app.use('/user', userRouter);

// console.log(process.env.DATABASE_URI); --> for debugging

//mongodb configuration (this took forever holy-)
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URI);
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));

app.get("/api", (req, res) =>{
    res.json({lostInfo:["lost items", "poster"]});
});

app.listen(8080, () => {
    console.log("Server has started on port 8080");
});
