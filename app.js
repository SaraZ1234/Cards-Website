// Core Module
const path = require('path');

// External Module
const express = require('express');

// Local Modules
const userView = require('./routes/userview');
// Destructure the router
const { hostRouter } = require('./routes/hostview'); 
const interface = require('./routes/interface')

const rootDir = require('./utils/pathutil');

const app = express();

// Set EJS as the templating engine
app.set('view engine', 'ejs');
// Tells Express where to find your .ejs files
app.set('views', 'views'); 

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Make CSS and other static files accessible
app.use(express.static(path.join(rootDir, 'public')));

app.use("/", userView);
app.use("/index.html", userView);
app.use("/host", hostRouter);
app.use("/", interface);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, 'views','404.html' ))

  
})

const port = 3002;
app.listen(port, () => {
   console.log(`Server running on http://localhost:${port}`);
});
