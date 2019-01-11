const Project = require('../models/project');

exports.project_get_all = (req, res, next) => {
    Project.find()
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                projects: docs.map(doc => {
                    return {
                        icon: doc.icon,
                        head: doc.head,
                        text: doc.text,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/project/' + doc._id
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
    const project = new Roll({
        icon: req.body.icon,
        head: req.body.head,
        text: req.body.text
    })

    project
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
                        url: 'http://localhost:3000/project/' + result._id
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
                    project: doc,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/project'
                    }
                })
            } else {
                res.status(404).json({
                    message: "No Valid entry found of provided ID"
                })
            }
            res.status(200).json({
                project: doc
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
                    url: 'http://localhost:3000/project' + id
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
                    url: 'http://localhost:3000/project',
                    body: { icon: 'String', head: 'String', text: 'String' }
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

exports.project_create = (req, res, next) => {
    const project = new Project({
        name: req.body.name,
        thumbImage: req.body.thumbImage,
        mainImage: req.body.mainImage,
        slide1Image: req.body.slide1Image,
        slide2Image: req.body.slide2Image,
        category: req.body.category,
        technology: req.body.technology,
        client: req.body.client,
        detail: req.body.detail,
        rolls: req.body.rolls,
    })
    project
        .save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Created project successfully',
                createdProduct: {
                    name: result.name,
                    thumbImage: req.body.thumbImage,
                    mainImage: req.body.mainImage,
                    slide1Image: req.body.slide1Image,
                    slide2Image: req.body.slide2Image,
                    category: req.body.category,
                    technology: req.body.technology,
                    client: req.body.client,
                    detail: req.body.detail,
                    rolls: req.body.rolls,
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