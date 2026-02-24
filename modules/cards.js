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
        let nb = 1
        let chance = [C, C, C, C, C, C, C, R, R, L]
        const randomChance = Math.floor(Math.random() * chance.length);
        let rarete = chance[randomChance]
        if (rarete == "common") {
            // si la carte est de rare commun alors on va chercher toutes les cartes communes dans cardsData
            // fonction vu avec l'ia mais dans l'idée on parcourt le cardsData où l'on cherche les "objets" avec pour rarity common
            cardCommon = cardsData.filter(card => card.rarity === rarete)
            // générer la carte de façon aléatoire
            const randomIndex = Math.floor(Math.random() * cardCommon.length);
            // incrementation si cards déjà dans la collection
            /* for (let j = 0; j < user.collection.length; j++) {
                 // console.log(cardCommon[randomIndex].id)
                 if (user.collection.flat().map(card => card.id) == cardCommon[randomIndex].id) {
                     console.log("on a un doublon")
                     nb = nb + 1
                 }
             }*/
            const doublon = user.collection.find(c => c.id == cardCommon[randomIndex].id)
            if (doublon) {
                // si le doublon existe on cherche l'index du doublon
                const index = user.collection.findIndex(c => c.id == cardCommon[randomIndex].id)
                user.collection[index].nb = (user.collection[index].nb || 1) + 1;
                // içi on incrémente le nombre de carte
                // doublon.nb = (doublon.nb || 1) + 1
                cards = { id: cardCommon[randomIndex].id, nb: user.collection[index].nb }
                booster.push(cards);
                // user.collection.push(cards)
                // le but est de modifier le "doublon" dans la collection au lieux de l'ajouter
            } else {
                cards = { id: cardCommon[randomIndex].id, nb: nb } // un dictionaire qui contiendra l'id et le nombre de doublon
                booster.push(cards);
                user.collection.push(cards)
            }
            console.log("on a obtene une carte commune")
        }
        else if (rarete == "rare") {
            // si la carte est de rare commun alors on va chercher toutes les cartes communes dans cardsData
            // fonction vu avec l'ia mais dans l'idée on parcourt le cardsData où l'on cherche les "objets" avec pour rarity common
            cardRare = cardsData.filter(card => card.rarity === rarete)
            // générer la carte de façon aléatoire
            const randomIndex = Math.floor(Math.random() * cardRare.length);
            const doublon = user.collection.find(c => c.id == cardRare[randomIndex].id)
            if (doublon) {
                // si le doublon existe on cherche l'index du doublon
                const index = user.collection.findIndex(c => c.id == cardRare[randomIndex].id)
                user.collection[index].nb = (user.collection[index].nb || 1) + 1;
                // içi on incrémente le nombre de carte
                // doublon.nb = (doublon.nb || 1) + 1
                cards = { id: cardRare[randomIndex].id, nb: user.collection[index].nb }
                booster.push(cards);
            } else {
                cards = { id: cardRare[randomIndex].id, nb: nb } // un dictionaire qui contiendra l'id et le nombre de doublon
                booster.push(cards);
                user.collection.push(cards)
            }
            console.log("on a obtene une carte rare")
        }
        else if (chance[randomChance] == "legendary") {
            // si la carte est de rare commun alors on va chercher toutes les cartes communes dans cardsData
            // fonction vu avec l'ia mais dans l'idée on parcourt le cardsData où l'on cherche les "objets" avec pour rarity common
            cardLegendary = cardsData.filter(card => card.rarity === rarete)
            // générer la carte de façon aléatoire
            const randomIndex = Math.floor(Math.random() * cardLegendary.length);
            const doublon = user.collection.find(c => c.id == cardLegendary[randomIndex].id)
            if (doublon) {
                // si le doublon existe on cherche l'index du doublon
                const index = user.collection.findIndex(c => c.id == cardLegendary[randomIndex].id)
                user.collection[index].nb = (user.collection[index].nb || 1) + 1;
                // içi on incrémente le nombre de carte
                // doublon.nb = (doublon.nb || 1) + 1
                cards = { id: cardRare[randomIndex].id, nb: user.collection[index].nb }
                booster.push(cards);
            }
            else {
                cards = { id: cardLegendary[randomIndex].id, nb: nb }
                booster.push(cards);
                user.collection.push(cards)
            }

            console.log("on a obtene une carte légendaire")
        }

        // // générer la carte de façon aléatoire
        // const randomIndex = Math.floor(Math.random() * cardsData.length);
        // booster.push(cardsData[randomIndex]);
    };

    // user.collection = user.collection || [];
    // console.log(user.lastBooster)
    // user.collection.push(booster)

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