const express = require('express');
const app = express();
const port = 3000;


app.get("/",(req, res) => {
    res.json(
        {
            message: "Bienvenue sur l'API TCG",
            data : {}
        }
    );
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});

app.use(express.urlencoded({ extended: true}));