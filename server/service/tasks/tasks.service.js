const taskData = require('../../data/tasks/tasks.data');


exports.getTasks = () => {

    return taskData.getTasks();
}

exports.saveTask = async function (task){
    const existingTask = await taskData.getTaskByDescription(task.description);
    if(existingTask) throw new Error('Task already exists');
    return taskData.saveTask(task);
}

exports.deleteTask = (id) =>  {

    return taskData.deleteTask(id);
}

exports.getTask = async function (id) {
    const task = await taskData.getTask(id);
    if(!task) throw new Error('Task not found');
    return task;
}

exports.updateTask = async function(id, task) {
    await exports.getTask(id);
    return taskData.updateTask(id,task);
}

