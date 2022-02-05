const express = require('express');

const router = express.Router();

const taskServices = require('../../service/tasks/tasks.service');

router.get('/', async function (req, res) {
    try{
        const tasks = await taskServices.getTasks();

        setTimeout(() => {
            res.status(200).json(tasks);
        },1000);

       
    }catch(e) {
        next(e);
    }
  
});

router.get('/:id', async function (req, res, next) {
    const id = req.params.id;
    try {
        const task = await taskServices.getTask(id);

        setTimeout(() => {
            res.status(200).json(task);
        },500);
       
    } catch (e) {
        next(e);
    }
});


router.post('/', async function (req, res, next) {
    const task = req.body;
    try {
        const newTask = await taskServices.saveTask(task);

        setTimeout(() => {
            res.status(201).json(newTask);
        },1000);
       
    } catch (e) {
        next(e);
    }

});

router.put('/:id', async function (req, res, next) {
    const task = req.body;
    const id = req.params.id;

    try {
        await taskServices.updateTask(id, task);

        setTimeout(() => {
            res.status(204).end();
        },1000);

       
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