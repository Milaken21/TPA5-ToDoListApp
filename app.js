const express= require('express');
const bodyParser = require('body-parser');
const todoRoutes = require("./routes/todo.router");

const app= express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('dotenv').config();

const cors= require('cors');
app.use(cors());
global.publicPath=__dirname+'/public';

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/todolist-app', {
    useNewUrlParser: true, 
    useUnifiedTopology: true} )
    .catch((err) => {
    console.log(err);
});

require('./helpers/extend-node-input-validation')
require('./routes/index')(app);
app.use("/api", todoRoutes);
 
const http= require('http');
const { response } = require('express');
const server= http.Server(app);
const port= process.env.PORT||3000;
server.listen(port, () => {
    console.log(`server is running on port localhost:${port}`);
});


