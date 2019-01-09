const express = require('express');
const router = express.Router();
const FrontController = require('../controllers/front-end');

router.post('/', FrontController.front_create);
router.get('/', FrontController.front_get_all);
router.get('/:frontId', FrontController.front_get);
router.patch('/:frontId', FrontController.front_update);
router.delete('/:frontId', FrontController.front_delete);

module.exports = router;