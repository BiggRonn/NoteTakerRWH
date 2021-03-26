const express = require("express");
const fs = require("fs");
const path = require("path")
const app = express();
const {v4: uuidv4} = require("uuid")



const PORT = process.env.PORT || 8080;

//Middleware Functions
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static("./develop/public"));




//HTML Routes
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "./develop/public", "index.html")));
app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "./develop/public", "notes.html")));//directs user to notes page

const notes = require("./develop/db/db.json");

//API Routes
app.get("/api/notes", function(req, res){
    res.json(notes);
})
app.post("/api/notes", function(req, res){
    //creates notes from req.body
    const note = {
        id: uuidv4(),
        title: req.body.title,
        text: req.body.text,
    }
    notes.push(note);
    fs.writeFileSync("./develop/db/db.json", JSON.stringify(notes))
    
    res.json(note);

})
app.delete("/api/notes/:id", function(req, res){
    //delete a note based off id
    
    const { id } = req.params;
    
    const newNotes = notes.filter(note => note.id !== id)
    fs.writeFileSync("./develop/db/db.json", JSON.stringify(newNotes))

    res.send("Successfully deleted")

})


app.listen(PORT, ()=>console.log(`App listening on PORT ${PORT}`));
