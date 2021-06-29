const { default: axios } = require("axios");
const express = require("express");
const app = express();

app.use(express.json());

let events = [];

app.get("/events", (req, res) => {
    return res.send(events);
})

app.post("/events", (req, res) => {

    console.log("EventBus Recieved - " + req.body.type);
    const event = req.body;

    events.push(event);

    axios.post("http://localhost:4000/events", event);
    axios.post("http://localhost:4001/events", event);
    //axios.post("http://localhost:4002/events", event);
    axios.post("http://localhost:4003/events", event);

    return res.status(200);

})


app.listen(4005, () => {
    console.log("listening at 4005");
});