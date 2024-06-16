const Router = require('express')
const router = new Router()
const responseController = require('../controllers/responseController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, responseController.create)
router.get('/', authMiddleware, responseController.getAllByFilter)
router.get('/:id', authMiddleware, responseController.getOne)

module.exports = router
