const express = require('express');
const router = express.Router();

router.get('/new',function(req, res){
	res.render('tournament_register',{
        title: 'Nuevo torneo'
    });
});

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

router.post('/', function(req, res) {
	req.checkBody('nombre', 'El nombre del torneo es requerido').notEmpty();
	req.checkBody('descripcion', 'La descripción del torneo es requerida').notEmpty();
	req.checkBody('fecha_inicio', 'La fecha de inicio del torneo es requerida').notEmpty();
	req.checkBody('fecha_fin', 'La fecha de fin del torneo es requerida').notEmpty();
	req.checkBody('maximo_equipos', 'El número máximo de equipos del torneo es requerido').notEmpty();
	req.checkBody('url_imagen', 'Una imagen para el torneo es requerida').notEmpty();

	let errors = req.validationErrors();

	if(!errors) {
		const nombre = req.body.nombre;
		const descripcion = req.body.descripcion;
		const fecha_inicio = req.body.fecha_inicio;
		const fecha_fin = req.body.fecha_fin;
		const maximo_equipos = req.body.maximo_equipos;
		const url_imagen = req.body.url_imagen;
		let sp = 'call sp_registrar_torneo("' + nombre + '","' + descripcion +'","' + fecha_inicio +'","' + fecha_fin + '",' + maximo_equipos + ',"' + url_imagen + '")';
		db.query(sp, function(err, result) {
			if(err){ console.log(err); return; }
			res.redirect('/tournament');
		});
	} else {
		res.render('tournament_register',{
            title: 'Nuevo torneo',
            errors: errors
        });
	}
});

module.exports = router;