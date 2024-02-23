const express = require('express');
const Validator = require('./helpers/validator');
const fs = require('fs');
const {register, login} = require('./controllers/authController');
const {validateLoginParams, validateRegistrationParams} = require('./helpers/validator');
const preferences = require('./routes/preferences'); 
const news = require('./routes/news'); 
require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const usersRouter = express.Router();

usersRouter.post('/register', validateRegistrationParams, register);
usersRouter.post('/login', validateLoginParams, login);
usersRouter.use('/preferences', preferences);
app.use('/news', news);

app.use('/users', usersRouter);

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});

module.exports = app;
