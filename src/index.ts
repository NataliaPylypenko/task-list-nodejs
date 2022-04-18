import express from 'express'
import tasksRouter from "./routes/taskRoutes";


const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(tasksRouter)


app.listen(PORT, () => console.log(`Running on port ${PORT}`))