//DECLARATION
const express = require('express');
var app = express();
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: 'public/upload_temp' });
//ROUTER CONFIG (API)
module.exports = function (router) {
    app = router ? router : app;

    app.get('/hola', (req, res) => {
        res.json({ somedata: 'holaa' });
    });

    //OTHER API CODE
    app.post('/anjay', upload.single('photo'), (req, res) => {
        res.json({
            message: 'OK',
            filename: `${req.file.filename}`
        })
        console.log(`File Uploaded:
        OriginalName ${req.file.originalname}
        Form FieldName: ${req.file.fieldname}
        Size: ${req.file.size}
        Path: ${req.file.path}`
        );
        fs.unlinkSync(req.file.path);
    });
};

//SOME FUNCTION MAY HELP
function getSpecificData(obj, ...data) {
    var res = {};
    for (var i = 0; i < data.length; i++) if (obj[data[i]]) res[data[i]] = obj[data[i]];
    return res;
}

function authenticate(req, res, next) {
    //for authentication
}
