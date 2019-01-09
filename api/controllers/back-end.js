const Back = require('../models/back-end');

exports.back_get_all = (req, res, next) => {
    Back.find()
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                backs: docs.map(doc => {
                    return {
                        icon: doc.icon,
                        text: doc.text,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/back-end/' + doc._id
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

exports.back_create = (req, res, next) => {
    const back = new Back({
        icon: req.body.icon,
        text: req.body.text
    })

    back
        .save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Created Back Seccessfully',
                createdBack: {
                    icon: result.icon,
                    text: result.text,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/back-end/' + result._id
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

exports.back_get = (req, res, next) => {
    const id = req.params.backId;
    Back.findById(id)
        .then(doc => {
            console.log("From Database", doc);
            if(doc){
                res.status(200).json({
                    back: doc,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/back-end'
                    }
                })
            } else {
                res.status(404).json({
                    message: "No Valid entry found of provided ID"
                })
            }
            res.status(200).json({
                back: doc
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
}

exports.back_update = (req, res, next) => {
    const id = req.params.backId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Back.update(
        {_id: id},
        {$set: updateOps}
    )
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Back updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/back-end' + id
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

exports.back_delete = (req, res, next) => {
    const id = req.params.backId;
    Back.remove({ _id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Back deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/back-end',
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