const path = require('path');
const rootDir = require('../utils/pathutil');
const Home = require('../models/home');
const Delete = require('../models/delete');


exports.getHome = (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'host/addnote.html'));
};

exports.postHome = (req, res, next) => {
  console.log(req.body);

  const { person, Notename, Details, imageurl } = req.body;

  const home = new Home(person, Notename, Details, imageurl);
  home.save();

  const registeredHome = Home.fetchAll(registeredHome => res.render('store/card', { registeredHome }));
};

exports.Homepage = (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'store/index.html'));
};

exports.interface = (req, res, next) => {
  const registeredHome = Home.fetchAll(registeredHome => res.render('store/card', { registeredHome }));

  console.log("The values entered in registeredHome variable are:", registeredHome);
};



exports.delPage = (req, res, next) => {
  Home.fetchAll(registeredHome => {
    res.render('host/delete', {
      registeredHome,
      deletedNote: null,
      deletedDate: null,
      isEmpty: registeredHome.length === 0
    });
  });
};

exports.host_interface = (req, res, next) => {
  const registeredHome = Home.fetchAll(registeredHome => res.render('host/host-card', { registeredHome }));

  console.log("The values entered in registeredHome variable are:", registeredHome);
};


exports.getHomeDetail = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("At home details homeId is", homeId);

  Home.findById(homeId, home => {
    console.log("Home details found:", home);

    if (!home) {
      return res.redirect('/card.html')
    }

    res.render('store/home-detail', {
      home: home,
    });


  })


}

//For dealing with deletion logic

exports.deleteNote = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("Home ID received for deletion:", homeId);
  Delete.deleteById(homeId);
  // res.redirect('/delete.html');
  res.redirect('/host/delete');

};



exports.deleteNote = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("Home ID received for deletion:", homeId);

  Home.findById(homeId, (home) => {
    if (!home) {
      return res.sendFile(path.join(rootDir, 'views', '404.html'));
    }

    // Delete note from file
    Delete.deleteById(homeId);

    const deletedDate = new Date().toLocaleString();

    // Fetch updated notes after deletion
    Home.fetchAll(registeredHome => {
      res.render('host/delete', {
        registeredHome,
        deletedNote: home,
        deletedDate,
        isEmpty: registeredHome.length === 0
      });
    });
  });
};
