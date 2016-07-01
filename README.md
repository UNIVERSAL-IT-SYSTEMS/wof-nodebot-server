# wof-nodebot-server

_For more information read our [docs](http://ms-iot.github.io/windows-on-fridges)_

## Node socket server that runs on Azure
Node server accepts post requests and sends messages to Galileo through websockets. 

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


===

This project has adopted the [Microsoft Open Source Code of Conduct](http://microsoft.github.io/codeofconduct). For more information see the [Code of Conduct FAQ](http://microsoft.github.io/codeofconduct/faq.md) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments. 
