
const models = require("./models.js")
const { users, tasks, todos } = models.model

// users
function addUser(name, surname, position, phone, mail) {
    let user = { name, surname, position, phone, mail };
    users.create(user);
};
async function getUser(id) {
    let user = await users.findByPk(id);
    return user;
};
async function updUser(id, profile) {
    await users.update(profile, {
        where: {
            id,
        },
    }).catch(err => console.log(err))
    const user = await getUser(id);
    return (user)
};
async function getUsers() {
    let usersList = await users.findAll({ raw: true });
    return usersList;
};
// tasks
async function addTask(userId, task) {
    let user = await users.findByPk(userId);
    await user.createTask(task);

    let crtdTask = await tasks.findOne({
        where: { userId: userId },
        order: [["updatedAt", "DESC"]],
    });
    return crtdTask;
};
async function getTask(id) {
    let task = await tasks.findByPk(id)
    return task;
};
async function compareLastTask(inStorage, id) {
    let lastInStorage = new Date(inStorage)
    let lastInDB = await tasks.findOne({
        where: { userId: id },
        order: [["updatedAt", "DESC"]],
    });
    if (lastInDB) {
        let timeDB = lastInDB.updatedAt.getTime();
        let timeSt = lastInStorage.getTime();
        return (timeDB === timeSt)
    }
    else return false
};
async function getTasks(id) {
    let myTasks = await tasks.findAll({
        raw: true,
        where: { userId: id },
        order: [["updatedAt", "DESC"]],
    });
    let lastUpd;
    if (myTasks.length) {
        lastUpd = myTasks[myTasks.length - 1].updatedAt;
    } else lastUpd = false;
    return { from: myTasks, lastUpd }
};
async function updTask(id, data) {
    await tasks.update(data, {
        where: {
            id: id
        }
    })
};
async function delTask(id) {
    await tasks.destroy({
        where: {
            id: id,
        },
    });
}
// todo
async function getLastUpdate() {
    let last = await todos.findOne({
        order: [["updatedAt", "DESC"]],
    });
    return last.updatedAt
}
async function compareLastTodo(inStorage) {
    if (inStorage) {
        let lastInStorage = new Date(inStorage)
        let lastInDB = await todos.findOne({
            order: [["updatedAt", "DESC"]],
        });
        let timeDB = lastInDB.updatedAt.getTime();
        let timeSt = lastInStorage.getTime();
        return (timeDB === timeSt)
    } else return false;

};
async function addTodo(id, data) {
    let task = await tasks.findByPk(id);
    await task.createTodo(data);
    const todo = await todos.findOne({
        where: {
            taskId: id,
        },
        order: [["updatedAt", "DESC"]]
    });
    return todo;
};
async function updTodo(id, data) {
    await todos.update(data, {
        where: {
            id: id
        }
    })
};
async function updStatus(id) {
    const todo = await todos.findByPk(id);
    await todo.update({ status: !todo.status }, {
        where: {
            id: id,
        },
    });
    return todo.status
};
async function delTodo(id, task, destination) {
    await todos.destroy({
        where: {
            id: id,
        },
    });
    const availability = await todos.findAll({
        where: {
            taskId: task,
            destination: destination,
        },
    });
    return availability
}
async function getTodos(id) {
    let data = { for: [], from: [], lastUpd: '' }
    data.for = await todos.findAll({
        where: { destination: id }
    });
    if (data.for) {
        data.from = await todos.findAll({
            where: { sender: id }
        });
        [...data.for, ...data.from].forEach(todo => todo.status = Boolean(todo.status));
        data.last = await todos.findOne({
            order: [["updatedAt", "DESC"]],
        });
    };
    return data
};
async function getTodosFromTask(id) {
    let data = await todos.findAll({
        where: { taskId: id },
    });
    let from = new Set();
    data.forEach(todo => from.add(todo.destination));
    return { taskTodos: data, from: [...from] };
};

module.exports = { addUser, getUser, getUsers, updUser, addTask, updTask, delTask, getTask, getTasks, compareLastTask, addTodo, updTodo, getTodos, delTodo, updStatus, getTodosFromTask, compareLastTodo, getLastUpdate }