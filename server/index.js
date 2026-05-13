import cors from 'cors'
import express from 'express'

const PORT = Number(process.env.PORT) || 3001

let tasks = []
let nextId = 1

const app = express()

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      'http://localhost:4173',
      'http://127.0.0.1:4173',
    ],
  }),
)
app.use(express.json())

app.get('/api/tasks', (_req, res) => {
  res.json(tasks)
})

app.post('/api/tasks', (req, res) => {
  const title =
    typeof req.body?.title === 'string' ? req.body.title.trim() : ''
  if (!title) {
    res.status(400).json({ error: 'El campo title es obligatorio' })
    return
  }

  const descriptionRaw = req.body?.description
  const description =
    descriptionRaw == null || descriptionRaw === ''
      ? null
      : String(descriptionRaw).trim() || null

  const completed = Boolean(req.body?.completed)

  const task = {
    id: nextId++,
    title,
    description,
    completed,
  }
  tasks.push(task)
  res.status(201).json(task)
})

app.patch('/api/tasks/:id', (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id)) {
    res.status(400).json({ error: 'Id inválido' })
    return
  }

  const index = tasks.findIndex((t) => t.id === id)
  if (index === -1) {
    res.status(404).json({ error: 'Tarea no encontrada' })
    return
  }

  if (req.body && Object.prototype.hasOwnProperty.call(req.body, 'completed')) {
    tasks[index] = {
      ...tasks[index],
      completed: Boolean(req.body.completed),
    }
  } else {
    tasks[index] = { ...tasks[index], completed: true }
  }

  res.json(tasks[index])
})

app.delete('/api/tasks/:id', (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id)) {
    res.status(400).json({ error: 'Id inválido' })
    return
  }

  const before = tasks.length
  tasks = tasks.filter((t) => t.id !== id)
  if (tasks.length === before) {
    res.status(404).json({ error: 'Tarea no encontrada' })
    return
  }

  res.status(204).send()
})

app.listen(PORT, () => {
  console.log(`TaskTracker API escuchando en http://localhost:${PORT}`)
})
