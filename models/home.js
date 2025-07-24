//Core Module
const path = require('path');
const rootDir = require('../utils/pathutil');
const file = require('fs');
const { error } = require('console');

const homePath = path.join(rootDir, 'data', 'practice.json');


let registeredHome = [];


module.exports = class Home {
  constructor(person, Notename, Details, imageurl) {
    this.person = person;
    this.Notename = Notename;
    this.Details = Details;
    this.imageurl = imageurl;
  }

  save() {
    this.id = Math.random().toString();
    registeredHome.push(this);
    file.writeFile(homePath, JSON.stringify(registeredHome), error => {
      console.log('File written concluded', error);

    })
  }

  static fetchAll(callback) {

    const homePath = path.join(rootDir, 'data', 'practice.json');

    file.readFile(homePath, (error, data) => {
      console.log('File read:', error, data);

      if (error) {
        registeredHome = [];
      }
      else {
        registeredHome = JSON.parse(data);

      }
      callback(registeredHome);


    })

  }

  static findById(homeId, callback)
  {
    this.fetchAll(homes => {
      const homeFound = homes.find(home => home.id == homeId);
      callback(homeFound);
    })
  }



};
