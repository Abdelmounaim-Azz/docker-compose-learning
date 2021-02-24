import express from "express";
import redis from "redis";
const app = express();
const client = redis.createClient({
  host: "redis-srv",
});
client.set("visits", 0);

app.get("/", (req, res) => {
  client.get("visits", (err, visits) => {
    res.send("Number of visits " + visits);
    client.set("visits", parseInt(visits) + 1);
  });
});

app.listen(8080, () => {
  console.log("listening on port 8080");
});
