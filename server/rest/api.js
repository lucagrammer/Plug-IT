import express from 'express'
import initializeDatabase from '../db-conn'
const { Op, QueryTypes } = require('sequelize')
const moment = require('moment')
const app = express()

// Send data inside the body as JSON
app.use(express.json())

async function init() {
  // Call the init function that returns the Database
  const db = await initializeDatabase()
  // Extract all the objects we need to perform queries inside the endpoints
  const { Event, Person, Area, Service, Message } = db._tables

  // _____________ EVENTS _________________
  // ALL EVENTS: get all the events
  // Used in events introductory page
  app.get('/events', async (req, res) => {
    const events = await Event.findAll({
      attributes: [
        'id',
        'icon',
        'title',
        'areaName',
        'date',
        'time',
        'overview',
      ],
    })
    return res.json(events)
  })

  // NEXT 4 EVENTS: get next 4 events
  // Used in homepage
  app.get('/upcomingEvents', async (req, res) => {
    const events = await Event.findAll({
      attributes: [
        'id',
        'icon',
        'title',
        'areaName',
        'date',
        'time',
        'overview',
      ],
      where: { date: { [Op.gte]: moment().toDate() } },
      order: [['date', 'ASC']],
      limit: 4,
    })
    return res.json(events)
  })

  // EVENT BY ID: get a event by its ID. Include the hosts.
  // Used in event page
  app.get('/event/:id', async (req, res) => {
    const { id } = req.params
    const event = await Event.findByPk(id, {
      include: {
        model: Person, // include the event hosts data
        attributes: ['id', 'name', 'surname', 'image', 'position'],
        through: { attributes: [] }, // prevent mapping object from being added
      },
      order: [[{ model: Person }, 'surname', 'ASC']],
    })
    return res.json(event)
  })

  // _____________ AREAS _________________
  // ALL AREAS: get all the areas
  // Used in area introductory page
  app.get('/areas', async (req, res) => {
    const areas = await Area.findAll({
      attributes: ['icon', 'name', 'overview'],
      order: [['name', 'ASC']],
    })
    return res.json(areas)
  })

  // AREA BY NAME: get an area by its name. Include the services.
  // Used in area page
  app.get('/area/:name', async (req, res) => {
    const { name } = req.params
    const area = await Area.findByPk(name, {
      attributes: { exclude: ['name', 'responsible', 'icon'] },
      include: [
        {
          model: Service, // include the services
          attributes: ['id', 'name', 'icon', 'slogan'],
        },
      ],
      order: [[{ model: Service }, 'name', 'ASC']],
    })
    return res.json(area)
  })

  // _______________ PEOPLE ____________________
  // ALL PEOPLE: get all the people
  // Used in people introductory page
  app.get('/people', async (req, res) => {
    const people = await Person.findAll({
      attributes: ['id', 'name', 'surname', 'image', 'position'],
      order: [['surname', 'ASC']],
    })
    return res.json(people)
  })

  // PEOPLE BY AREA: get people working in a specified area.
  // Used in area team page
  app.get('/areateam/:name', async (req, res) => {
    const { name } = req.params
    const data = {}

    // fetch the area responsible
    const responsibileQuery =
      'SELECT p.id, p.name, p.surname, p.image, p.position ' +
      'FROM people AS p, areas AS a ' +
      'WHERE a.responsible=p.id AND a.name=? '
    data.area_responsible = await db.query(responsibileQuery, {
      nest: true,
      type: QueryTypes.SELECT,
      replacements: [name],
    })

    // fetch people working in projects of the specified area
    const workersQuery =
      'SELECT p.id, p.name, p.surname, p.image, p.position ' +
      'FROM people as p ' +
      'WHERE p.id IN ( ' +
      ' SELECT DISTINCT person_id FROM assistance as a, services as s1 ' +
      ' WHERE s1.area_name=:area AND a.service_id=s1.id ' +
      '  UNION ' +
      ' SELECT DISTINCT project_manager FROM services as s2 ' +
      ' WHERE s2.area_name=:area ' +
      ') ORDER BY p.surname '
    data.workers = await db.query(workersQuery, {
      replacements: { area: name },
      nest: true,
      type: QueryTypes.SELECT,
    })
    return res.json(data)
  })

  // PEOPLE BY SERVICE: get people working in a specified service.
  // Used in service team page
  app.get('/serviceteam/:id', async (req, res) => {
    const { id } = req.params
    const person = await Service.findByPk(id, {
      attributes: ['name'],
      include: [
        {
          model: Person, // include project manager
          as: 'pm',
          attributes: ['id', 'name', 'surname', 'image', 'position'],
        },
        {
          model: Person, // include assistants
          as: 'assistants',
          attributes: ['id', 'name', 'surname', 'image', 'position'],
          through: { attributes: [] }, // prevent mapping object from being added
        },
      ],
      order: [
        [{ model: Person, as: 'pm' }, 'surname', 'ASC'],
        [{ model: Person, as: 'assistants' }, 'surname', 'ASC'],
      ],
    })
    return res.json(person)
  })

  // PERSON BY ID: get a person by its ID
  // Used in person page
  app.get('/person/:id', async (req, res) => {
    const { id } = req.params
    const person = await Person.findByPk(id, {
      include: [
        {
          model: Area, // include areas
          as: 'responsibility',
          attributes: ['name', 'icon'],
        },
        {
          model: Service, // include pm taks
          as: 'tasksAsPM',
          attributes: ['id', 'name', 'icon', 'areaName'],
        },
        {
          model: Service, // include worker tasks
          as: 'tasksAsAssistant',
          attributes: ['id', 'name', 'icon', 'areaName'],
          through: { attributes: [] }, // prevent mapping object from being added
        },
      ],
      order: [
        [{ model: Service, as: 'tasksAsPM' }, 'name', 'ASC'],
        [{ model: Service, as: 'tasksAsAssistant' }, 'name', 'ASC'],
      ],
    })
    return res.json(person)
  })

  // _________________ SERVICES __________________
  // ALL SERVICES: get all the services
  // Used in service introductory page
  app.get('/services', async (req, res) => {
    const services = await Service.findAll({
      attributes: ['id', 'icon', 'name', 'slogan', 'areaName'],
    })
    return res.json(services)
  })

  // SERVICE BY ID: get a service by its ID.
  // Used in service page
  app.get('/service/:id', async (req, res) => {
    const { id } = req.params
    const service = await Service.findByPk(id, {
      attributes: { exclude: ['id', 'icon', 'project_manager'] },
    })
    return res.json(service)
  })

  // _____________ MESSAGE __________________
  // ADD A MESSAGE: to add a message
  app.post('/message', async (req, res) => {
    const { name, surname, email, subject, message } = req.body
    const messageObj = Message.build({
      name,
      surname,
      email,
      subject,
      message,
    })
    await messageObj.save()
    res.sendStatus(200)
  })
}

init()

export default app
