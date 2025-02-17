const mongoose  = require('mongoose');

const URLsSchema = new mongoose.Schema({
    shortUrl: {
        type: String,  
        required: true, 
        unique: true, 
    },
    fullUrl: {
        type: String,  
        required: true, 
        minlength: 5, 
        maxlength: 2048, 
    },
    createdAt: {
        type: Date, 
        required: true, 
        default: Date.now, 
    },
});

const URLs = mongoose.model("URLs",URLsSchema);

module.exports = URLs;