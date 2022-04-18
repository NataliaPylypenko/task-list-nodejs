import Router from 'express'
import {tasks} from "../db/tasks";

const router = Router()

router.get('/tasks', ((req, res, next) => {
    res.json(tasks)
}))

export default router