const express = require('express');
const router = express.Router();

router.get('/',function(req, res) {
	const user_id = req.session.user_id;
	let sp = 'call sp_listar_estadisticas_usuario(' + user_id + ')';

	db.query(sp, function(err,result) {
		if(err){ console.log(err); return; }
		console.log(result);
		res.render('dashboard',{
	    	title: 'Dashboard',
			estadisticas: result[0],
			session: user_id
		});
	});
})

module.exports = router;
