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
})

app.post("/posts", async (req, res) => {
    const { title } = req.body;
    const id = randomBytes(4).toString("hex");
    posts[id] = { id, title };


    console.log("EventBus Emit - PostCreated");
    await axios.post("http://localhost:4005/events", ({ type: "PostCreated", data: posts[id] }));
    return res.status(201).send(posts[id]);
})

app.post("/events", (req, res) => {
    console.log("Event Recieved - " + req.body.type);
    return res.status(200);
});


app.listen(4000, () => {
    console.log("listening at 4000");
})