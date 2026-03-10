const mongoose = require("mongoose");
// Modèle
const collectionShema = new mongoose.Schema({
    id: {type : Number},
    nb: {type: Number}
})

const Shema = new mongoose.Schema({
    username: {
        type: String, required: true
    },
    password: { type: String, required: true },
    collection: { type: [collectionShema]},
    token: {type: String},
    lastBooster: {type: Date},
    currency: {type : Number},
});



const User = mongoose.model('user', Shema);

module.exports = User