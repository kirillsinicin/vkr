const { TASK_STATUS_IN_PROGRESS } = require("../constants")
const uuid = require('uuid')
const path = require('path');
const { Profile, UserContact, Review, User } = require('../models/models')
const ApiError = require('../error/ApiError');
const sequelizeObj = require('../db');
const sequelize = require('sequelize');

class StatisticController {

    async getTasksByStatus(req, res) {
        const statusList = await sequelizeObj.query('SELECT count("tasks"."id") as "data", "tasks"."status" as "label" FROM tasks GROUP BY "tasks"."status"',
            {
                raw: true,
                type: sequelize.QueryTypes.SELECT,
            });
    
        return res.json(statusList)
    }

    async getTasksByType(req, res) {
        const tasksByType = await sequelizeObj.query('SELECT count("tasks"."id") as "data", "types"."name" as "label" FROM tasks INNER JOIN "types" ON "types"."id" = "tasks"."typeId" GROUP BY "types"."name"',
            {
                raw: true,
                type: sequelize.QueryTypes.SELECT,
            });
    
        return res.json(tasksByType)
    }

}

module.exports = new StatisticController()
