const mongoose = require('mongoose');
const ConfirmD = require('../models/confirm-detail');

exports.confirms_get_all = (req, res, next) => {
    ConfirmD.find()
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                confirm_details : docs.map(doc => {
                    return {
                        _id: doc._id,
                        email: doc.email,
                        phone: doc.phone,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/confirm-detail/' + doc._id
                        }
                    }
                })
            }
            console.log(response);
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
}

exports.confirms_create_detail = (req, res, next) => {
    const confirmD = new ConfirmD({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        phone: req.body.phone,
    })
    confirmD
        .save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Confirm Detail successfully',
                createdDetail: {
                    email: req.body.email,
                    phone: req.body.phone,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/confirm-detail/' + result._id
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

exports.confirms_get_detail = (req, res, next) => {
    const id = req.params.detailId;
    ConfirmD.findById(id)
        .exec()
        .then(doc => {
            console.log("From Database", doc);
            if(doc){
                res.status(200).json({
                    confirmD: doc,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/detailId/'
                    }
                });
            } else {
                res.status(404).json({message: "No valid entry found for provided ID"});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        })
}

exports.confirms_update_detail = (req, res, next) => {
    const id = req.params.detailId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    ConfirmD.update({ _id: id}, {$set: updateOps})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Product updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/confirm-detail/' + id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
}

exports.confirms_delete_detail = (req, res, next) => {
    const id = req.params.detailId;
    ConfirmD.remove({ _id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Detail deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/confirm-detail/',
                    body: { name: 'String', price: 'Number' }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
}