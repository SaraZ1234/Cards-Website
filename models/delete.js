//Core Module
const path = require('path');
const fs = require('fs'); 
const rootDir = require('../utils/pathutil');

const homePath = path.join(rootDir, 'data', 'practice.json');

module.exports = class Delete {
  
static fetchAll(cb) {
  fs.readFile(homePath, (err, fileContent) => {
    if (err || !fileContent || fileContent.toString().trim() === '') {
      return cb([]);
    }

    try {
      cb(JSON.parse(fileContent));
    } catch (e) {
      console.error("JSON parsing error:", e);
      cb([]);
    }
  });
}

  static deleteById(id) {
    fs.readFile(homePath, (err, fileContent) => {
      if (err) return;

      const homes = JSON.parse(fileContent);
      const updatedHomes = homes.filter(home => home.id !== id);

      fs.writeFile(homePath, JSON.stringify(updatedHomes), err => {
        if (err) console.log(err);
      });
    });
  }

};
