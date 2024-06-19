const Router = require('express')
const router = new Router()
const profileController = require('../controllers/profileController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/:id', profileController.getOne)
router.patch('/:id', authMiddleware, profileController.update)

module.exports = router
