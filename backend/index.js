const app = require("./app")
const http = require("http")
const config = require("./utils/config")

const server = http.createServer(app)
server.listen(config.PORT, () => {
  console.error(`app is listening at port ${config.PORT}`)
})