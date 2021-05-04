import express from 'express'
import initializeDatabase from '../db-conn'
const app = express()

// We need this one if we send data inside the body as JSON
app.use(express.json())

async function init() {
  // Call the init function that returns the Database
  const db = await initializeDatabase()
  // Let's extract all the objects we need to perform queries inside the endpoints
  const { Event, Person, Area, Service, Message } = db._tables

  // _____________EVENTS_________________
  // API to get all the Events
  // USED IN EVENTS PAGE
  app.get('/events', async (req, res) => {
    const events = await Event.findAll()
    return res.json(events)
  })

  // NOTE: ALL THE EVENTS IN EVENTS PAGE CAN BE RETRIEVED BY RETRIEVING AREA, SO THE FILTER WILL BE POPULATED AND EVENTS ARE SHOWN;
  // ALTERNATIVE IS FILTERING CLIENT SIDE.
  // ANTOHER ALTERNATIVE IS:
  // API to get all events for an area.
  // USED IN EVENTS PAGE
  app.get('/event/:area', async (req, res) => {
    const { area } = req.params
    const event = await Event.findAll({
      where: {
        area_name: area,
      },
    })
    return res.json(service)
  })
  // API to get a event by ID.
  // USED IN EVENT PAGE
  app.get('/event/:id', async (req, res) => {
    const { id } = req.params
    const event = await Event.findByPk(id, { include: Person })
    return res.json(event)
  })

  // _____________AREAS________________________
  // API to get all areas, needed to populate the dropdown menu/area introductory page
  // USED IN DROPDOWN MENU/AREA INTRODUCTORY
  app.get('/areas', async (req, res) => {
    const areas = await Area.findAll()
    return res.json(areas)
  })

  // API to get an area - will get all events by navigation, so no need to explicitly fetch events by area. Event, Service and Person are eagerly fetched to populate the Area page
  // USED IN AREA PAGE
  // USED IN AREA TEAM PAGE (which requires Person to be included)
  app.get('/area/:name', async (req, res) => {
    const { name } = req.params
    const area = await Area.findByPk(name, {
      include: [Event, Service, Person],
    })
    return res.json(area)
  })

  // _______________PEOPLE_______________________
  // API to get all the people
  // USED IN PEOPLE PAGE
  app.get('/people', async (req, res) => {
    const people = await Person.findAll()
    return res.json(people)
  })

  // API to get a person by ID.
  // USED IN PERSON PAGE
  app.get('/person/:id', async (req, res) => {
    const { id } = req.params
    const person = await Person.findByPk(id, { include: Service })
    return res.json(person)
  })

  // _________________SERVICES____________________
  // API to get all the services
  // USED IN OUT SERVICES PAGE
  app.get('/services', async (req, res) => {
    const services = await Service.findAll()
    return res.json(services)
  })
  // NOTE: ALL THE SERVICES IN SERVICES PAGE CAN BE RETRIEVED BY RETRIEVING AREA, SO THE FILTER WILL BE POPULATED AND SERVICES ARE SHOWN;
  // ALTERNATIVE IS FILTERING CLIENT SIDE.
  // ANTOHER ALTERNATIVE IS:
  // USED IN OUT SERVICES PAGE
  app.get('/service/:area', async (req, res) => {
    const { area } = req.params
    const service = await Service.findAll({
      where: {
        area_name: area,
      },
    })
    return res.json(service)
  })

  // API to get a service by ID.
  // USED IN Service Page
  // USED IN SERVICE TEAM PAGE (which requires "Person" to be included)
  app.get('/service/:id', async (req, res) => {
    const { id } = req.params
    const service = await Service.findByPk(id, { include: Person })
    return res.json(service)
  })

  app.post('/message', async (req, res) => {
    console.log(req.body)
    const { name, surname, email, subject, message } = req.body
    console.log(name)
    const messageObj = Message.build({
      name: name,
      surname: surname,
      email: email,
      subject: subject,
      message: message,
    })
    await messageObj.save()
    res.sendStatus(200)
  })
}

init()

export default app
