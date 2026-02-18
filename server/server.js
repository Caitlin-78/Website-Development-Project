require('dotenv').config();
// imports
const express = require("express");
const app = express();
const connect = require("./mongoConnect");
const cors = require("cors");
const corsOptions = {
    origin: ["http://localhost:5173"],
};

app.use(cors(corsOptions));
app.use(express.json());
// To connect routers
const indexRouter = require('./routes/index');
const lostItemsRouter = require('./routes/lost-items');
const userRouter = require('./routes/users');
const { createRouteHandler } = require('uploadthing/express');
const { uploadRouter } = require('./routes/image-router');

app.use('/', indexRouter);
app.use('/lost-items', lostItemsRouter);
app.use('/user', userRouter);
app.use('/api/uploadthing', createRouteHandler({router: uploadRouter}))


/* alternate way of connecting to MongoDB (do this only if absolutely needed)
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URI);
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));
*/
app.get("/api", (req, res) =>{
    res.json({lostInfo:["lost items", "poster"]});
});

app.listen(8080, () => {
    console.log("Server has started on port 8080");
});
