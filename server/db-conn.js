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
      email: DataTypes.STRING,
      bio: DataTypes.TEXT,
      image: DataTypes.STRING,
      position: DataTypes.STRING,
      linkedin: DataTypes.STRING,
    },
    {
      underscored: true,
    }
  )
  const Area = db.define(
    'area',
    {
      name: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      overview: DataTypes.TEXT,
      paragraph1: DataTypes.TEXT,
      image1: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      paragraph2: DataTypes.TEXT,
      image2: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      underscored: true,
    }
  )
  const Service = db.define(
    'service',
    {
      name: DataTypes.STRING,
      paragraph1: DataTypes.TEXT,
      image1: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      paragraph2: DataTypes.TEXT,
      image2: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      underscored: true,
    }
  )
  const Event = db.define(
    'event',
    {
      title: DataTypes.STRING,
      date: DataTypes.DATEONLY,
      time: DataTypes.TIME,
      location: DataTypes.TEXT,
      latitude: DataTypes.STRING,
      longitude: DataTypes.STRING,
      overview: DataTypes.TEXT,
      paragraph: DataTypes.TEXT,
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      underscored: true,
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
    }
  )

  // Creating the N -> N association between Event and Person
  Event.belongsToMany(Person, { through: 'eventHost' }) //to show hosts in event page
  //Person.belongsToMany(Event, { through: 'eventHost' }) //not needed

  // Creating the N -> N association between Service and Person: ASSISTANCE
  Service.belongsToMany(Person, { through: 'assistance' }) //to show team in service team page
  Person.belongsToMany(Service, { through: 'assistance' }) //to show tasks in person page

  // Creating the 1 -> N association between Event and Area
  Area.hasMany(Event)  //to show events in area page
  Event.belongsTo(Area) //to show to which area an event belongs

  // Creating the 1 -> N association between Person and Service: PROJECT MANAGER
  Person.hasMany(Service, { foreignKey: 'project_manager' }) //to show "Responsibilities" in person page
  Service.belongsTo(Person, { foreignKey: 'project_manager' }) //to show "Service PM in Service Team page" NOTE: MAYBE CAN BE EASIER VIA QUERYING

  // Creating the 1 -> N association between Service and Area: SERVICES RELATED TO AREA
  Area.hasMany(Service) //to show services in area
  Service.belongsTo(Area) //NEEDED TO SHOW JUST AREA NAME!
  
  // Creating the 1 -> 1 association between Person and Area: RESPONSIBLE. NEEDED FROM BOTH SIDES
  Person.hasOne(Area, { foreignKey: 'responsible' }) //to show "Responsibilities" in person page
  Area.belongsTo(Person, { foreignKey: 'responsible' }) //to show "Area responsible in Area Team page" NOTE: MAYBE CAN BE EASIER VIA QUERYING
  // Creating the N -> N association between Area and Person. EMPLOYEE (WORKS IN AREA)
  Area.belongsToMany(Person, { through: 'employee' }) //to show team (employees) in area team page
  Person.belongsToMany(Area, { through: 'employee' }) //to show tasks in person page

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
