
const express = require('express');

const path = require('path');


const portfolioRoutes = require('./routes/portfolioRoutes');

const app = express();

const port = 3000;

app.set('view engine', 'ejs');


app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));


app.use(express.urlencoded({ extended: true }));

app.use(express.json());


app.use('/', portfolioRoutes);


app.listen(port, () => {
    console.log(`🚀 Servidor rodando a todo vapor em http://localhost:${port}`);
});