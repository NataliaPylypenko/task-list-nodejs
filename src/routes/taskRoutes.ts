import Router from 'express'
import {tasks, STATUS, CATEGORIES} from "../db/db";
import {getRandomId} from "../helpers/functions";
import moment from "moment";
import {TaskInterfaceSummary} from "../types/tasks";
import {object, string} from "yup";

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

    if (idx === -1) res.status(404).send('Task not found')

    res.json(tasks[idx])
}))


router.delete('/tasks/:id', ((req, res, next) => {
    const id = req.params.id

    const idx = tasks.findIndex(task => task.id === id);

    if (idx === -1) res.status(404).send('Task not found')

    tasks.splice(idx, 1)

    res.status(204).send('No content')
}))

router.post('/tasks', (async (req, res, next) => {
    try {
        const taskSchema = object({
            name: string().required(),
            content: string().required(),
            category: string().required().oneOf(CATEGORIES),
        });

        await taskSchema.validate(req.body);

        const newTask = {
            ...req.body,
            id: getRandomId(),
            created: moment().format('MMMM DD, YYYY'),
            status: STATUS.ACTIVE
        }

        tasks.push(newTask)
        res.status(201).json(newTask)
    } catch (e) {
        res.status(422).send(e.message)
    }

}))

router.patch('/tasks/:id', (async (req, res, next) => {
    try {
        const taskEditSchema = object({
            name: string().required(),
            content: string().required(),
            category: string().required().oneOf(CATEGORIES),
            status: string().required().oneOf([STATUS.ACTIVE, STATUS.ARCHIVE]),
        });

        await taskEditSchema.validate(req.body);

        const id = req.params.id

        const idx = tasks.findIndex(task => task.id === id);
        if (idx === -1) res.status(404).send('Task not found')

        tasks[idx] = {...tasks[idx], ...req.body};

        res.json(tasks[idx])


    }catch (e){
        res.status(422).send(e.message)
    }

}))


export default router