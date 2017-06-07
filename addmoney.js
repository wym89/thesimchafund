const express = require('express');
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



/*router.get('/', (req, res) => {
    console.log(req.listMembers);
    res.render('addmoney', { name: 'the simcha fund', members: req.listMembers });
 });
*/

 router.get('/', (req, res) => { 
     query.addMoneyGet((row)=>{
         res.render('addmoney', { name: 'the simcha fund', members: row });
     });
    /*req.app.locals.knex('members').select('*').then(function(row){
       res.render('addmoney', { name: 'the simcha fund', members: row });
    });*/
 });


 
 /*router.post('/', (req, res) => {
  console.log('adding money ffff');
  const newTotal = (parseInt(req.body.moneyToAdd) + parseInt(req.body.prevbalance));

  knex('members').where('id', req.body.id).update({'account': '12 + 11'}).then(function(data){
    console.log(data);
  });
  res.redirect('/admin');
 });*/


 router.post('/', (req, res) => {
  //console.log('adding money ffff');
  query.addMoneyPost(req.body.id, req.body.moneyToAdd);

  /*const newTotal = (parseInt(req.body.moneyToAdd) + parseInt(req.body.prevbalance));
  req.app.locals.knex('members').where('id', req.body.id).update({'account': newTotal}).then(function(data){
    console.log(data);
*/
   /* req.app.locals.knex('members').where('id', req.body.id).update({'account':  req.app.locals.knex.raw('?? + '+ req.body.moneyToAdd, ['account'])}).then(function(data){
    console.log(data);
  });*/
 

  res.redirect('/admin');
 });

 
module.exports = router;