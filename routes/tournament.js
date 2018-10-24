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

router.get('/:id', function(req, res) {
	const id = req.params.id;
	const sp = 'call sp_listar_torneo(' + id + ')';

	db.query(sp, function(err, result) {
		if(err) { console.log(err); return; }
		const torneo = result[0][0];
		console.log(torneo);

		res.render('tournament_info',{
            title: torneo.name,
            torneo: torneo
    	});
	});
});

router.get('/edit/:id', function(req, res) {
	const id = req.params.id;
	const sp = 'call sp_listar_torneo(' + id + ')';

	db.query(sp, function(err, result) {
		if(err) { console.log(err); return;}
		const torneo = result[0][0];
		console.log(torneo);

		res.render('tournament_edit', {
			torneo: torneo
		});
	});
});

router.put('/:id', function(req, res) {
	req.checkBody('nombre', 'El nombre del torneo es requerido').notEmpty();
	req.checkBody('descripcion', 'La descripción del torneo es requerida').notEmpty();
	req.checkBody('fecha_inicio', 'La fecha de inicio del torneo es requerida').notEmpty();
	req.checkBody('fecha_fin', 'La fecha de fin del torneo es requerida').notEmpty();
	req.checkBody('maximo_equipos', 'El número máximo de equipos del torneo es requerido').notEmpty();
	req.checkBody('url_imagen', 'Una imagen para el torneo es requerida').notEmpty();

	let errors = req.validationErrors();

	if(!errors) {
		const id = req.params.id;
		const nombre = req.body.nombre;
		const descripcion = req.body.descripcion;
		const fecha_inicio = req.body.fecha_inicio;
		const fecha_fin = req.body.fecha_fin;
		const maximo_equipos = req.body.maximo_equipos;
		const url_imagen = req.body.url_imagen;
		let sp = 'call sp_actualizar_torneo(' + id + ',"' + nombre + '","' + descripcion +'","' + fecha_inicio +'","' + fecha_fin + '",' + maximo_equipos + ',"' + url_imagen + '")';
		db.query(sp, function(err, result) {
			if(err){ console.log(err); return; }
			res.redirect('/tournament');
		});
	} else {
		// TODO se puede mostrar los errores en lugar de redirigir
		res.redirect('/tournament/edit/' + id);
	}	
});

router.delete('/:id', function(req, res) {
	const id = req.params.id;
	const sp = 'call sp_eliminar_torneo(' + id + ')';

	db.query(sp, function(err, result) {
		if (err) { console.log(err); return; }
		res.redirect('/tournament');
	});
});

router.post('/:idTorneo/inscription', function(req, res) {
	const idTorneo = req.params.idTorneo;
	let idUser = req.session.user_id;
	console.log('Inscripción: ' + idUser + ', ' + idTorneo);

	const sp = 'call sp_registrar_inscripcion_torneo(' + idTorneo + ',' + idUser + ')';

	db.query(sp, function(err, result) {
		if (err) { console.log(err); return; }		
		res.redirect('/tournament/' + idTorneo);
	});
});

module.exports = router;