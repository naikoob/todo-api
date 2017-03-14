var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
    'dialect': 'sqlite',
    'storage': __dirname + '/basic-sqlite-database.sqlite'
});

var Todo = sequelize.define('todos', {
    description: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [1, 250]
        }
    },
    completed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});

sequelize.sync({
    //force: true
}).then(function () {
    console.log('Everything is synced!');

    Todo.findById(3).then(function (todo) {
        if (todo) {
            console.log(todo.toJSON());
        } else {
            console.log('todo not found');
        }
    });
    // Todo.create({
    //     description: 'walk the dog'
    // }).then(function (todo) {
    //     return Todo.create({
    //         description: 'take hackerank challenge'
    //     });
    // }).then(function () {
    //     //return Todo.findById(1)
    //     return Todo.findAll({
    //         where: {
    //             completed: false,
    //             description: {
    //                 $like: '%dog%'
    //             }
    //         }
    //     })
    // }).then(function (todos) {
    //     if (todos) {
    //         todos.forEach(function (todo) {
    //             console.log(todo.toJSON());
    //         })
    //     } else {
    //         console.log('No todo found');
    //     }
    // }).catch(function (e) {
    //     console.log(e);
    // })
});
