import Router from 'express'
import {tasks} from "../db/tasks";

const router = Router()

router.get('/tasks', ((req, res, next) => {
    res.json(tasks)
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

export default router