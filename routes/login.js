const express = require('express');
const router = express.Router();

router.get('/',function(req, res){
    res.render('login',{
        title: 'Login',
        erroracc: req.query.erroracc
    })
});

// router.post('/login', function(req, res){
//     req.checkBody('username','Username is required').notEmpty();
//     req.checkBody('password','Password is required').notEmpty();

//     let errors = req.validationErrors();

//     var username = req.body.username;
//     var password = req.body.password;

//     if(errors){
//         //req.flash('danger',errors);
//         res.render('login',{
//             title: 'Login',
//             errors: errors
//         })
//     }else{
//         let query = 'SELECT * FROM user WHERE username = "'+ username + '" AND password = "'+ password + '"';
//         db.query(query, function(err,result) {
//             if(err){console.log(err); return;}
//             if(result.length == 0){
//                 req.flash('danger',"Incorrect username and password");
//                 res.redirect('/login');
//             }else{
//                 let user_id = result[0].id;
//                 req.session.user_id = user_id;
//                 res.redirect('/dashboard');
//             }
//         })
//     }
// });

router.post('/login', function(req,res){
    var username = req.body.username;
    var password = req.body.password;

    let sp = 'call sp_getLoginUsuario(?,?)';
    var params = [username, password];

    var data = {};

    db.query(sp, params ,function(err, result, fields){
        if(err) {console.log(err); data.err = err; res.status(500).send(data); return;}
        if(result[0].length > 0){
            let user_id = result[0][0].id;
            req.session.user_id = user_id;
            //res.status(200).send({dashboard: 'dashboard', session: req.session.user_id});
            res.redirect('/dashboard');
        }else{
            //res.status(400).send({message : 'Invalid username or password'});
            //req.flash('errors','Bienvenido, usuario registrado');
             res.redirect('/login?erroracc=pass');
        }
    })
})

router.post('/',function(req, res){
    req.checkBody('username','Username is required').notEmpty();
    req.checkBody('email', 'Email wrong format').isEmail();
    req.checkBody('phone','Phone wrong format').isNumeric();
    req.checkBody('steam_id','SteamID is required').notEmpty();
    req.checkBody('password','Password is required').notEmpty();
    req.checkBody('repeatpass','Confirm password is required').notEmpty();
    //req.checkBody('confirm-info','You must confirm your information')

    let errors = req.validationErrors();

    var username = req.body.username;
    var password = req.body.password;
    var repeatpass = req.body.repeatpass;
    var email = req.body.email;
    var steam_id = req.body.steam_id;
    var phone = req.body.phone;

    if(errors){
        res.render('login',{
            title: 'Login',
            errors: errors
        })
    }else{
        let querySelect = 'SELECT * FROM user WHERE username = "'+username+'" OR email = "'+email+'";';
        db.query(querySelect, function(err, result){
            if(err){console.log(err); return;}
            if(result.length > 0){
                req.flash('danger','El usuario o email ya se encuentra registrado');
                res.redirect('/login');
            }else{
                if(password !== repeatpass){
                    req.flash('danger', 'Las constraseñas no coinciden');
                    res.redirect('/login');
                }else{
                    let queryInsert = 'INSERT INTO user (username,password,email,steam_id,phone) VALUES ("'+username+'","'+password+'","'+email+'","'+steam_id+'","'+phone+'");';
                    db.query(queryInsert, function(err, result){
                        if(err){console.log(err); return;}
                        if(result){
                            req.flash('success','Bienvenido, usuario registrado');
                            res.redirect('/dashboard'); 
                        }
                    });
                }
            }
        })
    }
});

module.exports = router;