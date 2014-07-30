# wof-nodebot-server

## Node socket server that runs on Azure
Node server accepts post requests and sends messages to Galileo through websockets. 

_For more informations view our [docs](http://ms-iot.github.io/windows-on-fridges)_

## Running Locally
To run the server locally first install all the project dependencies. From the project directory run
```
npm install
```
To run the server locally simply run
```
node server.js
```

## Deploy to Azure

_Follow the [Azure documentation](http://azure.microsoft.com/en-us/documentation/articles/web-sites-nodejs-develop-deploy-mac/)_

## Using the Server

Run the [client application](https://github.com/ms-iot/wof-nodebot-client).

You can then make a post request to the server.
The server endpoint will depend on where you have deployed the server.
```
curl -v -H "Accept: application/json" -H "Content-type: application/json" -X POST -d '{"angle":90, "distance":2}'  http://localhost:1337/robot
```

You can also post a list of commands. Just post an array of the command objects to localhost:1337/robot/list



