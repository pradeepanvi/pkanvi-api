const express = require('express');
const router = express.Router();
const RollController = require('../controllers/roll');

router.post('/', RollController.roll_create);
router.get('/', RollController.roll_get_all);
router.get('/:rollId', RollController.roll_get);
router.patch('/:rollId', RollController.roll_update);
router.delete('/:rollId', RollController.roll_delete);

module.exports = router;