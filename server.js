// Packages setup.
var express = require("express")
  , app = express()
  , mongoose = require("mongoose")
  , bodyParser = require("body-parser")
  , cookieParser = require("cookie-parser")
  , session = require("express-session")
  , passport = require("passport")
  , passportConfig = require("./config/passport.js")
  , http = require("http")
    // To allow HTTP to be bound to same port as WebSockets.
  , httpServer = http.Server(app)
    // To have provider of WebSockets connection to client listen at same port as HTTP.
  , webSocketsProvider = require(socket.io)(httpServer)
  , logger = require("morgan")

// Middleware.
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(passport.initialize())
app.use(passport.session())
app.use(logger("dev"))

// Database connection.


// User routes.
var userRoutes = require("./routes/userRoutes.js")
app.use("/", userRoutes)

// WebSocket callbacks.
webSocketsProvider.on("connection", function(socket) {
  console.log("A user connected.")
})

// Environment port.
var port = process.env.PORT || 1000

httpServer.listen(port, function() {
  console.log("Server running on port " + port + ".")
})
