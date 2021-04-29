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
  const People = db.define(
    'people',
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

  // Creating the N -> N association between Event and People
  Event.belongsToMany(People, { through: 'eventHost' })
  People.belongsToMany(Event, { through: 'eventHost' })

  // Creating the N -> N association between Area and People
  Area.belongsToMany(People, { through: 'employee' })
  People.belongsToMany(Area, { through: 'employee' })

  // Creating the N -> N association between Service and People
  Service.belongsToMany(People, { through: 'assistance' })
  People.belongsToMany(Service, { through: 'assistance' })

  // Creating the 1 -> N association between Event and Area
  Area.hasMany(Event)
  Event.belongsTo(Area)

  // Creating the 1 -> N association between People and Service
  People.hasMany(Service, { foreignKey: 'project_manager' })
  Service.belongsTo(People)

  // Creating the 1 -> N association between Service and Area
  Area.hasMany(Service)
  Service.belongsTo(Area)

  // Creating the 1 -> 1 association between People and Area
  People.hasMany(Area, { foreignKey: 'responsible' })
  Area.belongsTo(People)

  db._tables = {
    Event,
    People,
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
  await db.sync({ force: true })

  return db
}

export default initializeDatabase
