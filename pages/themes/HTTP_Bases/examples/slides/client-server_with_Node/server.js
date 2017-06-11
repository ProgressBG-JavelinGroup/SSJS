// content of index.js
const http = require('http')
const port = 3000
const serverName = 'Simple Node server'

const requestHandler = (request, response) => {
  console.log(request.url)
  response.end(`${serverName} is up!`)
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})