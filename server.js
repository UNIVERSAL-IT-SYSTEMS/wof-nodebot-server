var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');

app.use(bodyParser.json());

var port = process.env.PORT || 1337;
server.listen(port);
console.log("Server started, listening on port: " + port);

/*
 * Serve dashboard for robot
 */
app.get('/dashboard', function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Robot Dashboard \nport: ' + port);
});

/*
 * Accepts single command for the robot. 
 * Request should be of the form 
 * { angle:<double>, distance: <double>}
 */
app.post('/robot', function(req, res) {
	console.log(req.body);

  var command = req.body;

  // Send command to robot client
  io.emit('robotControl', command);
  res.send({message: 'command sent'});
});

/*
 * Accept multiple directions as an array.
 * The array should contain objects of the same form as the single instructions.
 */
app.post('/robot/list', function(req, res) {
	console.log(req.body);

	var commandList = req.body;
  
  // pass array to the robot
  io.emit('robotControlList', commandList);
  res.send({message: 'List sent'});
});

/*
 * Callbacks for different things
 */
io.on('connection', function(socket) {
  socket.on('finishEvent', function(data) {
    console.log(data);
  });
});
