var bdd = require("mongoose");
bdd.connect("mongodb://localhost:30001/tcg");
module.exports = bdd;