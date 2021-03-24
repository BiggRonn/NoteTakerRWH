const express = require("express")
const app = express();

const PORT = process.env.PORT || 8080;

app.get("/", function(req, res) {
    res.send("Hello World!");
});