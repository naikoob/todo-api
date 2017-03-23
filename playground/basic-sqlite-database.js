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

var User = sequelize.define('users', {
    email: Sequelize.STRING
});

Todo.belongsTo(User);
User.hasMany(Todo);

sequelize.sync({
    force: false
}).then(function () {
    console.log('Everything is synced!');

    User.findById(1).then(function (user) {
        user.getTodos({
            where: {
                completed: false
            }
        }).then(function (todos) {
             todos.forEach(function (todo) {
                 console.log(todo.toJSON());
             });
        })
    })

    // User.create({
    //     email: 'abc@some.com'
    // }).then(function () {
    //     Todo.create({
    //         description: 'walk the dog'
    //     }).then(function (todo) {
    //         User.findById(1).then(function(user) {
    //             user.addTodo(todo);
    //         });
    //     })
    // }, function() {

    // });

    // Todo.findById(3).then(function (todo) {
    //     if (todo) {
    //         console.log(todo.toJSON());
    //     } else {
    //         console.log('todo not found');
    //     }
    // });
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
