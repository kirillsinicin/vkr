const Router = require('express')
const router = new Router()
const reviewController = require('../controllers/reviewController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/',authMiddleware, reviewController.create)

module.exports = router
