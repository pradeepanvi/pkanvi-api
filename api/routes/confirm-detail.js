const express = require('express');
const router = express.Router();

const DetailController = require('../controllers/confirm-detail');

router.get('/', DetailController.confirms_get_all);
router.post('/', DetailController.confirms_create_detail);
router.get('/:detailId', DetailController.confirms_get_detail);
router.delete('/:detailId', DetailController.confirms_delete_detail);

module.exports = router;