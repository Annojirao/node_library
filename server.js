require('dotenv').config()
console.log(process.env)
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const indexRouter = require('./routes/index')
const port = process.env.PORT
const db_url = process.env.DB_URL
const mongoose = require('mongoose')
mongoose.connect(db_url)

const db = mongoose.connection
// on connection error
db.on('error', error => console.error(error))
// connect only once
db.once('open', () => console.log('Connected to Mongoose'))

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')

app.use(expressLayouts)
app.use('/', indexRouter)
app.use(express.static('public'))

app.listen(port, () => {
    console.log(`App is running at port: ${port}`);
})