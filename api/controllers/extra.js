const Extra = require('../models/extra');

exports.extra_get_all = (req, res, next) => {
    Extra.find()
         .exec()
         .then(docs => {
             const response = {
                 count: docs.length,
                 extras: docs.map(doc => {
                     return {
                         number: doc.number,
                         text: doc.text,
                         _id: doc._id,
                         request: {
                             type: 'GET',
                             url: 'http://localhost:3000/extra/' + doc._id
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

exports.extra_create = (req, res, next) => {
    const extra = new Extra({
        number: req.body.number,
        text: req.body.text
    })

    extra
        .save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Created Extra Seccessfully',
                createdExtra: {
                    number: result.number,
                    text: result.text,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/extra/' + result._id
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

exports.extra_get = (req, res, next) => {
    const id = req.params.extraId;
    Extra.findById(id)
         .then(doc => {
            console.log("From Database", doc);
            if(doc){
                res.status(200).json({
                    extra: doc,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/extra'
                    }
                })
            } else {
                res.status(404).json({
                    message: "No Valid entry found of provided ID"
                })
            }
            res.status(200).json({
                extra: doc
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
}

exports.extra_update = (req, res, next) => {
    const id = req.params.extraId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Extra.update(
        {_id: id},
        {$set: updateOps}
    )
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Extra updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/extra/' + id
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

exports.extra_delete = (req, res, next) => {
    const id = req.params.extraId;
    Extra.remove({ _id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Extra deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/extra',
                    body: { number: 'Number', text: 'String' }
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
