const { randomInt } = require('crypto');
const { all } = require('express/lib/application');
const fs = require('fs');
const { stringify } = require('querystring');


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
    // vérification de l'existance du token dans la requête
    if (!req.query.token) {
        res.json({ "message": "le token n'est pas vérifier" })
        return
    }
    // découverte que req.query doit récupérer un string 
    // étape 1 récupérer l'utilisateur
    let data = fs.readFileSync('./data/users.json', 'utf8');
    allUser = JSON.parse(data);

    // etape 2 vérifie le token avec l'utilisateur
    user = allUser.find((user) => user.token == req.query.token)
    limiteTime = user.lastBooster + 300000
    user.lastBooster = Date.now();

    // étape 3 vérifier le temps d'ouverture entre 2 booster
    if (user.lastBooster < limiteTime) {
        res.json({ "message": "le booster a été ouvert il y a moins de 5 minutes" })
        return
    }

    // si vrai alors récupèrer 5 cartes aléatoires
    let allCard = fs.readFileSync('./data/cards.json', 'utf8');
    let cardsData = JSON.parse(allCard)
    let booster = []
    // on a récupérer tous les cartes ici
    for (let i = 0; i < 5; i++) {
        // a chaque boucle on doit avoir une carte avec un rareté 
        //  common = 80%, rare = 15%, legendary = 5%
        // essaie avec common = 70%, rare = 20% et legendary = 10%
        let C = "common"
        let R = "rare"
        let L = "legendary"
        let chance = [C, C, C, C, C, C, C, R, R, L]
        const randomChance = Math.floor(Math.random() * chance.length);
        console.log(randomChance)
        if (chance[randomChance] == "common") {
            // si la carte est de rare commun alors on va chercher toutes les cartes communes dans cardsData
            console.log("on a obtene une carte commune")
            cardCommon = []
            // recupère les objects où rareté est common
            cardCommon.push(cardsData.r)

            // générer la carte de façon aléatoire
            const randomIndex = Math.floor(Math.random() * cardCommon.length);
            booster.push(cardsData[randomIndex]);
        }
        else if (chance[randomChance] == "rare") {
            console.log("on a obtene une carte rare")
        }
        else if (chance[randomChance] == "legendary") {
            console.log("on a obtene une carte légendaire")
        }

        // générer la carte de façon aléatoire
        const randomIndex = Math.floor(Math.random() * cardsData.length);
        booster.push(cardsData[randomIndex]);
    };

    user.collection = user.collection || [];
    console.log(user.lastBooster)
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