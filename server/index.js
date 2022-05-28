require("dotenv").config();

const PORT = process.env.PORT;
const HOST = process.env.HOST;


const express = require("express");
const app = express();
const cors = require("cors");
const fileUpload = require('express-fileupload');
const path = require('path');
const sequelize = require('./db/db');
const models = require("./models/models");
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');


app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use('/api', router);

app.use(errorHandler);


const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`App listening at http://${HOST}:${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start();


