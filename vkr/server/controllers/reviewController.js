const { Review, Task } = require('../models/models')
const ApiError = require('../error/ApiError');
const { TASK_STATUS_READY } = require('../constants');

class ReviewController {
    async create(req, res) {
        const { rating, executorId, taskId } = req.body
        const review = await Review.create({ rating, userId: executorId })

        Task.update(
            { status: TASK_STATUS_READY },
            { where: { id: taskId } }
        )

        return res.json(review)
    }
}

module.exports = new ReviewController()
