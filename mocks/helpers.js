/* eslint-disable no-console */
const path = require('path');
const argv = require('minimist')(process.argv.slice(2));

const port = process.env.APP_SERVER_PORT || argv.t;
const chalk = require('chalk');
const os = require('os');
const fs = require('fs');

const ifs = os.networkInterfaces();

function printInfo() {
  const routes = JSON.parse(fs.readFileSync(path.join(__dirname, 'api/db.json')));
  const networkAddress = Object.keys(ifs)
    .map(int => ifs[int].filter(iface => iface.family === 'IPv4' && !iface.internal)[0])
    .filter(i => i)[0].address;

  console.log();
  console.log(chalk.bold('  Local'));
  console.log(`  http://localhost:${port}`);
  console.log();
  console.log(chalk.bold('  On your Network'));
  console.log(`  http://${networkAddress}:${port}`);
  console.log();
  console.log(chalk.bold('  Mock API Resources'));

  for (const prop in routes) {
    if (Object.prototype.hasOwnProperty.call(routes, prop)) {
      console.log(`  http://localhost:${port}/${prop}`);
    }
  }
  console.log();
}

module.exports = {
  printInfo,
};
