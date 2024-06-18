const Router = require('express')
const router = new Router()
const statisticController = require('../controllers/statisticController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/tasksbystatus',authMiddleware, statisticController.getTasksByStatus)
router.get('/tasksbytype',authMiddleware, statisticController.getTasksByType)

module.exports = router
