require('dotenv').config();

const express = require("express");
const router = express();
const database = require("../mongoConnect");
const ObjectId = require("mongodb").ObjectId;
const jwt = require("jsonwebtoken");
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

//Retrieve all items in lostItems collection
router.get('/', verifyToken, async (req, res) => {
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

//Retrieves all items with names matching patterns user entered in search bar
router.get("/search/:q", verifyToken, async (req, res) => {
    let db = await database.getDb();
    //console.log(req.params.q);
    const query = req.params.q;
    console.log(query);
    //const name = (item) => {item.itemName.toLowerCase().includes(query.toLowerCase())};
    if (query.length > 0) {
        //const results = await db.collection("lostItem").find({"itemName": query, "adminApproved": true}).toArray();
        const results = await db.collection("lostItem").find({"itemName": { $regex: new RegExp(query, 'i') }, "adminApproved": true}).toArray();
        res.json(results);
    } else {
        res.json([]);
    }
})

//Retrieves all admin-approved items in lostItems collection
router.get('/admin-approved', verifyToken, async (req, res) => {
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
router.get('/:id', verifyToken, async (req, res) => {
    let db = await database.getDb();
    let lostItemData = await db.collection("lostItem").findOne({ _id: new ObjectId(req.params.id)});
    if (Object.keys(lostItemData).length > 0) {
        res.json(lostItemData); //sends retreived data to frontend
    } else {
        throw new Error("Data not found or returned as an array correctly"); //will be changed once we start getting ready to deploy our website
    }
})

//Create a new object in lostItems collection
router.post('/', verifyToken, async (req, res) => {
    let db = await database.getDb();
    let newItem = {
        itemName: req.body.itemName,
        description: req.body.description,
        imgFileName: req.body.imgFileName,
        //imageType: req.body.imageType,
        dateUploaded: req.body.dateUploaded,
        itemType: req.body.itemType,
        color: req.body.color,
        brand: req.body.brand,
        schoolFoundIn: req.body.schoolFoundIn,
        currentLocation: req.body.currentLocation,
        postedBy: req.body.postedBy,
        claimedBy: req.body.claimedBy,
        adminApproved: req.body.adminApproved,
    }
    //saveImage(newItem, req.body.imgFileName); 

    let lostItemData = await db.collection("lostItem").insertOne(newItem);
    res.json(lostItemData);
})
//Update an existing object in lostItems collection
router.put('/:id', verifyToken, async (req, res) => {
    let db = await database.getDb();
    let newItem = {
        $set: {
            itemName: req.body.itemName,
            description: req.body.description,
            imgFileName: req.body.imgFileName,
            //imageType: req.body.imageType,
            dateUploaded: Date.now,
            itemType: req.body.itemType,
            color: req.body.color,
            brand: req.body.brand,
            schoolFoundIn: req.body.schoolFoundIn,
            currentLocation: req.body.currentLocation,
            postedBy: req.body.postedBy, //set to the value of the user who found the item
            claimedBy: req.body.claimedBy,
            adminApproved: req.body.adminApproved,
        }
    }
    let lostItemData = await db.collection("lostItem").updateOne({ _id: new ObjectId(req.params.id) }, newItem);
    res.json(lostItemData);
})
//Delete a specific item in lostItems collection
router.delete('/:id', verifyToken, async (req, res) => {
    let db = await database.getDb();
    let lostItemData = await db.collection("lostItem").deleteOne({ _id: new ObjectId(req.params.id)});
    if (Object.keys(lostItemData).length > 0) {
        res.json(lostItemData); //sends retreived data to frontend
    } else {
        throw new Error("Data not found or returned as an array correctly"); //will be changed once we start getting ready to deploy our website
    }
})

function saveItemImage(item, itemImageEncoded) {
  if (itemImageEncoded == null) return
  const itemImage = JSON.parse(itemImageEncoded)
  if (itemImage != null && imageMimeTypes.includes(itemImage.type)) {
    item.itemImage = new Buffer.from(itemImage.data, 'base64')
    item.itemImageType = itemImage.type
  }
}

function verifyToken(req, res, next) {
    const authHeaders = req.headers["authorization"];
    const token = authHeaders && authHeaders.split(' ')[1];
    if (!token) {
        return res.status[401].json({message: "Authentication token is missing."});
    }

    jwt.verify(token, process.env.SECRETKEY, (error, user) => {
        if (error) {
            return res.status[403].json({message: "Invalid token."});
        }

        //req.body.user = user;
        req.user = user; //(if req.body.user gives an error)
        next();
    })
}


module.exports = router; //App will break if this line is removed