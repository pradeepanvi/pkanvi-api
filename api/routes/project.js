const express = require('express');
const router = express.Router();
const ProjectController = require('../controllers/project');

router.post('/', ProjectController.project_create);
router.get('/', ProjectController.project_get_all);
router.get('/:projectId', ProjectController.project_get);
router.update('/:projectId', ProjectController.project_update);
router.delete('/:projectId', ProjectController.project_delete);

module.exports = router;