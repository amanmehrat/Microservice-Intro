const express = require("express");
const app = express();
const axios = require('axios');

app.use(express.json());

app.post("/events", async (req, res) => {
    console.log("Event Recieved - " + req.body.type);
    if (req.body.type == "CommentCreated") {
        const { id, postId, status, content } = req.body.data;
        if (content.includes("badword")) {
            await axios.post("http://localhost:4005/events", { type: "CommentUpdated", data: { id, postId, status: "Rejected", content } });
        } else {
            await axios.post("http://localhost:4005/events", { type: "CommentUpdated", data: { id, postId, status: "Accepted", content } });
        }
        return res.send(200);
    }
    return res.status(200);
});


app.listen(4002, () => {
    console.log("listening at 4002");
})