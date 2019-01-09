const express = require('express');
const router = express.Router();
const ExtraController = require('../controllers/extra');

router.post('/', ExtraController.extra_create);
router.get('/', ExtraController.extra_get_all);
router.get('/:extraId', ExtraController.extra_get);
router.patch('/:extraId', ExtraController.extra_update);
router.delete('/:extraId', ExtraController.extra_delete);

module.exports = router;