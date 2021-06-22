const express = require("express");
const app = express();
const { randomBytes } = require("crypto");
const cors = require('cors')
app.use(express.json());

const posts = {};

app.use(cors())

app.get("/posts", (req, res) => {
    res.send(posts);
})

app.post("/posts", (req, res) => {
    const { title } = req.body;
    const id = randomBytes(4).toString("hex");
    posts[id] = { id, title };
    res.sendStatus(201).send(posts[id]);
})


app.listen(4000, () => {
    console.log("listening at 4000");
})