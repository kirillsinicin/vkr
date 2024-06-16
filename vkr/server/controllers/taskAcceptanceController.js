const { TaskAcceptance, Task } = require('../models/models')
const ApiError = require('../error/ApiError');
const { TASK_STATUS_READY } = require('../constants')

class TaskAcceptanceController {
    async create(req, res, next) {
        const user = req.user
        const { taskId } = req.body
        try {
            const taskAcceptance = await TaskAcceptance.create(
                {
                    executorId: user.id,
                    taskId,
                })
            return res.json(taskAcceptance)
        } catch (e) {
            next(ApiError.badRequest("Хуй тебе"))
        }
    }

    async accept(req, res) {
        try {
            const { id: taskId } = req.params;

            const dataToUpdateTask = {
                status: TASK_STATUS_READY
            }

            const dataToUpdateAcceptance = {
                accepted: true
            }

            const updatedRowsTask = await Task.update(
                dataToUpdateTask,
                {
                    where: {
                        id: taskId,
                    }
                }
            )

            const updatedRowsAcceptance = await TaskAcceptance.update(
                dataToUpdateAcceptance,
                {
                    where: {
                        taskId: taskId,
                    }
                }
            )
            const acceptance = await TaskAcceptanceController.getTaskAcceptanceByTaskId(taskId)
            return res.json(acceptance)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getOne(req, res) {
        const { id } = req.params
        const taskAcceptance = await TaskAcceptance.findOne(
            {
                where: { id }
            },
        )
        return res.json(taskAcceptance)
    }

    static async getTaskAcceptanceByTaskId(taskId) {
        return await TaskAcceptance.findOne(
            {
                where: {taskId: taskId,},
            },
        )
    }

    async getByFilter(req, res) {
        const { taskId, executorId } = req.query
        const taskAcceptance = await TaskAcceptance.findOne(
            {
                where: { taskId, executorId}
            },
        )
        return res.json(taskAcceptance)
    }
}

module.exports = new TaskAcceptanceController()
