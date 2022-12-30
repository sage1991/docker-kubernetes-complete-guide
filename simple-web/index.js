const express = require("express")
const app = express()

app.get("/", (request, response) => {
  response.send("<h1>Bye there</h1>")
})

app.listen(8080, () => {
  console.log("Listening on port 8080")
})

