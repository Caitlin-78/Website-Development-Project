const express = require("express");
const router = express();
const database = require("../mongoConnect");
const ObjectId = require("mongodb").ObjectId;

//Retrieve all items in lostItems collection
router.get('/', async (req, res) => {
    let db = await database.getDb();
    //console.log(db);
    let lostItemData = await db.collection("lostItem").find({}).toArray();
    if (lostItemData.length > 0) {
        res.json(lostItemData); //sends retreived data to frontend
    } else {
        throw new Error("Data not found or returned as an array correctly"); //will be changed once we start getting ready to deploy our website
    }
    //res.send("Hello world");
})

//Retrieves all admin-approved items in lostItems collection
router.get('/admin-approved', async (req, res) => {
    let db = await database.getDb();
    //console.log(db);
    let lostItemData = await db.collection("lostItem").find({ "adminApproved": true }).toArray();
    if (lostItemData.length > 0) {
        res.json(lostItemData); //sends retreived data to frontend
    } else {
        throw new Error("Data not found or returned as an array correctly"); //will be changed once we start getting ready to deploy our website
    }
    //res.send("Hello world");
})

//Retrieve a specific item in lostItems collection
router.get('/:id', async (req, res) => {
    let db = await database.getDb();
    let lostItemData = await db.collection("lostItem").findOne({ _id: new ObjectId(req.params.id)});
    if (Object.keys(lostItemData).length > 0) {
        res.json(lostItemData); //sends retreived data to frontend
    } else {
        throw new Error("Data not found or returned as an array correctly"); //will be changed once we start getting ready to deploy our website
    }
})

//Create a new object in lostItems collection
router.post('/', async (req, res) => {
    let db = await database.getDb();
    let newItem = {
        name: req.body.name,
        description: req.body.description,
        imgFileName: req.body.imgFileName,
        dateUploaded: req.body.dateUploaded,
        itemType: req.body.itemType,
        color: req.body.color,
        brand: req.body.color,
        schoolFoundIn: req.body.schoolFoundIn,
        currentLocation: req.body.currentLocation,
        postedBy: req.body.postedBy,
        claimedBy: "N/A",
        adminApproved: "false",
    }
    let lostItemData = await db.collection("lostItem").insertOne(newItem);
    res.json(lostItemData);
})
//Update an existing object in lostItems collection
router.put('/:id', async (req, res) => {
    let db = await database.getDb();
    let newItem = {
        $set: {
            name: req.body.name,
            description: req.body.description,
            imgFileName: req.body.imgFileName,
            dateUploaded: Date.now,
            itemType: req.body.itemType,
            color: req.body.color,
            brand: req.body.color,
            schoolFoundIn: req.body.schoolFoundIn,
            currentLocation: req.body.currentLocation,
            postedBy: req.body.postedBy, //set to ID of user who posted item
            claimedBy: req.body.claimedBy || "N/A",
            adminApproved: req.body.adminApproved
        }
    }
    let lostItemData = await db.collection("lostItem").insertOne({ _id: new ObjectId(req.params.id) }, newItem);
    res.json(lostItemData);
})
//Delete a specific item in lostItems collection
router.delete('/:id', async (req, res) => {
    let db = await database.getDb();
    let lostItemData = await db.collection("lostItem").deleteOne({ _id: new ObjectId(req.params.id)});
    if (Object.keys(lostItemData).length > 0) {
        res.json(lostItemData); //sends retreived data to frontend
    } else {
        throw new Error("Data not found or returned as an array correctly"); //will be changed once we start getting ready to deploy our website
    }
})

module.exports = router; //App will break if this line is removed