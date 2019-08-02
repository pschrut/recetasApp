const express = require('express');
const Category = require('../models/category');
const app = express();

app.get('/', (req, res) => {
    Category.find({}, (err, categories) => {
        res.json(categories);
    });
});

app.get('/:category', (req, res) => {
    const category = req.params.category;

    Category.find({ tech_name: category }, (err, category) => {
        res.json(category);
    });
});

app.post('/', (req, res) => {
    const body = req.body;

    body.tech_name = body.name.toLowerCase().replace(' ', '');

    const category = new Category({
        ...body
    });

    category.save((err, data) => {
        return res.json(data);
    });

});

module.exports = app;