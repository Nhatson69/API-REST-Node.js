const fs = require('fs');

function RegisterUser(req, res) {
    if (!req.body) {
        res.status(400).json({ "message": "Erreur : Aucune données" })
    }

    let username = req.body.username;
    let password = req.body.password;
    let data = fs.readFileSync('./data/users.json', 'utf8');
    allUser = JSON.parse(data);
    let user = {
        "id": (allUser.length + 1),
        "username": username,
        "password": password,
        "collection": []
    }

    allUser.push(user)
    fs.writeFileSync("./data/users.json", JSON.stringify(allUser), 'utf8')
    res.json({ "message": "OK" });

}

function Login(req, res) {
    if (!req.query) {
        res.status(400).json({ "message": "Erreur : Aucune données" })
    }
    let username = req.query.username;
    let password = req.query.password;
    let data = fs.readFileSync('./data/users.json', 'utf8');
    allUser = JSON.parse(data);
    user = allUser.find((user) => user.username == username && user.password == password)
    // si c est vrai cela veut dire que l'utilisateur existe
    if (user) {
        // generer un token (utiliser sauvegarde par référence)
        user.token = crypto.randomUUID(); // fait par Jules c'est un UUID demander a Jules si question
        //stocker le token dans l'utilisateur authentifier
        fs.writeFileSync("./data/users.json", JSON.stringify(allUser), 'utf8')
        // renvoyer la réponse
        res.json({
            "message": "Authentification réussie",
            data: {
                token: user.token
            }
        });
    }
}

function User(req, res) {
    if (!req.query) {
        res.status(400).json({ "message": "Erreur : Aucune données" })
    }
    let token = req.query.token;
    let data = fs.readFileSync('./data/users.json', 'utf8');
    allUser = JSON.parse(data);
    user = allUser.find((user) => user.token == token)
    if (user) {
        res.json({
            "id": (allUser.length + 1),
            "username": user.username,
            "password": user.password,
            "token": user.token,
            "collection": [],
        });
    }
}

module.exports = { RegisterUser, Login, User };