const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = {
    origin: ["http://localhost:5173"],
};

app.use(cors(corsOptions));

const indexRouter = require('./routes/index');
const lostItemsRouter = require('./routes/lost-items');
const userRouter = require('./routes/users');

app.use('/', indexRouter);
app.use('/lost-items', lostItemsRouter);
app.use('/user', userRouter);

app.get("/api", (req, res) =>{
    res.json({lostInfo:["lost items", "poster"]});
});

app.listen(8080, () => {
    console.log("Server has started on port 8080");
});
