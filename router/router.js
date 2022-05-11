const express = require('express')
const storage = require("../api/actions.js");
// mailer-log.js - добавлен в .gitignore
const mailer = require('../api/mailer-log.js')

//profile
const profile = express.Router()
const multer = require("multer");
const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/img/avatars");
    },
    filename: (req, file, cb) => {
        return cb(null, `ava_${req.query.id}${+new Date()}.png`);
    }
});

profile.post("/updt-ava", multer({ storage: storageConfig }).single("img"), function (request, response) {
    const exp = /(\\|\/)img/i
    let path = request.file.path.slice(request.file.path.search(exp));
    response.send({ path })
});
profile.put("/updt-info", async function (request, response) {
    const user = await storage.updUser(request.query.id, request.body)
    response.send(user)
});
profile.get("/login", function (request, response) {
    mailer.reportEntry(request.query.id)
    console.log("LOGERR")
})

//users
const users = express.Router()
users.get('/', async function (request, response) {
    const users = await storage.getUsers()
    response.send(users)
});
users.get("/user", async function (request, response) {
    const user = await storage.getUser(request.query.id)
    response.send(user)
});

// todos
const todos = express.Router();
todos.get("/", async function (request, response) {
    let lastEqual = await storage.compareLastTodo(request.query.last);
    if (!lastEqual) {
        const data = await storage.getTodos(request.query.id);
        response.send(data)
    } else { response.status(304).end() }
});
todos.put("/upd-status", async function (request, response) {
    const data = await storage.updStatus(request.query.id)
    // response.send(data)
});
todos.put("/send-todo", async function (request, response) {
    if (await storage.updTodo(request.query.id, request.body)) {
        response.send({ ...request.body, id: +request.query.id })
    };
});
todos.post("/send-todo", async function (request, response) {
    const data = await storage.addTodo(request.query.id, request.body)
    response.send(data);
});
todos.delete("/rm-todo", async function (request, response) {
    await storage.delTodo(request.query.id, request.query.task, request.query.destination)
        .then(data => {
            if (data.length) {
                response.status(200).end();
            } else response.status(205).end();
        });
});
//tasks
const tasks = express.Router()
tasks.get("/", async function (request, response) {
    let lastEqual = await storage.compareLastTask(request.query.last, request.query.id);
    if (!lastEqual) {
        const data = await storage.getTasks(request.query.id);
        response.send(data);
    } else { response.status(304).end(); };
});
tasks.put("/updt-task", async function (request, response) {
    await storage.updTask(request.query.id, request.body);
})
tasks.get("/task-todos", async function (request, response) {
    let data = await storage.getTodosFromTask(request.query.id)
    response.send(data)
});
tasks.post("/add-task", async function (request, response) {
    const data = await storage.addTask(request.query.id, request.body);
    response.send(data)
});
tasks.delete("/rm-task", async function (request, response) {
    await storage.delTask(request.query.id);
    response.send();
})

module.exports = { profile, users, todos, tasks }

