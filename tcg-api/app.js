const express = require('express');
const app = express();
const port = 3000;
const users = require("../modules/user");

app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.json(
        {
            message: "Bienvenue sur l'API TCG",
            data: {}
        }
    );
});

app.post("/register", users.RegisterUser);

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});

