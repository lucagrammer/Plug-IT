import express from 'express'
import initializeDatabase from '../db-conn'
const app = express()

// We need this one if we send data inside the body as JSON
app.use(express.json())

async function init() {
  // Call the init function that returns the Database
  const db = await initializeDatabase()
  // Let's extract all the objects we need to perform queries inside the endpoints
  const { Events, People, Services } = db._tables
  // API to get all the events
  app.get('/events', async (req, res) => {
    const events = await Events.findAll()
    return res.json(events)
  })
  // API to get a event by ID.
  app.get('/events/:id', async (req, res) => {
    const { id } = req.params
    const event = await Events.findOne({
      where: { id },
    })
    return res.json(event)
  })
  // API to get all the people
  app.get('/people', async (req, res) => {
    const people = await People.findAll()
    return res.json(people)
  })
  // API to get a person by ID.
  app.get('/people/:id', async (req, res) => {
    const { id } = req.params
    const person = await People.findOne({
      where: { id },
    })
    return res.json(person)
  })
  // API to get all the services
  app.get('/services', async (req, res) => {
    const services = await Services.findAll()
    return res.json(services)
  })
  // API to get a service by ID.
  app.get('/services/:id', async (req, res) => {
    const { id } = req.params
    const service = await Services.findOne({
      where: { id },
    })
    return res.json(service)
  })
  
}

init()

export default app
