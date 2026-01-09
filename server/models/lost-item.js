const mongoose = require('mongoose');

const lostItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imgName: {
        type: String,
        required: true
    },
    dateUploaded: {
        type: Date,
        required: true,
        default: Date.now //automatically sets this value to current date
    },
    itemType: {
        type: String,
        required: true
    },
    color: {
        type: String
    },
    brand: {
        type: String
    },
    schoolFoundIn: {
        type: String,
        required: true
    },
    currentLocation: { //which school's lost & found the item's currently in
        type: String,
        required: true
    },
    postedBy: {
        type: String,
        required: true,
        //default: User.email
    }

})


module.exports = mongoose.model('LostItem', lostItemSchema);