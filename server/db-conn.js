const { Sequelize, DataTypes } = require('sequelize')

// Development
const db = new Sequelize(
  'postgres://postgres:password@localhost:5432/plugit-database'
)
// Production
// const pg = require('pg')
// pg.defaults.ssl = true
// const db = new Sequelize(process.env.DATABASE_URL, {
//  ssl: true,
//  dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
// })

/**
 * Function to define the structure of the database
 */
function defineDatabaseStructure() {
  const Person = db.define(
    'person',
    {
      name: DataTypes.STRING,
      surname: DataTypes.STRING,
      bio: DataTypes.TEXT,
      image: DataTypes.STRING,
      position: DataTypes.STRING,
      linkedin: DataTypes.STRING,
    },
    {
      underscored: true,
      timestamps: false,
    }
  )

  const Area = db.define(
    'area',
    {
      name: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      icon: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      overview: DataTypes.TEXT,
      paragraph1: DataTypes.TEXT,
      image1: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      imageCap1: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      paragraph2: DataTypes.TEXT,
      image2: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      imageCap2: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      underscored: true,
      timestamps: false,
    }
  )

  const Service = db.define(
    'service',
    {
      name: DataTypes.STRING,
      slogan: DataTypes.STRING,
      icon: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      paragraph1: DataTypes.TEXT,
      image1: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      imageCap1: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      paragraph2: DataTypes.TEXT,
      image2: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      imageCap2: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      underscored: true,
      timestamps: false,
    }
  )

  const Event = db.define(
    'event',
    {
      title: DataTypes.STRING,
      icon: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      date: DataTypes.DATEONLY,
      time: DataTypes.TIME,
      location: DataTypes.TEXT,
      map: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      overview: DataTypes.TEXT,
      paragraph: DataTypes.TEXT,
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      imageCap: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      underscored: true,
      timestamps: false,
    }
  )

  const Message = db.define(
    'message',
    {
      name: DataTypes.STRING,
      surname: DataTypes.STRING,
      email: DataTypes.STRING,
      subject: DataTypes.STRING,
      message: DataTypes.TEXT,
    },
    {
      underscored: true,
      timestamps: false,
    }
  )

  // Creating the N -> N association between EVENT and PERSON
  Event.belongsToMany(Person, { through: 'eventHost', timestamps: false }) // to show hosts in event page
  // Person.belongsToMany(Event, { through: 'eventHost' })

  // Creating the 1 -> N association between EVENT and AREA
  Area.hasMany(Event) // to show events in area page
  Event.belongsTo(Area) // to show to which area an event belongs

  // Creating the N -> N association between SERVICE and PERSON: ASSISTANCE
  Service.belongsToMany(Person, {
    as: 'assistants',
    through: 'assistance',
    timestamps: false,
  }) // to show team in service team page
  Person.belongsToMany(Service, {
    as: 'tasksAsAssistant',
    through: 'assistance',
    timestamps: false,
  }) // to show tasks in person page

  // Creating the 1 -> N association between PERSON and SERVICE: PROJECT MANAGER
  Person.hasMany(Service, {
    as: 'tasksAsPM',
    foreignKey: 'project_manager',
  }) // to show "Responsibilities" in person page
  Service.belongsTo(Person, { as: 'pm', foreignKey: 'project_manager' }) // to show "Service PM in Service Team page"

  // Creating the 1 -> N association between SERVICE and AREA: SERVICES RELATED TO AREA
  Area.hasMany(Service) // to show services in area
  Service.belongsTo(Area) // needed to show area name

  // Creating the 1 -> 1 association between PERSON and AREA: RESPONSIBLE.
  Person.hasOne(Area, { as: 'responsibility', foreignKey: 'responsible' }) // to show "Responsibilities" in person page
  Area.belongsTo(Person, { as: 'area_responsible', foreignKey: 'responsible' }) // to show "Area responsible in Area Team page"

  // REMOVED RELATIONSHIP
  // Creating the N -> N association between AREA and PERSON: AREA WORKERS
  // Area.belongsToMany(Person, {
  //   as: 'workers',
  //   through: 'employee',
  //   timestamps: false,
  // }) // to show team (employees) in area team page
  // Person.belongsToMany(Area, { through: 'employee', timestamps: false }) // to show tasks in person page

  // CORRESPONDING API REMOVED
  // const person = await Area.findByPk(id, {
  //   attributes: [],
  //   include: [
  //     {
  //       model: Person, // include area responsible
  //       as: 'area_responsible',
  //       attributes: ['id', 'name', 'surname', 'image', 'position'],
  //     },
  //     {
  //       model: Person, // include area workers
  //       as: 'workers',
  //       attributes: ['id', 'name', 'surname', 'image', 'position'],
  //     },
  //   ],
  //   order: [
  //     [{ model: Person, as: 'area_responsible' }, 'surname', 'ASC'],
  //     [{ model: Person, as: 'workers' }, 'surname', 'ASC'],
  //   ],
  // })

  db._tables = {
    Event,
    Person,
    Area,
    Service,
    Message,
  }
}

/**
 * Function to initialize the database. This is exported and called in the main api.js file
 */
async function initializeDatabase() {
  // Call the function for the database structure definition
  defineDatabaseStructure()
  // Synchronize Sequelize with the actual database
  await db.sync({ force: false })

  return db
}

export default initializeDatabase
