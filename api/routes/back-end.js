const express = require('express');
const router = express.Router();
const BackController = require('../controllers/back-end');

router.post('/', BackController.back_create);
router.get('/', BackController.back_get_all);
router.get('/:backId', BackController.back_get);
router.patch('/:backId', BackController.back_update);
router.delete('/:backId', BackController.back_delete);

module.exports = router;