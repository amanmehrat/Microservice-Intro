const express = require("express");
const app = express();
const { randomBytes } = require("crypto");
const cors = require("cors");


app.use(express.json());
app.use(cors());

const comments = {};

app.get("/posts/:id/comments", (req, res) => {
    res.send(comments[req.params.id] || []);
})

app.post("/posts/:id/comments", (req, res) => {

    let newComment = comments[req.params.id] || [];
    const { content } = req.body;
    const id = randomBytes(4).toString("hex");
    newComment.push({ id, content });
    comments[req.params.id] = newComment;
    res.sendStatus(201).send(newComment[id]);
})


app.listen(4001, () => {
    console.log("listening at 4001");
})