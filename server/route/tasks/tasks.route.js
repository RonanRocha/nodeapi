const express = require('express');

const router = express.Router();

const taskServices = require('../../service/tasks/tasks.service');

router.get('/', async function (req, res) {
    try{
        const tasks = await taskServices.getTasks();
        res.status(200).json(tasks);
    }catch(e) {
        next(e);
    }
  
});

router.get('/:id', async function (req, res, next) {
    const id = req.params.id;
    try {
        const task = await taskServices.getTask(id);
        res.status(200).json(task);
    } catch (e) {
        next(e);
    }
});


router.post('/', async function (req, res, next) {
    const task = req.body;
    try {
        const newTask = await taskServices.saveTask(task);
        res.status(201).json(newTask);
    } catch (e) {
        next(e);
    }

});

router.put('/:id', async function (req, res, next) {
    const task = req.body;
    const id = req.params.id;

    try {
        await taskServices.updateTask(id, task);
        res.status(204).end();
    } catch (e) {
        next(e);
    }


});

router.delete('/:id', async function (req, res, next) {
    const id = req.params.id;

    try {
        await taskServices.deleteTask(id);
        res.status(204).end();
    } catch (e) {
        next(e);
    }


});

module.exports = router;