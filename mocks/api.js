/* eslint-disable no-console */
const jsonServer = require('json-server');

const server = jsonServer.create();
const path = require('path');
const cors = require('cors');

const router = jsonServer.router(path.join(__dirname, 'api/db.json'));
const middlewares = jsonServer.defaults();
const argv = require('minimist')(process.argv.slice(2));
const helpers = require('./helpers.js');

const port = process.env.APP_SERVER_PORT || argv.t;

server.use(cors());
server.options('*', cors());

server.use(middlewares);

// Health Route
server.get('/health', (req, res) => res.send('OK'));

server.use(router);

server.listen(port, () => {
  console.log(`API JSON Server is running on port ${port}`);
  // Display server informations
  helpers.printInfo(router);
});
