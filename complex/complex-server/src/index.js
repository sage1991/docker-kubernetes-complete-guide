const keys = require("./keys")

// Setup express application
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(bodyParser.json())

// Setup postgres client
const { Pool } = require("pg")
const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort
})

pgClient.on("error", () => console.log("Lost pg connection"))
pgClient.on("connect", (client) => {
  client
    .query("CREATE TABLE IF NOT EXISTS values (number INT)")
    .catch((error) => console.log(error))
})

// Setup redis client
const redis = require("redis")
const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000,
})
const redisPublisher = redisClient.duplicate()

// Define express route handler
app.get("/", (req, res) => {
  res.send("Hello world!")
})

app.get("/values/all", async (req, res) => {
  const values = await pgClient.query("SELECT * from values")
  res.send(values.rows)
})

app.get("/values/current", (req, res) => {
  redisClient.hgetall("values", (error, values) => {
    res.send(values)
  })
})

app.post("/values", (req, res) => {
  const { index } = req.body
  if (parseInt(index) > 40) {
    return res.status(422).send("Index too high")
  }

  redisClient.hset("values", index, "Nothing yet!")
  redisPublisher.publish("insert", index)
  pgClient.query("INSERT INTO values(number) VALUES($1)", [index])

  res.send({ working: true })
})

app.listen(6000, (error) => {
  console.log("express listening port 6000")
})
