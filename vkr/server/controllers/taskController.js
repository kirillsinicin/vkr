const uuid = require('uuid')
const path = require('path');
const { Task, TaskInfo } = require('../models/models')
const ApiError = require('../error/ApiError');
const { TASK_STATUS_IN_PROGRESS, PAGE_SIZE } = require('../constants')

class TaskController {

  async create(req, res, next) {
    try {
      let { name, price, typeId, info } = req.body

      const user = req.user
      // https://sequelize.org/docs/v6/core-concepts/assocs/#creating-updating-and-deleting
      const task = await Task.create({
        name,
        price,
        typeId,
        ownerId: user.id
      })

      if (info) {
        info = JSON.parse(info)
        info.forEach(i =>
          TaskInfo.create({
            title: i.title,
            description: i.description,
            taskId: task.id
          })
        )
      }

      return res.json(task)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async delete(req, res, next) {
    const { id } = req.params;
    await Task.destroy({
      where: { id },
    });
    return res.status(200).json({ message: "Deleted successfully" });
  }

  async getAllWithoutExecutor(req, res) {
    let { typeId, limit, page } = req.query
    page = page || 1
    limit = limit || PAGE_SIZE
    let offset = page * limit - limit
    let tasks;
    if (!typeId) {
      tasks = await Task.findAndCountAll({ where: { executorId: null }, limit, offset })
    }
    if (typeId) {
      tasks = await Task.findAndCountAll({ where: { typeId, executorId: null }, limit, offset })
    }
    return res.json(tasks)
  }

  async getTasksWhereUserOwner(req, res) {
    let { limit, page } = req.query
    page = page || 1
    limit = limit || PAGE_SIZE
    let offset = page * limit - limit
    const ownerId = req.user.id
    const tasks = await Task.findAndCountAll({ where: { ownerId }, limit, offset });

    return res.json(tasks)
  }

  async getTasksWhereUserExecutor(req, res) {
    let { limit, page } = req.query
    page = page || 1
    limit = limit || PAGE_SIZE
    let offset = page * limit - limit
    const executorId = req.user.id
    const tasks = await Task.findAndCountAll({ where: { executorId }, limit, offset });

    return res.json(tasks)
  }


  async update(req, res, next) {
    try {
      const { id: taskId } = req.params;
      let { executorId } = req.body

      const dataToUpdate = {
        executorId,
        status: TASK_STATUS_IN_PROGRESS
      }

      const updatedRowsCount = await Task.update(
        dataToUpdate,
        {
          where: {
            id: taskId,
          }
        }
      )
      const task = await TaskController.getTask(taskId)
      return res.json(task)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getOne(req, res, next) {
    const { id } = req.params
    const task = await TaskController.getTask(id)
    return res.json(task)
  }

  static async getTask(taskId) {
    return await Task.findOne(
      {
        where: { id: taskId },
        include: [{ model: TaskInfo, as: 'info' }]
      },
    )
  }
}

module.exports = new TaskController()
