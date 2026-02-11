const express = require('express');
const app = express();
const port = 3000;
const users = require("../modules/user");
const cards =  require("../modules/cards")
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
/*
var options = {
  explorer: true,
  	definition: {
		openapi: "3.0.0",
		info: {
			title: "Chat API",
			version: "1.0.0",
			description: "API TCG de chats à collectionner 🐱",
		},
		servers: [
			{
				url: "http://localhost:3000",
			},
		],
    }
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
*/
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
app.get("/login", users.Login);
app.get("/user", users.User);
app.patch("/user", users.UserModif)
app.delete("/disconnect", users.Logout)
app.get("/card", cards.GetAllCard)
app.put("/booster", cards.OpenBooster)

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});

