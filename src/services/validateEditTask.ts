import express from "express";
import {object, string} from "yup";
import {CATEGORIES, STATUS} from "../db/db";

export const validateEditTask =  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const taskSchema = object({
            name: string().required(),
            content: string().required(),
            category: string().required().oneOf(CATEGORIES),
            status: string().required().oneOf([STATUS.ACTIVE, STATUS.ARCHIVE]),
        });
        await taskSchema.validate(req.body);
    } catch (e) {
        res.status(422).send(e.message)
    }

    next()
}