const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = 3000;
require('dotenv').config();

app.use(cors());
app.options('*',cors);

// Routes
const productRoutes = require("./routes/products");
const categoryRotes = require('./routes/categories');
const orderRoutes = require("./routes/orders");
const userRoutes = require("./routes/users");

// MiddleWare

app.use(bodyParser.json());
app.use(morgan('tiny'));

const api = process.env.API_URL;

// API Routes
app.use(`${api}/products`,productRoutes);
app.use(`${api}/categories`,categoryRotes);
app.use(`${api}/users`,userRoutes);
app.use(`${api}/orders`,orderRoutes);



// DB connection

mongoose.connect(process.env.CONNECTION_STRING,{
    dbName:"eshop_database"
}).then(()=>{
    console.log("Connection is Ready.......")
}).catch((err)=>{console.log(err)});

app.listen(PORT,()=>{
    console.log(api);
    console.log(`Listening to the PORT ${PORT}`)
});