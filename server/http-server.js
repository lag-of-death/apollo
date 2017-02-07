const port = 8081

module.exports = require('http')
    .createServer(response)
    .listen(port, whenRun.bind(null, port))

function response(request, response) {
    response.writeHead(200)
    response.end('OK')
}

function whenRun() {
    return `Server is now running on http://localhost:${port}`
}