//DECLARATION
const express = require('express');
var app = express();
const path = require('path');

//ROUTER CONFIG (API)
module.exports = function (router) {
    app = router ? router : app;

    app.get('/hola', (req, res) => {
        res.json({ somedata: 'holaa' });
    });

    //OTHER API CODE
};

//SOME FUNCTION MAY HELP
function getSpecificData(obj, ...data) {
    var res = {};
    for (var i = 0; i < data.length; i++) if (obj[data[i]]) res[data[i]] = obj[data[i]];
    return res;
}

function authenticate (req, res, next) {
    //for authentication
}