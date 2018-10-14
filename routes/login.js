const express = require('express');
const router = express.Router();

router.get('/',function(req, res){
    res.render('login',{
        title: 'Login'
    })
});

router.post('/init', function(req, res){
    req.checkBody('username','Username is required').notEmpty();
    req.checkBody('password','Password is required').notEmpty();

    let errors = req.validationErrors();

    var username = req.body.username;
    var password = req.body.password;

    if(errors){
        req.flash('danger',errors);
        res.redirect('/login');
    }else{
        let query = 'SELECT * FROM user WHERE username = "'+ username + '" AND password = "'+ password + '"';
        db.query(query, function(err,result) {
            if( err){
                console.log(err);
                req.flash('danger',"Incorrect username and password");
                res.redirect('/login');
            }else{
                res.redirect('/dashboard');
            }
        })
    }
})

module.exports = router;