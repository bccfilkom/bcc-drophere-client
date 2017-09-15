//DECLARATION
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { url } = require('./config/database');
var compression = require('compression')

//MONGOOSE CONFIG
mongoose.Promise = global.Promise;
//mongoose.connect(url);

//BODY PARSER
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing

//SET PUBlIC REQUEST
app.use(compression())
app.use(express.static('./public'));

//API ROUTER
const api = express.Router();
require('./src/server/router/api.js')(api);
app.use('/api', api);

//REACT APP
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

//SERVER LISTENING
app.listen(port, () => console.log(`server running at port ${port}`));
