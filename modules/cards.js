const { randomInt } = require('crypto');
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
    let allCard = fs.readFileSync('./data/cards.json', 'utf8');
    let cardsData = JSON.parse(allCard)
    let booster = []
    // on a récupérer tous les cartes ici
    for (let i = 0; i < 5; i++) {
        // générer la carte de façon aléatoire
        const randomIndex = Math.floor(Math.random() * cardsData.length);
        // console.log(randomIndex)
        booster.push(cardsData[randomIndex]);
        // console.log(booster)
    };
    // recupérer l'utilisateur
    let data = fs.readFileSync('./data/users.json', 'utf8');
    allUser = JSON.parse(data);
    // vérifie le token avec l'utilisateur
    user = allUser.find((user) => user.token == req.query.token)
    user.collection = user.collection || [];
    user.collection.push(booster)
    // écriture dans le fichier users.json pour "sauvegarder" ses changements
    fs.writeFileSync("./data/users.json", JSON.stringify(allUser), 'utf8')
    // renvoyer la réponse
    res.json({
        "message": "Le booster est bien ouvert",
        data: {
            booster
        }
    })
}

module.exports = { GetAllCard, OpenBooster };