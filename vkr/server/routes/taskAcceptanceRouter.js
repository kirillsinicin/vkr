const Router = require('express')
const router = new Router()
const taskAcceptanceController = require('../controllers/taskAcceptanceController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, taskAcceptanceController.create)
router.patch('/accept/:id', authMiddleware, taskAcceptanceController.accept)
router.get('/search', authMiddleware, taskAcceptanceController.getByFilter)
//router.get('/:id', authMiddleware, taskAcceptanceController.getOne)

module.exports = router
