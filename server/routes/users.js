const express = require("express");
const router = express();
const database = require("../mongoConnect");
const ObjectId = require("mongodb").ObjectId;

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
//Retrieve a specific item in user collection
router.get('/:id', async (req, res) => {
    let db = database.getDb();
    let userData = await db.collection("user").findOne({ _id: new ObjectId(req.params.id)});
    if (Object.keys(userData).length > 0) {
        res.json(userData); //sends retreived data to frontend
    } else {
        throw new Error("Data not found or returned as an array correctly"); //will be changed once we start getting ready to deploy our website
    }
})

//Create a new object in lostItems collection
router.post('/', async (req, res) => {
    let db = database.getDb();
    let newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        school: req.body.school,
        grade: req.body.grade,
        bio: req.body.bio,
        role: "user"
    }
    let userData = await db.collection("user").insertOne(newItem);
    res.json(userData);
})
//Update an existing object in lostItems collection
router.put('/:id', async (req, res) => {
    let db = database.getDb();
    let newUser = {
        $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            school: req.body.school,
            grade: req.body.grade,
            bio: req.body.bio,
            role: req.body.role
        }
    }
    let userData = await db.collection("user").insertOne({ _id: new ObjectId(req.params.id) }, newItem);
    res.json(userData);
})
//Delete a specific item in lostItems collection
router.delete('/:id', async (req, res) => {
    let db = database.getDb();
    let userData = await db.collection("user").deleteOne({ _id: new ObjectId(req.params.id)});
    if (Object.keys(userData).length > 0) {
        res.json(userData); //sends retreived data to frontend
    } else {
        throw new Error("Data not found or returned as an array correctly"); //will be changed once we start getting ready to deploy our website
    }
})

module.exports = router; //App will break if this line is removed