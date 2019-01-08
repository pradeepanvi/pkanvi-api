const Roll = require('../models/roll');

exports.roll_get_all = (req, res, next) => {
    Roll.find()
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                rolls: docs.map(doc => {
                    return {
                        icon: doc.icon,
                        head: doc.head,
                        text: doc.text,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/rolls/' + doc._id
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

exports.roll_create = (req, res, next) => {
    const roll = new Roll({
        icon: req.body.icon,
        head: req.body.head,
        text: req.body.text
    })

    roll
        .save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Created Roll Seccessfully',
                createdRoll: {
                    icon: result.icon,
                    head: result.head,
                    text: result.text,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/rolls/' + result._id
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

exports.roll_get = (req, res, next) => {
    const id = req.params.rollId;
    Roll.findById(id)
        .then(doc => {
            console.log("From Database", doc);
            if(doc){
                res.status(200).json({
                    roll: doc,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/rolls'
                    }
                })
            } else {
                res.status(404).json({
                    message: "No Valid entry found of provided ID"
                })
            }
            res.status(200).json({
                roll: doc
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
}

exports.roll_update = (req, res, next) => {
    const id = req.params.rollId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Roll.update(
        {_id: id},
        {$set: updateOps}
    )
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Roll updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/rolls' + id
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

exports.roll_delete = (req, res, next) => {
    const id = req.params.rollId;
    Roll.remove({ _id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Roll deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/rolls',
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