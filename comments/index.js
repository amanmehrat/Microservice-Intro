const express = require("express");
const app = express();
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require('axios');

app.use(express.json());
app.use(cors());

const comments = {};

app.get("/posts/:id/comments", (req, res) => {
    return res.json(comments[req.params.id] || []);
})

app.post("/posts/:id/comments", async (req, res) => {

    let newComment = comments[req.params.id] || [];
    const { content } = req.body;
    const id = randomBytes(4).toString("hex");
    newComment.push({ id, content });
    comments[req.params.id] = newComment;

    console.log("EventBus Emit - CommentCreated");
    await axios.post("http://localhost:4005/events", ({ type: "CommentCreated", data: { id, postId: req.params.id, content, status: "Pending" } }));
    return res.status(201).json(newComment[id]);
})


app.post("/events", (req, res) => {
    console.log("Event Recieved - " + req.body.type);
    return res.status(200);
});


app.listen(4001, () => {
    console.log("listening at 4001");
})