const app = require("./app")
const http = require("http")

const server = http.createServer(app)
server.listen(3001, () => {
  console.error(`app is listening at port ${3001}`)
})