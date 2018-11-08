const express = require('express');
const router = express.Router();

const QuatationController = require('../controllers/quatation');

router.get('/', QuatationController.quatations_get_all);
router.post('/', QuatationController.quatations_create_quatation);
router.get('/:quatationId', QuatationController.quatations_get_quatation);
router.delete('/:quatationId', QuatationController.quatations_delete_quatation);

module.exports = router;