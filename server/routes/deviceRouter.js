const Router = require('express');
const router = new Router();
const deviceController = require('./../controllers/deviceController');
const checkRole = require('../middleware/checkRoleMiddleware');

router
    .post('/', deviceController.create)
    .get('/', deviceController.getAll)
    .get('/search', deviceController.getSearchAllDeviceByName)
    .get('/:id', deviceController.getOne)
    .delete('/:id', deviceController.delete)
    .put('/:id', deviceController.update)

module.exports = router;
