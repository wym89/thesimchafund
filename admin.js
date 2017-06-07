const express = require('express');
const router = express.Router();
const addmoney = require('./addmoney');
const addsimcha = require('./addsimcha');




router.get('/', (req, res) => {
     res.render('admin', { name: req.app.locals.title});
 });

router.use('/addmoney', addmoney);

router.use('/addsimcha', addsimcha);
 
module.exports = router;