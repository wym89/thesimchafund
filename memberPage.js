const express = require('express');
const router = express.Router();



router.get('/', (req, res) => {
    const id = req.query.member;
    console.log(id);
    req.app.locals.knex('members')
    .select('*').where('members.id', id)
    .leftOuterJoin('transactions', 'members.id', 'transactions.member_id')
    .leftOuterJoin('simchas', 'transactions.simcha_id', 'simchas.simcha_id')
    .catch(function(error) {
        console.error(error);
        res.send('invalid id please log in');
    })
    .then(function(themember){
        console.log('themember', themember);
        req.app.locals.knex('simchas').select('*').where('active', 1).then(function(data){
            res.render('memberPage', {simchas: data, member: themember });
        });
    });
});

router.post('/', (req, res) => {
    const knex =  req.app.locals.knex;

   /* upsert = function(table, data, update){
        if(!update) update=data;
        var insert = knex(table).insert(data).toString();
        var update = knex(table).update(update).toString().replace(/^update .* set /i, '');
        return knex.raw(insert + ' on duplicate key update ' + update);
	};

    function replace(table, data){
        var insert = knex(table).insert(data).toString().replace(/^INSERT/i, 'REPLACE');
        return knex.raw(insert);
    }*/

    knex.raw(knex('transactions').insert(data).toString() + ' on duplicate key update ' +  knex('transactions').update(update).toString() )

    req.app.locals.knex('transactions')
     .insert({'simcha_id': req.body.simcha, 'member_id': req.body.member, 'dotation_amount': req.body.amount})
     //.upsert('transactions',{'simcha_id': req.body.simcha, 'member_id': req.body.member, 'dotation_amount': req.body.amount})
     .then(function(){
         console.log('inserted transactions ');
          req.app.locals.knex('simchas').where('simcha_id', req.body.simcha)
          .update({'total': req.app.locals.knex.raw('?? + '+ req.body.amount, ['total'])}).then(function(){
            console.log('simcha updated');
          });
     }).then(function(){
         req.app.locals.knex('members').where('id', req.body.member)
         .update({'account': req.app.locals.knex.raw('?? - '+ req.body.amount, ['account'])}).then(function(){
            console.log('member updated');
          });
     });
     console.log('in post ',req.body.member);
    res.redirect('/memberPage?member=' + req.body.member);
}); 


module.exports = router;