import Router from 'express'
import {tasks, STATUS, CATEGORIES} from "../db/db";
import {getRandomId} from "../helpers/functions";
import moment from "moment";
import {TaskInterfaceSummary} from "../types/tasks";

const router = Router()

router.get('/tasks', ((req, res, next) => {
    res.json(tasks)
}))

router.get('/tasks/stats', ((req, res, next) => {

    const summary: TaskInterfaceSummary[] = CATEGORIES.map(category => ({
        category,
        active: tasks.filter(task => task.category === category && task.status === STATUS.ACTIVE).length,
        archived: tasks.filter(task => task.category === category && task.status === STATUS.ARCHIVE).length,
    }))

    res.json(summary);
}))

router.get('/tasks/:id', ((req, res, next) => {
    const id = req.params.id

    const idx = tasks.findIndex(task => task.id === id);

    if(idx === -1) res.status(404).send('Task not found')

    res.json(tasks[idx])
}))



router.delete('/tasks/:id', ((req, res, next) => {
    const id = req.params.id

    const idx = tasks.findIndex(task => task.id === id);

    if(idx === -1) res.status(404).send('Task not found')

    tasks.splice(idx, 1)

    res.status(204).send('No content')
}))

router.post('/tasks', ((req, res, next) => {
    const newTask = {
        ...req.body,
        id: getRandomId(),
        created: moment().format('MMMM DD, YYYY'),
        status: STATUS.ACTIVE
    }

    tasks.push(newTask)
    res.status(201).json(newTask)
}))

router.patch('/tasks/:id', ((req, res, next) => {
    const id = req.params.id

    const idx = tasks.findIndex(task => task.id === id);
    if(idx === -1) res.status(404).send('Task not found')

    tasks[idx] = {...tasks[idx], ...req.body};

    res.json(tasks[idx])
}))



export default router