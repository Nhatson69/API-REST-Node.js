const fs = require('fs');

function RegisterUser(req, res) {
    if (!req.body) {
        res.status(400).json({ "message": "Erreur : Aucune données" })
    }

    let username = req.body.username;
    let password = req.body.password;
    let collection = req.body.collection;
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



module.exports = { RegisterUser };