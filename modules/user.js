var UserBDD = require("../Models/user")

const fs = require('fs');

async function test(req, res) {

    let newUser = new UserBDD();

    newUser.username = 'Simon';
    newUser.password = "Simon",
        newUser.collection = [];
    newUser.token = '';
    newUser.lastBooster = 0;
    newUser.currency = 0;
    await newUser.save();
    // Exemple de sélection
    // let users = await User.find({});    
    // console.log(users)

    let user = await UserBDD.find({})
    console.log(user);
    res.json({ "message": "sa marche" });
}


async function RegisterUser(req, res) {
    if (!req.body) {
        res.status(400).json({ "message": "Erreur : Aucune données" })
        return
    }
    if (!req.body.username || !req.body.password) {
        res.json({ "message": "Il manque des données" })
        return
    }
    let username = req.body.username;
    let password = req.body.password;
    verif = await UserBDD.findOne({ username: username },).exec();
    // let data = fs.readFileSync('./data/users.json', 'utf8');
    // allUser = JSON.parse(data);
    // verif = allUser.find((user) => user.username == username)
    if (verif) {
        res.json({ "message": "L'utilisateur existe déjà" })
        return
    }
    let newUser = new UserBDD();
    newUser.username = username;
    newUser.password = password,
        await newUser.save();
    res.json({ "message": "OK" });

}

async function Login(req, res) {
    if (!req.query) {
        res.status(400).json({ "message": "Erreur : Aucune données" })
    }
    if (!req.query.username || !req.query.password) {
        res.json({ "message": "Il manque des données" })
        return
    }
    let username = req.query.username;
    let password = req.query.password;
    // let data = fs.readFileSync('./data/users.json', 'utf8');
    // allUser = JSON.parse(data);
    // user = allUser.find((user) => user.username == username && user.password == password)
    // nom = await UserBDD.findOne({username: username})
    // verif = allUser.find((user) => user.username == username)
    userLog = await UserBDD.findOne({ username: username, password: password }).exec();
    if (!userLog) {
        res.json({ "message": "L'utilisateur n'existe déjà" })
        return
    }
    // si c est vrai cela veut dire que l'utilisateur existe
    // generer un token (utiliser sauvegarde par référence)
    userLog.token = crypto.randomUUID(); // fait par Jules c'est un UUID demander a Jules si question
    //stocker le token dans l'utilisateur authentifier
    await userLog.save();
    // renvoyer la réponse
    res.json({
        "message": "Authentification réussie",
        data: {
            token: userLog.token
        }
    });
}


async function User(req, res) {
    if (!req.query) {
        res.status(400).json({ "message": "Erreur : Aucune données" })
    }
    let token = req.query.token;
    // let data = fs.readFileSync('./data/users.json', 'utf8');
    // allUser = JSON.parse(data);
    // user = allUser.find((user) => user.token == token)
    // verif = allUser.find((user) => user.token == token)
    userToken = await UserBDD.findOne({ token: token }).exec();
    if (!userToken) {
        res.json({ "message": "Le token n'existe déjà" })
        return
    } res.json({
        userToken
    });
}


async function UserModif(req, res) {
    if (!req.query) {
        res.status(400).json({ "message": "Erreur : Aucune données" })
    }
    // dans Param sur postman 
    let token = req.query.token;
    // dans Body sur postman
    let username = req.body.username;
    userName = await UserBDD.findOne({ token: token }).exec();
    userName.username = username;
    await userName.save();
    res.json({ "message": "L'username a été modifier" });
}

async function Logout(req, res) {
    if (!req.query) {
        res.status(400).json({ "message": "Erreur : Aucune données" });
    }
    // dans Param sur postman
    let token = req.query.token;
    // let data = fs.readFileSync('./data/users.json', 'utf8');
    // allUser = JSON.parse(data);
    // user = allUser.find((user) => user.token == token);
    userToken = await UserBDD.findOne({ token: token }).exec();
    // user.token = "";
    userToken.token = "";
    // fs.writeFileSync("./data/users.json", JSON.stringify(allUser), 'utf8');
    await userToken.save()
    res.json({ "message": "sa marceh" })
}


module.exports = { RegisterUser, Login, User, UserModif, Logout, test };