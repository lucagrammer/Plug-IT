import express from 'express'
import initializeDatabase from '../db-conn'
const app = express()

// We need this one if we send data inside the body as JSON
app.use(express.json())

async function init() {
  // Call the init function that returns the Database
  const db = await initializeDatabase()
  // Let's extract all the objects we need to perform queries inside the endpoints
  const {
    Event,
    Person,
    Area,
    Service,
    Message,
   } = db._tables
  // API to get all the Events
  app.get('/events', async (req, res) => {
    const events = await Event.findAll()
    return res.json(events)
  })
  // API to get a event by ID.
  app.get('/event/:id', async (req, res) => {
    const { id } = req.params
    const event = await Event.findByPk(id)
    return res.json(event)
  })

  //API to get all areas, needed to populate the dropdown menu/area introductory page
  app.get('/areas', async (req, res) => {
    const areas = await Area.findAll()
    return res.json(areas)
  })

    //API to get an area - will get all events by navigation, so no need to explicitly fetch events by area. Event, Service and Person are eagerly fetched to populate the page
    app.get('/area/:name', async (req, res) => {
      const { name } = req.params
      const area = await Area.findAll ({include:  [Event, Service, Person]})
      return res.json(area)
    })


/*
    // API to get all events for an area.
    app.get('/event/:area', async (req, res) => {
      const { area } = req.params
      const event = await Event.findOne({
        where: { id },
      })
      return res.json(event)
    })
  */

  // API to get all the people
  app.get('/people', async (req, res) => {
    const people = await Person.findAll()
    return res.json(people)
  })
  // API to get a person by ID.
  app.get('/person/:id', async (req, res) => {
    const { id } = req.params
    const person = await Person.findByPk(id)
    return res.json(person)
  })
  // API to get all the services
  app.get('/services', async (req, res) => {
    const services = await Service.findAll()
    return res.json(services)
  })
  // API to get a service by ID.
  app.get('/service/:id', async (req, res) => {
    const { id } = req.params
    const service = await Service.findByPk(id)
    return res.json(service)
  })
  
}

init()

export default app
