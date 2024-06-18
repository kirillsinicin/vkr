const { TASK_STATUS_IN_PROGRESS } = require("../constants")


class StatisticController {

    async getTasksByStatus(req, res){
        return res.json([{label: TASK_STATUS_IN_PROGRESS, data: "7"}])
    }

    async getTasksByType(req, res){
        return res.json([{label: "Ремонт и строительство", data: "7"}])
    }
  
}

module.exports = new StatisticController()
