var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');

app.use(bodyParser());
app.use(bodyParser.json({type : 'application/vnd.api+json'}));

var port = process.env.PORT || 1337;
server.listen(port);
console.log("Server started, listening on port: " + port);

/*
 * Serve dashboard for robot
 *
 */
app.get('/dashboard', function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Robot Dashboard \nport: ' + port);
});

/*
 * Accepts single command for the robot. 
 * Request should be of the form 
 * { direction: "left/right/forward/backward", speed: 0-255, duration: <int>}
 */
app.post('/robot', function(req, res) {
	console.log(req.body);

  // parse data
	var direction = req.body.direction,
	speed = req.body.speed,
	duration = req.body.duration;

  // Send to robot client
  io.emit('robotControl', { direction: direction, speed: speed, duration: duration });
});

/*
 * Accept multiple directions as an array.
 * The array should contain objects of the same form as the single instructions.
 */
app.post('/robot/list', function(req, res) {
	console.log(req.body);

  // parse data
	var commandList = req.body;
  
  // pass array to the robot
  io.emit('robotControlList', commandList);
});

/*
 * Callbacks for different things
 *
 */
io.on('connection', function(socket) {
 //socket.emit('robotControl', { direction:"left", speed: 200, duration: 2000 });
  socket.on('finishEvent', function(data) {
    console.log(data);
  });
});
