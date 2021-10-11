const axios = require('axios');
const taskServices = require('../../service/tasks/tasks.service');
const crypto = require('crypto');

const generate = () => {
    return crypto.randomBytes(20).toString('hex');
}

const request = (url, method, data) => {
    return axios({
        url: url,
        method: method,
        data : data,
        validateStatus: false
    });
}

test('Should get tasks', async function() {

    const task1 = await taskServices.saveTask({description: generate(), isdone: false});
    const task2 = await taskServices.saveTask({description: generate(), isdone: false});
    const task3 = await taskServices.saveTask({description: generate(), isdone: false});

    const res = await request('http://localhost:3000/tasks', 'get');

    expect(res.status).toBe(200);

    const tasks = res.data;

    expect(tasks).toHaveLength(3);

    await taskServices.deleteTask(task1.id);
    await taskServices.deleteTask(task2.id);
    await taskServices.deleteTask(task3.id);


});

test('Should get a task', async function() {

    const data = await taskServices.saveTask({description: generate(), isdone: false});
  
    const res = await request(`http://localhost:3000/tasks/${data.id}`, 'get');

    expect(res.status).toBe(200);

    const task = res.data;
    
    expect(data.description).toBe(task.description);
    expect(data.isdone).toBe(task.isdone);

    await taskServices.deleteTask(task.id);
    
});

test('Should save a task', async function() {

    const data =  { description: generate(), isdone: false };
    
    const res = await request('http://localhost:3000/tasks', 'post', data);

    expect(res.status).toBe(201);

    const task = res.data;

    expect(task.description).toBe(data.description);
    expect(task.isdone).toBe(data.isdone);
    

    await taskServices.deleteTask(task.id);

});

test('Should not save a task', async function() {

    const data =  { description: generate(), isdone: false };
    
    const request1 = await request('http://localhost:3000/tasks', 'post', data);
    const request2 = await request('http://localhost:3000/tasks', 'post', data);

    expect(request2.status).toBe(409);

    const task = request1.data;

    await taskServices.deleteTask(task.id);

});

test('Should update a task', async function() {

    const task = await taskServices.saveTask({description: generate(), isdone: false});
    task.isdone = true;
    task.description = generate();   
    const res = await request(`http://localhost:3000/tasks/${task.id}`, 'put', task);

    expect(res.status).toBe(204);

    const updatedTask = await taskServices.getTask(task.id);

    expect(updatedTask.description).toBe(task.description);
    expect(updatedTask.isdone).toBe(task.isdone);
    

    await taskServices.deleteTask(task.id);

});

test('Should not update a task', async function() {

    const task =  {
        id: 1
    };

    const res = await request(`http://localhost:3000/tasks/${task.id}`, 'put', task);

    expect(res.status).toBe(404);

});

test('Should delete a task', async function() {

    const task = await taskServices.saveTask({description: generate(), isdone: false});

    const res = await request(`http://localhost:3000/tasks/${task.id}`, 'delete', task);

    expect(res.status).toBe(204);

    const tasks = await taskServices.getTasks();

    expect(tasks).toHaveLength(0);

});