const express = require('express');
const router = express.Router();
/*const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'bbb',
        password: 'password',
        database: 'thesimchafund'
    }
});*/




router.get('/', (req, res) => {
   req.app.locals.knex('members').select('*').then(function(row){
       res.render('memberlogin', { name: 'the simcha fund', members: row });
    });
 });

router.post('/', (req, res)=>{
    req.app.locals.knex('members').select('password').where('id', req.body.id).then(function(pw){
        console.log('form password', pw[0].password);
        console.log('db password', req.body.password);
        //res.locals.helloWorld = 'helloWorld';
        //res.locals.member = req.body.id;
        if(pw[0].password == req.body.password){
            res.redirect('/memberPage?member=' + req.body.id);
        }else{
            res.send('/invalid login');
        }
    });
});
 
module.exports = router;