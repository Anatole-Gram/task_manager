
const models = require("./models.js")
const { users, tasks, todos } = models.model

const itemByPk = (model, id) => model.findByPk(id);
const itemUpdt = (model, id, data) => model.update(data, { where: { id, }, });
const lastUpdtItem = (model, options) => model.findOne({ ...options, order: [["updatedAt", "DESC"]], });
const getUsers = async () => await users.findAll({ raw: true });

// users
function addUser(name, surname, position, phone, mail) {
    let user = { name, surname, position, phone, mail };
    users.create(user);
};
async function getUser(id) {
    return await itemByPk(users, id)
};
async function updUser(id, data) {
    await itemUpdt(users, id, data)
    return await getUser(id);
};
//tasks
async function addTask(userId, task) {
    await itemByPk(users, userId)
        .then(async usr => await usr.createTask(task))
    return await lastUpdtItem(tasks);
};
async function getTask(id) {
    return await itemByPk(tasks, id)
};
async function compareLastTask(inStorage, userId) {
    let lastInStorage = new Date(inStorage);
    let lastInDB = await lastUpdtItem(tasks, { where: { userId, }, });
    return lastInDB ? (lastInDB.updatedAt.getTime() === lastInStorage.getTime()) : false;
};
async function getTasks(userId) {
    return {
        from: await tasks.findAll({ where: { userId, }, }),
        lastUpd: await lastUpdtItem(tasks, { where: { userId, }, })
    };

};
async function updTask(id, data) {
    await itemUpdt(tasks, id, data)
};
async function delTask(id) {
    await tasks.destroy({ where: { id, }, });
};

// todo
async function getLastUpdate() {
    return await lastUpdtItem(todos).updatedAt
};
async function compareLastTodo(inStorage) {
    return inStorage ?
        new Date(inStorage).getTime() === await lastUpdtItem(todos).updatedAt.getTime() :
        false;
};
async function addTodo(taskId, data) {
    await tasks.findByPk(taskId).then(async task => await task.createTodo(data));
    return await lastUpdtItem(todos, { where: { taskId, }, });
};
async function updTodo(id, data) {
    return await itemUpdt(todos, id, data);
};
async function updStatus(id) {
    const todo = await itemByPk(todos, id)
    await itemUpdt(todos, id, { status: !todo.status },);
    return todo.status;
};
async function delTodo(id, taskId, destination) {
    await todos.destroy({ where: { id, }, },);
    return await todos.findAll({ where: { taskId, destination }, },);
};
async function getTodos(id) {
    let data = { for: [], from: [], lastUpd: await lastUpdtItem(todos), }
    if (data.lastUpd) {
        data.for = await todos.findAll({ where: { destination: id, }, });
        data.from = await todos.findAll({ where: { sender: id, }, });
        [...data.for, ...data.from].forEach(todo => todo.status = Boolean(todo.status))
    };
    return data
};
async function getTodosFromTask(taskId) {
    let data = await todos.findAll({
        where: { taskId, },
    });
    let from = new Set();
    data.forEach(todo => from.add(todo.destination));
    return { taskTodos: data, from: [...from] };
};

module.exports = { addUser, getUser, getUsers, updUser, addTask, updTask, delTask, getTask, getTasks, compareLastTask, addTodo, updTodo, getTodos, delTodo, updStatus, getTodosFromTask, compareLastTodo, getLastUpdate }