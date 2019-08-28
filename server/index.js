const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ optionSuccessStatus: 200 }));

const port = process.env.PORT || '3000';
app.set('port', port);
const server = http.createServer(app);

const routes = require('./routes');

app.get('/', (req, res) => {
    res.redirect('https://www.nekuenzi.com/#/');
});
app.use('/', routes);

server.listen(port, () => console.log(`Server Running on port ${port}`));
module.exports.server = server;
