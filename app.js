const express = require('express');
const app = express();
const multer = require('multer');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const ProjectRoutes = require('./api/routes/project');
const RollRoutes = require('./api/routes/roll');
const ExtraRoutes = require('./api/routes/extra');
const FrontRoutes = require('./api/routes/front-end');
const BackRoutes = require('./api/routes/back-end');

mongoose.connect('mongodb+srv://pkanvi:' + process.env.MONGO_ATLAS_PW + '@pkanvi-api-bhhxl.mongodb.net/test?retryWrites=true', {
    useNewUrlParser: true
})

mongoose.Promise = global.Promise;

const DIR = './uploads/';
 
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR);
    },
    filename: (req, file, cb) => {
      //cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
      cb(null, file.originalname);
    }
});
let upload = multer({storage: storage});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.post('/uploads', upload.any(), function (req, res) {
    if (!req.file) {
        console.log("No file received");
        return res.send({
          success: false
        });
    
      } else {
        console.log(res);
        return res.send({
          success: true
        })
      }
});

// Routes which should handle requests
app.use('/project', ProjectRoutes);
app.use('/roll', RollRoutes);
app.use('/extra', ExtraRoutes);
app.use('/front-end', FrontRoutes);
app.use('/back-end', BackRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;