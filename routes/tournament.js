const express = require('express');
const router = express.Router();

router.get('/',function(req, res){
	let sp = 'call sp_listar_torneos()';
	db.query(sp, function(err, result){
		let torneos = result[0];
		res.render('tournament',{
        	title: 'Torneos',
        	tournaments: torneos
    	});
	});
});

module.exports = router;