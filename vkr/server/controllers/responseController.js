const { Response, Task } = require('../models/models')
const ApiError = require('../error/ApiError');

class ResponseController {
    async create(req, res, next) {
        const user = req.user
        const { taskId } = req.body
        try {
            const response = await Response.create(
                {
                    userId: user.id,
                    taskId,
                })
            return res.json(response)
        } catch (e) {
            next(ApiError.badRequest("Ошибка при создании отклика"))
        }
    }

    async getAllByFilter(req, res, next) {
        const { taskId, userId } = req.query
        const filter = {};

        if (taskId) {
            filter.taskId = taskId
        }

        if (userId) {
            filter.userId = userId
        }

        if (Object.keys(filter).length === 0) {
            next(ApiError.badRequest("Ошибка при получении откликов"))
        }

        const responses = await Response.findAll(
            {
                where: filter,
                //include: [{ model: Profile, as: 'profile' }]
                include: { all: true, nested: true }
            },
        )
        return res.json(responses)
    }

    async getOne(req, res) {
        const { id } = req.params
        const response = await Response.findOne(
            {
                where: { id }
            },
        )
        return res.json(response)
    }

}

module.exports = new ResponseController()
