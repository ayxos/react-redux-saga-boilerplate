/* eslint-disable no-console */
/* This script generates mock data for local development.
   This way you don't have to point to an actual API,
   but you can enjoy realistic, but randomized data,
   and rapid page loads due to local, static data.
 */
const rawJsf = require('json-schema-faker'); // v0.4.7
// faker
const jsf = rawJsf.extend('faker', () => require('faker'));
jsf.option({ useDefaultValue: true });
const fs = require('fs');
const mockDataSchema = require('./mockDataSchema');
// Extra fixed menus
const mockedConstants = require('./api/constants');
// Merging with non-generated mocked data

const finalMockedDDBB = {
  ...jsf.generate(mockDataSchema),
  ...mockedConstants,
};
const json = JSON.stringify(finalMockedDDBB);

fs.writeFile('./mocks/api/db.json', json, err => {
  if (err) {
    return console.log(err);
  }
  return console.log('Mock data generated.');
});
