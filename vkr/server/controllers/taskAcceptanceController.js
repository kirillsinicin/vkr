const { TaskAcceptance, Task } = require('../models/models')
const ApiError = require('../error/ApiError');
const { TASK_STATUS_IN_PROGRESS, TASK_STATUS_PUBLISHED, TASK_STATUS_READY } = require('../constants')

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

    async getOneByFilter(req, res) {
        const { taskId, executorId } = req.query
        const filter = {};

        if (taskId) {
            filter.taskId = taskId
        }

        if (executorId) {
            filter.executorId = executorId
        }

        if (Object.keys(filter).length === 0) {
            next(ApiError.badRequest("Ошибка при получении списка готовых заказов"))
        }
        const taskAcceptance = await TaskAcceptance.findOne(
            {
                where: filter
            },
        )
        return res.json(taskAcceptance)
    }

    async getAllByFilter(req, res, next) {
        const { ownerId } = req.query
        let includedModels = []

        if (ownerId) {
            includedModels = [
                ...includedModels,
                {
                    model: Task, as: 'task',
                    where: { 
                        ownerId: ownerId,
                        status: [TASK_STATUS_IN_PROGRESS, TASK_STATUS_PUBLISHED] 
                    },
                    reqired: true
                }
            ]
        }

        if (includedModels.length === 0) {
            next(ApiError.badRequest("Ошибка при получении списка готовых заказов"))
        }

        const taskAcceptance = await TaskAcceptance.findAll(
            {
                include: includedModels,
            },
        )
        return res.json(taskAcceptance)
    }

    static async getTaskAcceptanceByTaskId(taskId) {
        return await TaskAcceptance.findOne(
            {
                where: { taskId: taskId, },
            },
        )
    }
}

module.exports = new TaskAcceptanceController()
