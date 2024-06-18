const sequelize = require('../db')
const { DataTypes } = require('sequelize')
const {TASK_STATUS_PUBLISHED} = require('../constants')

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
})

const Profile = sequelize.define('profile', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    surname: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    city: { type: DataTypes.STRING },
    img: { type: DataTypes.STRING, allowNull: true },
})

const UserContact = sequelize.define('usercontact', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
})

const Task = sequelize.define('task', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    price: { type: DataTypes.INTEGER, defaultValue: 0 },
    status: { type: DataTypes.STRING, defaultValue: TASK_STATUS_PUBLISHED },
})

const TaskInfo = sequelize.define('taskinfo', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
})

const Review = sequelize.define('review', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rating: { type: DataTypes.INTEGER },
})

const Type = sequelize.define('type', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    isAvailable: { type: DataTypes.BOOLEAN },
})

const Payment = sequelize.define('payment', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    option: { type: DataTypes.STRING },
    isAvailable: { type: DataTypes.BOOLEAN },
})

const NotificationType = sequelize.define('notificationtype', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    isAvailable: { type: DataTypes.BOOLEAN },
})

const Notification = sequelize.define('notification', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    isSend: { type: DataTypes.BOOLEAN },
})

const Response = sequelize.define('response', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
},
    {
        indexes: [
            {
                unique: true,
                fields: ['userId', 'taskId']
            }
        ]
    }
)

const TaskAcceptance = sequelize.define('taskAcceptance', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	accepted: { type: DataTypes.BOOLEAN, defaultValue: false },
})



Profile.hasMany(UserContact, { as: 'userContacts', onDelete: 'CASCADE' })
UserContact.belongsTo(Profile)

User.hasOne(Profile)
Profile.belongsTo(User)

User.hasMany(Task, {
    foreignKey: 'ownerId',
})
Task.belongsTo(User, {
    foreignKey: 'ownerId',
})

User.hasMany(Task, {
    foreignKey: 'executorId',
})
Task.belongsTo(User,{
    foreignKey: 'executorId',
})

User.hasMany(Review)
Review.belongsTo(User)

User.hasMany(Notification)
Notification.belongsTo(User)

NotificationType.hasMany(Notification)
Notification.belongsTo(NotificationType)

Task.hasMany(Notification)
Notification.belongsTo(Task)

Task.hasMany(TaskInfo, { as: 'info', onDelete: 'CASCADE' })
TaskInfo.belongsTo(Task)

Type.hasMany(Task)
Task.belongsTo(Type)

Payment.hasMany(Task)
Task.belongsTo(Payment)

Task.hasMany(Response, {
    foreignKey: 'taskId',
})
Response.belongsTo(Task)

User.hasMany(Response, {
    foreignKey: 'userId',
})
Response.belongsTo(User)

Task.hasMany(TaskAcceptance, {
    foreignKey: 'taskId',
})
TaskAcceptance.belongsTo(Task)

User.hasMany(TaskAcceptance, {
    foreignKey: 'executorId',
})
TaskAcceptance.belongsTo(User, {
    foreignKey: 'executorId',
})

module.exports = {
    User,
    Profile,
    UserContact,
    Task,
    TaskInfo,
    Review,
    Type,
    Payment,
    NotificationType,
    Notification,
    Response,
    TaskAcceptance,
}
