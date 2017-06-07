const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const admin = require('./admin');
const memberlogin = require('./memberlogin');
const memberPage = require('./memberPage');
const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'bbb',
        password: 'password',
        database: 'thesimchafund'
    }
});
const passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy;


var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(jsonParser);
app.use(urlencodedParser);

app.set('view engine', 'vash');
app.locals.title = 'the simcha fund';
app.locals.knex = knex;

app.get('/', (req, res) => {  
    res.render('index', { name: 'the simcha fund'});
 });

app.use('/admin', admin);
app.use('/memberlogin', memberlogin);


app.use('/memberpage', memberPage);



app.listen(3000, () => console.log('server is running on port 3000'));