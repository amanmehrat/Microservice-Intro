const express = require("express");
const app = express();
const { randomBytes } = require("crypto");
const cors = require('cors')
app.use(express.json());
const axios = require("axios");

const posts = {};

app.use(cors())

app.get("/posts", (req, res) => {
    return res.send(posts);
});


app.post("/events", (req, res) => {
    console.log("Event Recieved - " + req.body.type);
    switch (req.body.type) {
        case "PostCreated": {
            const { id, title } = req.body.data;
            posts[id] = { id, title, comments: [] };
            console.log(posts);
            return res.status(200);
        }
        case "CommentCreated": {
            const { id, postId, content, status } = req.body.data;
            const comments = posts[postId].comments;
            comments.push({ id, content, status });
            return res.status(200);
        }
        case "CommentUpdated": {
            const { id, postId, content, status } = req.body.data;
            const comments = posts[postId].comments;
            const comment = comments.find(c => c.id == id);
            comment.content = content;
            comment.status = status;
            return res.status(200);
        }
    }

    return res.status(200);
});


app.listen(4003, () => {
    console.log("listening at 4003");
})