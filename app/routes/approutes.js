'use strict';
module.exports = function(app) {
var todoList = require('../controller/appController');
var UserManager = require('../controller/appUserController');

// todoList Routes
app.route('/tasks')
    .get(todoList.list_all_tasks)
    .post(todoList.create_a_task);
    app.route('/tasks/:taskId')
    .get(todoList.read_a_task)
    .put(todoList.update_a_task)
    .delete(todoList.delete_a_task);
    app.route('/Users')
    .post(UserManager.create_a_User)
    .get(UserManager.list_all_Users)
    app.route('/Users/:Username/:Password')
    .get(UserManager.read_a_User)

};