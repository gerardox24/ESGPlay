const express = require('express');
const mysql = require('mysql');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// db connection
var conn = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'esgplay'
});

global.db = conn;

// public folder
app.use(express.static(path.join(__dirname,'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine','pug');

conn.connect( function(err) {
    if (err){
        console.log('error: ' + err);
    }else{
        console.log('connected as Id: '+conn.threadId);
    }
});

app.use(session({
    secret: 'secret key',
    resave: true,
    saveUninitialized: true,
}));

app.use(require('connect-flash')());
app.use(function(req, res, next) {
    res.locals.messages = require('express-messages')(req,res);
    next();
});

app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root = namespace.shift()
        , formParam = root;

        while(namespace.length){
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg   : msg,
            value : value
        };
    }
}));

app.get('/',function(req, res){
    console.log('here');
    var statistics = [
        {
            id: 5,
            name: 'Johnny',
            age: 22
        }
    ];
    //req.flash('danger','This is a message');
    res.render('index',{
        title: 'ESGPlay',
        statistics: statistics
    });
})


var login = require('./routes/login');
var dashboard = require('./routes/dashboard');

app.use('/login',login);
app.use('/dashboard',dashboard);

app.listen(3000,function(){
    console.log('ESGPlay running on port 3000....');
})