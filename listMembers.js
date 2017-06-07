// not using 

const express = require('express');
const app = express();
/*const req.app.locals.knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'bbb',
        password: 'password',
        database: 'thesimchafund'
    }
});*/

function listMembers(req, res, next){
     req.app.locals.knex('members').select('*').then(function(row){
          console.log(row);
       app.locals.listMembers = row;
    });
    console.log('log req.list', app.locals.listMembers);
    next();
}

module.exports = listMembers;