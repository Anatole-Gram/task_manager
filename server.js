
const express = require("express");
const history = require('connect-history-api-fallback');
const cors = require("cors");
const router = require('./router/router.js');
const bodyParser = require('body-parser');
app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/profile/', router.profile);
app.use('/api/users/', router.users);
app.use('/api/todos/', router.todos);
app.use('/api/tasks/', router.tasks);
app.use("/", history(), express.static(__dirname + "/public"));
app.listen(3000, () => console.log('server listet port: 3000'));