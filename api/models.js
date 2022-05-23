
// db_connection.js добавлен в .gitignore
const { Sequelize, sequelize } = require("./db_connection")

const Product = sequelize.define("product", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING(1275),
        allowNull: false,
    },
    cost: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    img: {
        type: Sequelize.STRING,
        defaultValue: "/img/avatars/load-error.png",
    },
})
const User = sequelize.define("user", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    surname: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    position: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    mail: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    img: {
        type: Sequelize.STRING,
        defaultValue: "/img/avatars/ava-default.svg",
    },
    note: {
        type: Sequelize.STRING(1275),
    }
});

const Task = sequelize.define("task", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING(1275),
        allowNull: false,
    },
});

const Todo = sequelize.define("todo", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    comment: {
        type: Sequelize.STRING(1275),
        default: 'нет комментария',
        allowNull: false,
    },
    destination: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    sender: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    }
});

User.hasMany(Task, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Task.hasMany(Todo, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

module.exports.model = { users: User, tasks: Task, todos: Todo, products: Product }
