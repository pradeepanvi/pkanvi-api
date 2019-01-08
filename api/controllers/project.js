const mongoose = require('mongoose');
const Project = require('../models/project');

exports.project_create = (req, res, next) => {
    const project = new Project({
        text: req.body.text
    })
    project
        .save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Created project successfully',
                createdProduct: {
                    text: result.text,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/products/'
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
}

exports.project_get = (req, res, next) => {
    Project.find()
        .then(docs => {
                res.status(200).json({
                    project: docs
                })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        })
}