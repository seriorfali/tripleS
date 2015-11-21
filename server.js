// Packages setup.
var express = require("express")
  , app = express()
  , mongoose = require("mongoose")
  , logger = require("morgan")
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

// Middleware.
app.use(logger("dev"))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({
	secret: process.env.LETZ_SECRET,
	cookie: {_expires: 6000000000}
}))
app.use(passport.initialize())
app.use(passport.session())
app.use("/assets", express.static(__dirname + "/assets"))

// Database connection.
mongoose.connect("mongodb://seriorfali:oolpI700#@ds045054.mongolab.com:45054/letz-app")

// API routes.
var userRoutes = require("./routes/userRoutes.js")
app.use("/api/users", userRoutes)

// Frontend routes.
app.get("*", function(req, res) {
  res.sendfile("./views/index.html")
})

// WebSocket callbacks.
webSocketsProvider.on("connection", function(socket) {
  console.log("A user connected.")
})

// Environment port.
var port = process.env.PORT || 1000

httpServer.listen(port, function() {
  console.log("Server running on port " + port + ".")
})
