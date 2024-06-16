const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const typeRouter = require('./typeRouter')
const taskRouter = require('./taskRouter')
const profileRouter = require('./profileRouter')
const responseRouter = require('./responseRouter')
const taskAcceptanceRouter = require('./taskAcceptanceRouter')

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/task', taskRouter)
router.use('/profile', profileRouter)
router.use('/response', responseRouter)
router.use('/acceptance', taskAcceptanceRouter)

module.exports = router
