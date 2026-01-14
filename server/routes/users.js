require('dotenv').config();

const express = require("express");
const router = express();
const database = require("../mongoConnect");
const ObjectId = require("mongodb").ObjectId;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const  SALT_ROUNDS = 8;

//Retrieves all users (for admin use only in frontend)
router.get('/', async (req, res) => {
    let db = database.getDb();
    let userData = await db.collection("user").find({}).toArray();
    if (userData.length > 0) {
        res.json(userData); //sends retreived data to frontend
    } else {
        throw new Error("Data not found or returned as an array correctly"); //will be changed once we start getting ready to deploy our website
    }
})
//Retrieve a specific user in user collection
router.get('/:id', async (req, res) => {
    let db = database.getDb();
    let userData = await db.collection("user").findOne({ _id: new ObjectId(req.params.id)});
    if (Object.keys(userData).length > 0) {
        res.json(userData); //sends retreived data to frontend
    } else {
        throw new Error("Data not found or returned as an array correctly"); //will be changed once we start getting ready to deploy our website
    }
})

//Create a new object in user collection
router.post('/', async (req, res) => {
    let db = database.getDb();

    const takenEmail = await db.collection("user").findOne({email: req.body.email});

    if (takenEmail) {
        res.json({message: "This email is taken."})
    } else {
        const hash = await bcrypt.hash(req.body.password, SALT_ROUNDS);

        let newUser = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash,
            school: req.body.school,
            grade: req.body.grade,
            bio: req.body.bio,
            role: req.body.role,
            joinDate: req.body.joinDate,
            postedItems: req.body.postedItems
        }
        let userData = await db.collection("user").insertOne(newUser);
        console.log(hash);
        res.json(userData);
    }
})
//Update an existing object in user collection
router.put('/:id', async (req, res) => {
    let db = database.getDb();
    let updatedUser = {
        $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            school: req.body.school,
            grade: req.body.grade,
            bio: req.body.bio,
            role: req.body.role,
            joinDate: req.body.joinDate,
            postedItems: req.body.postedItems
        }
    }
    let userData = await db.collection("user").insertOne({ _id: new ObjectId(req.params.id) }, updatedUser);
    res.json(userData);
})
//Delete a specific user in users collection
router.delete('/:id', async (req, res) => {
    let db = database.getDb();
    let userData = await db.collection("user").deleteOne({ _id: new ObjectId(req.params.id)});
    if (Object.keys(userData).length > 0) {
        res.json(userData); //sends retreived data to frontend
    } else {
        throw new Error("Data not found or returned as an array correctly"); //will be changed once we start getting ready to deploy our website
    }
})

//login route

router.post('/login', async (req, res) => {
    let db = database.getDb();

    const user = await db.collection("user").findOne({email: req.body.email});
    
    if (user){
        //let confirmation = await bcrypt.compare(JSON.stringify(req.body.password), JSON.stringify(user.password));
        let confirmation = await bcrypt.compare(req.body.password, user.password);
        if (confirmation) {
            const token = jwt.sign(user, process.env.SECRETKEY, {expiresIn: "1h"}); //creates an authentication token lasting 1 hour
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Incorrect password" })
        }
    } else {
        res.json({ success: false, message: "User not found" })
    }

})

module.exports = router; //App will break if this line is removed