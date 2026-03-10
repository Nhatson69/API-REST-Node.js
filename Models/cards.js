const mongoose = require("mongoose");

const Shema = new mongoose.Schema({
    id: { type: Number, unique: true, required: true },
    name: {
        type: String, unique: true,
        required: true
    },
    rarity: { type: String, required: true },
});

const Cards = mongoose.model('card', Shema);

module.exports = Cards
// // Exemple de création
// let newCard = new Card();
// newCard.id=2
// newCard.username = 'Herbizarre';
// newCard.rarity = 'rare'
// await card.save();

// // Exemple de sélection
// let cards = await Card.find({});

