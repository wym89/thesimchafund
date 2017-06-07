const express = require('express')
const router = express.Router();
const query = require('./utils/query.js');


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
    query.addSimchaGet((row)=>{
       res.render('simchas', { name: 'the simcha fund', simchas: row });
    });
  /*  req.app.locals.knex('simchas').select('*').orderBy('active', 'desc').then(function(row){
       res.render('simchas', { name: 'the simcha fund', simchas: row });
    });*/
 });

 router.post('/', (req, res) => {
  console.log('adding simcha ffff');
  query.addSimchaPost(req.body.simchaToAdd);
  /*req.app.locals.knex('simchas').insert({'name_simcha': req.body.simchaToAdd,'active': 1}).then(function(data){
    console.log(data);
  });*/
  res.redirect('/admin');
 });
 
  router.post('/deactivate', (req, res) => {
  console.log('deactivate simcha');
  query.addSimchaPostDeactivate(req.body.simcha_id, req.body.active, res.redirect('/admin/addsimcha') );
  /*req.app.locals.knex('simchas').where('simcha_id', req.body.simcha_id).update({'active': req.body.active}).then(function(data){
    console.log(data);
  });*/
  //res.redirect('/admin/addsimcha');
 });

 
module.exports = router;