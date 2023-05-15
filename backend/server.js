require('dotenv').config();

const express = require('express');
const {errorHandler} = require('./middleware/errorMiddleware')
const port = process.env.PORT || 5000;
const mongoose = require('mongoose')
const app = express();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection;
db.on('error',(error) => console.log("something is wrong",error))
db.once('open', () => console.log("connected to DB"))

app.use(express.json());
app.use(express.urlencoded({extended: false}))

const subscribersRouter = require('./routes/subscribers');

app.use('/subscribers', subscribersRouter)
app.use(errorHandler)
app.listen(port, () => console.log(`Server started on port ${port}`));


