const database = require('../../infra/database');


exports.getTasks = () => {

    return  database.query("SELECT * FROM tasks");
}


exports.saveTask = (task) => {

    return  database.one("INSERT INTO tasks (description,isdone) values($1,$2) returning *", [task.description, task.isdone]);
}

exports.deleteTask = (id) => {

    return database.none("DELETE FROM tasks where id = $1", [id]);
}

exports.getTask = (id) => {

    return database.oneOrNone("SELECT * FROM tasks where id = $1", [id]);
}

exports.getTaskByDescription = (description) => {

    return database.oneOrNone("SELECT * FROM tasks where description = $1", [description]);
}

exports.updateTask = (id, task) => {

    return database.none("UPDATE tasks SET description = $1, isdone = $2 where id = $3", [task.description,task.isdone,id]);
}

