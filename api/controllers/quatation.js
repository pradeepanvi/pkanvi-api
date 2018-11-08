const mongoose = require('mongoose');

const Quatation = require('../models/quatation');
const ConfirmD = require('../models/confirm-detail');

exports.quatations_get_all = (req, res, next) => {
    Quatation.find()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                quatations: docs.map(doc => {
                    return {
                        _id: doc._id,
                        detail: doc.detail,
                        product: doc.product,
                        quantity: doc.quantity,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/orders' + doc._id
                        }
                    }
                })
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })

}

exports.quatations_create_quatation = (req, res, next) => {
    const quatation = new Quatation({
        _id: new mongoose.Types.ObjectId(),
        detail: req.body.detail,
        product: req.body.product,
        quantity: req.body.quantity,
    })
    quatation
        .save()        
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Quantity stored',
                createdQuatation: {
                    _id: result._id,
                    detail: result.detail,
                    product: result.product,
                    quantity: result.quantity
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/quatation' + result._id
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

exports.quatations_get_quatation = (req, res, next) => {
    Quatation.findById(req.params.quatationId)
        .populate('product')
        .then(quatation => {
            if(!quatation) {
                return res.status(404).json({
                    message: 'Quatation not found'
                });
            }
            res.status(200).json({
                quatation: quatation,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/quatation'
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

exports.quatations_delete_quatation = (req, res, next) => {
    Quatation.remove({ _id: req.params.quatationId })
        .then(result => {
            res.status(200).json({
                message: 'Quatation deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/quatation',
                    body: { productId: "ID", quantity: "Number" }
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}