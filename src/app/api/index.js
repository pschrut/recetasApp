const express = require('express');
const mongoose = require('mongoose');
const categoriesRoute = require('./routes/categories');
const recipiesRoute = require('./routes/recipies');
const bodyParser = require('body-parser');


const app = express();

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');

    next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connection.openUri('mongodb://localhost:27017/recipies', { useNewUrlParser: true }, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('DB online');
});

app.use('/categories', categoriesRoute);
app.use('/recipies', recipiesRoute);

app.listen(3000, () => console.log('Server online'));