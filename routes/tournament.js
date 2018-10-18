const express = require('express');
const router = express.Router();

router.get('/',function(req, res){
    res.render('tournament',{
        title: 'Torneos'
    })
});

module.exports = router;