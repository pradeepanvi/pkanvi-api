const mongoose = require('mongoose');

const UserAddress = require('../models/user-address');

exports.user_address = (req, res, next) => {
    UserAddress.find()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                address: docs.map(doc => {
                    return {
                        _id: doc._id,
                        fullname: doc.fullname,
                        mobile: doc.mobile,
                        streetadd1: doc.streetadd1,
                        streetadd2: doc.streetadd2,
                        landmark: doc.landmark,
                        city: doc.city,
                        state: doc.state,
                        pincode: doc.pincode,
                        addresstype: doc.addresstype,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/user/address/' + doc._id
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

exports.user_create_address = (req, res, next) => {
    const address = new UserAddress({
        _id: new mongoose.Types.ObjectId(),
        fullname: req.body.fullname,
        mobile: req.body.mobile,
        streetadd1: req.body.streetadd1,
        streetadd2: req.body.streetadd2,
        landmark: req.body.landmark,
        city: req.body.city,
        state: req.body.state,
        pincode: req.body.pincode,
        addresstype: req.body.addresstype,
    })
    address
        .save()
        .then(doc => {
            console.log(doc);
            res.status(200).json({
                message: 'Created address successfully',
                createdProduct: {
                    _id: doc._id,
                    fullname: doc.fullname,
                    mobile: doc.mobile,
                    streetadd1: doc.streetadd1,
                    streetadd2: doc.streetadd2,
                    landmark: doc.landmark,
                    city: doc.city,
                    state: doc.state,
                    pincode: doc.pincode,
                    addresstype: doc.addresstype,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/user/address/' + doc._id
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

exports.user_update_address = (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    UserAddress.update({ _id: id}, {$set: updateOps})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Address updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/user/address/' + id
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

exports.user_delete_address = (req, res, next) => {
    const id = req.params.productId;
    UserAddress.remove({ _id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Product deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/products',
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