
const express = require("express");
app = express();

const history = require('connect-history-api-fallback');
const cors = require("cors");
const multer = require("multer");
const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/img/avatars");
    },
    filename: (req, file, cb) => {
        return cb(null, `ava_${req.query.id}${+new Date()}.png`);
    }
});

const storage = require("./api/actions.js");
const bodyParser = require('body-parser');
app.use(cors())
app.use(bodyParser.json())

//user
app.post("/api/profile-ava", multer({ storage: storageConfig }).single("img"), function (request, response) {
    const exp = /\\img/i
    let path = request.file.path.slice(request.file.path.search(exp));
    response.send({ path })
});
app.put("/api/profile", async function (request, response) {
    const user = await storage.updUser(request.query.id, request.body)
    response.send(user)
})
// users
app.get("/api/user", async function (request, response) {
    const user = await storage.getUser(request.query.id)
    response.send(user)
});
app.get("/api/users", async function (request, response) {
    const users = await storage.getUsers()
    response.send(users)
});
// todos
app.get("/api/todos", async function (request, response) {
    let lastEqual = await storage.compareLastTodo(request.query.last);
    if (!lastEqual) {
        const data = await storage.getTodos(request.query.id);
        response.send(data)
    } else { response.status(304).end() }
});
app.put("/api/updStatus", async function (request, response) {
    const data = await storage.updStatus(request.query.id)
    // response.send(data)
});
app.put("/api/sendTodo", async function (request, response) {
    await storage.updTodo(request.query.id, request.body)
});
app.post("/api/sendTodo", async function (request, response) {
    const data = await storage.addTodo(request.query.id, request.body)
    response.send(data);
});

app.delete("/api/deltodos", async function (request, response) {
    await storage.delTodo(request.query.id, request.query.task, request.query.destination)
        .then(data => {
            if (data.length) {
                response.status(200).end();
            } else response.status(205).end();
        });
});
// tasks
app.get("/api/tasks", async function (request, response) {
    let lastEqual = await storage.compareLastTask(request.query.last, request.query.id);
    if (!lastEqual) {
        const data = await storage.getTasks(request.query.id);
        response.send(data);
    } else { response.status(304).end(); };
});
app.put("/api/updtask", async function (request, response) {
    await storage.updTask(request.query.id, request.body);
})
app.get("/api/task/todos", async function (request, response) {
    let data = await storage.getTodosFromTask(request.query.id)
    response.send(data)
});
app.post("/api/addtask", async function (request, response) {
    const data = await storage.addTask(request.query.id, request.body);
    response.send(data)
});
app.delete("/api/deltask", async function (request, response) {
    await storage.delTask(request.query.id);
})

app.use(history());
app.use("/", express.static(__dirname + "/public"));
app.listen(3000)