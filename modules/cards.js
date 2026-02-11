const { all } = require('express/lib/application');
const fs = require('fs');


function GetAllCard(req, res) {
    if (!req.query) {
        res.status(400).json({ "message": "Erreur : Aucune données" })
    }
    let allCard = fs.readFileSync('./data/cards.json', 'utf8');
    let cardsData = JSON.parse(allCard)
    // renvoyer la réponse
    res.json({
        data: {
            cardsData
        }

    })

}

function OpenBooster(req, res) {
    if (!req.query) {
        res.status(400).json({ "message": "Erreur : Aucune données" })
    }
    if (!req.query.token) {
        res.json({ "message": "le token n'est pas vérifier" })
        return
    }
    // récupèrer 5 cartes aléatoires
}

module.exports = { GetAllCard, OpenBooster };