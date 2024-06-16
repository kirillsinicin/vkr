const Router = require('express')
const router = new Router()
const taskController = require('../controllers/taskController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, taskController.create)
router.delete('/:id', taskController.delete)
router.get('/', taskController.getAllWithoutExecutor)
router.get('/owner', authMiddleware, taskController.getTasksWhereUserOwner)
router.get('/executor', authMiddleware, taskController.getTasksWhereUserExecutor)
router.get('/:id', taskController.getOne)
router.patch('/:id', taskController.update.bind(taskController))

//router.get('/', productController.getProducts.bind(productController));

module.exports = router
