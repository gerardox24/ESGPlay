const mysql = require('mysql');

// db connection
var conn = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'esgplay'
});

conn.connect( function(err) {
    if (err){
        console.log('error: ' + err);
    }else{
        console.log('connected as Id: '+conn.threadId);
    }
});

global.db = conn;

module.exports = conn;