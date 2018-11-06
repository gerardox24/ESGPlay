const express = require('express');
const router = express.Router();

router.get('/',function(req, res) {
	console.log('hello');
	console.log(req.session);
	const user_id = req.session.user_id;
	let sp = 'call sp_listar_estadisticas_usuario(' + user_id + ')';

	db.query(sp, function(err,result) {
		if(err){ console.log(err); return; }
    	res.render('dashboard',{
        	title: 'Dashboard',
        	estadisticas: result[0]
    	});
	});
	
	res.render('dashboard',{
		title: 'Dashboard',
		estadisticas: []
	});
})

module.exports = router;