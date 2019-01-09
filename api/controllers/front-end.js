const Front = require('../models/front-end');

exports.front_get_all = (req, res, next) => {
    Front.find()
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                fronts: docs.map(doc => {
                    return {
                        icon: doc.icon,
                        text: doc.text,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/front-end/' + doc._id
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
        })
}

exports.front_create = (req, res, next) => {
    const front = new Front({
        icon: req.body.icon,
        text: req.body.text
    })

    front
        .save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Created Front Seccessfully',
                createdFront: {
                    icon: result.icon,
                    text: result.text,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/front-end/' + result._id
                    }
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
}

exports.front_get = (req, res, next) => {
    const id = req.params.frontId;
    Front.findById(id)
        .then(doc => {
            console.log("From Database", doc);
            if(doc){
                res.status(200).json({
                    front: doc,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/front-end'
                    }
                })
            } else {
                res.status(404).json({
                    message: "No Valid entry found of provided ID"
                })
            }
            res.status(200).json({
                front: doc
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
}

exports.front_update = (req, res, next) => {
    const id = req.params.frontId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Front.update(
        {_id: id},
        {$set: updateOps}
    )
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Front updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/front-end' + id
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

exports.front_delete = (req, res, next) => {
    const id = req.params.frontId;
    Front.remove({ _id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Front deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/front-end',
                    body: { icon: 'String', text: 'String' }
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