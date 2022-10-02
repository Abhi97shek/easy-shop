const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const authJwt = require('./helpers/jwt'); 
var { expressjwt: jwt } = require("express-jwt");
const cors = require('cors');
const PORT = 3000;
require('dotenv').config();
const secret = process.env.SECRET;
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
app.use(jwt({
    secret,
    algorithms:['HS256']
}).unless({
        path:[
            {url:`/\/api\/v1\/products(.*)/`,methods:['GET','OPTIONS']},
            {url:`/\/api\/v1\/categories(.*)/`,methods:['GET','OPTIONS']},
            `/api/v1/users/login`,
            `/api/v1/users/register`
        ]
}));

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