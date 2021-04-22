import express from 'express'
import initializeDatabase from '../db-conn'
const app = express()

// We need this one if we send data inside the body as JSON
app.use(express.json())

async function init() {
  // Call the init function that returns the Database
  const db = await initializeDatabase()
  // Let's extract all the objects we need to perform queries inside the endpoints
  const { Article, Comment } = db._tables
  // API to get all the articles
  app.get('/articles', async (req, res) => {
    const articles = await Article.findAll()
    return res.json(articles)
  })
  // API to get an article by ID.
  // This one will return also the comments
  app.get('/article/:id', async (req, res) => {
    const { id } = req.params
    const article = await Article.findOne({
      where: { id },
      include: { model: Comment }, // -> this is the way we "include" also comments inside Articles
    })
    return res.json(article)
  })
  // This one is just an example
  app.get('/ad', (req, res) => {
    return res.json({
      url:
        'https://wordstream-files-prod.s3.amazonaws.com/s3fs-public/styles/simple_image/public/images/media/images/google-display-ads-example-2-final.png?oV7qevVB2XtFyF_O64TG6L27AFM3M2oL&itok=TBfuuTM_',
    })
  })
}

init()

export default app
