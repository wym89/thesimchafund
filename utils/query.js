const express = require('express');
const app = express();
const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'bbb',
        password: 'password',
        database: 'thesimchafund'
    }
});


module.exports = {
        addMoneyPost: function(id, moneyToAdd){
                knex('members')
                .where('id', id)
                .update({'account':  knex.raw('?? + '+ moneyToAdd, ['account'])})
                .then(function(data){ console.log(data); });
        },
        addMoneyGet: function(callback){
           knex('members').select('*').then(function(row){
               callback(row);
            });
        },
        addSimchaGet: function(callback){
            knex('simchas').select('*').orderBy('active', 'desc').then(function(row){
                  callback(row);
            });
        },
        addSimchaPost:function(simchaToAdd){
            knex('simchas').insert({'name_simcha': simchaToAdd,'active': 1}).then(function(data){
                console.log(data);
            });
        },
        addSimchaPostDeactivate: function(simcha_id, active, callback){
            knex('simchas')
            .where('simcha_id', simcha_id)
            .update({'active': active})
            .then(function(data){
                console.log(data);
                callback();
            });
        }

}
