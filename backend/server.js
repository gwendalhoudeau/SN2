const express = require('express');
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/user.routes')
const postRoutes = require('./routes/post.routes')
const cors = require('cors')

require('dotenv').config({path: './config/.env'})
require('./config/db')

const {checkUser, requireAuth} = require('./middleware/auth.middleware');
const { findById } = require('./models/post.model');
const app = express();

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials:true,
    'allowHeaders':['sessionId','Content-Type'],
    'exposeHeaders':['sessionId'],
    'methods':'GET,HEAD,PUT,PATCH,DELETE,POST',
    'preflightContinue':false
}

app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.get('*',checkUser)
app.get('/jwtid',requireAuth, (req,res) => {
    res.status(200).send(res.locals.user._id)
})

app.use('/api/user',userRoutes)
app.use('/api/post',postRoutes)

app.listen(process.env.PORT, () => { 
    console.log(`listening on port ${process.env.PORT}`)
})
