const express = require('express');
const fs = require('fs-extra');
const os = require('os');
const http = require('http');
const router = express.Router();

router.get('/new',function(req, res){
	let idUser = req.session.user_id;
	res.render('tournament_register',{
		title: 'Nuevo torneo',
        session: (req.session.user_id !== undefined)
    });
});

router.get('/',function(req, res){
	let idUser = req.session.user_id;
	let sp = 'call sp_listar_torneos()';
	db.query(sp, function(err, result){
		let torneos = result[0];
		torneos.forEach(function(torneo){

			var first_day = new Date(torneo.first_day);
			var last_day = new Date(torneo.last_day);
			
			var mostrarFecha1 = first_day.getDay() + "/" +(first_day.getMonth() + 1) + "/" + first_day.getFullYear();
			var mostrarFecha2 = last_day.getDay() + "/" +(last_day.getMonth() + 1) + "/" + last_day.getFullYear();
			
			torneo.first_day = mostrarFecha1;
			torneo.last_day = mostrarFecha2;
		});
		
		

		res.render('tournament',{
        	title: 'Torneos',
			tournaments: torneos,
        	session: (req.session.user_id !== undefined)
    	});
	});
});

router.post('/', function(req, res) {
	var fstream;
	var file_uploaded;
	req.checkBody('nombre', 'El nombre del torneo es requerido').notEmpty();
	req.checkBody('descripcion', 'La descripción del torneo es requerida').notEmpty();
	req.checkBody('fecha_inicio', 'La fecha de inicio del torneo es requerida').notEmpty();
	req.checkBody('fecha_fin', 'La fecha de fin del torneo es requerida').notEmpty();
	req.checkBody('maximo_equipos', 'El número máximo de equipos del torneo es requerido').notEmpty();
	req.pipe(req.busboy);
	req.busboy.on('file', function (fieldname, file, filename) {
		console.log("Uploading: " + filename);

		// Path where image will be uploaded
		fstream = fs.createWriteStream('public/img/' + filename);
		file.pipe(fstream);
		fstream.on('close', function () {    
			console.log("Upload Finished of " + filename);      
			file_uploaded = req.headers.host+'/img/' +filename;
			console.log('adentro',file_uploaded);
			res.redirect('back');  
			
			let errors = req.validationErrors();
			console.log('afuera',file_uploaded);
			if(!errors) {
				const nombre = req.body.nombre;
				const descripcion = req.body.descripcion;
				const fecha_inicio = req.body.fecha_inicio;
				const fecha_fin = req.body.fecha_fin;
				const maximo_equipos = req.body.maximo_equipos;
				const url_imagen = file_uploaded;
				let sp = 'call sp_registrar_torneo("' + nombre + '","' + descripcion +'","' + fecha_inicio +'","' + fecha_fin + '",' + maximo_equipos + ',"' + url_imagen + '")';
				db.query(sp, function(err, result) {
					if(err){ console.log(err); return; }
					res.setHeader('Content-Type', 'application/json').redirect('/tournament');
				});
			} else {
				res.render('tournament_register',{
					title: 'Nuevo torneo',
					errors: errors
				});
			}
		});
	});

	// //req.checkBody('url_imagen', 'Una imagen para el torneo es requerida').notEmpty();
	
});

router.get('/:id', function(req, res) {
	let idUser = req.session.user_id;
	const id = req.params.id;
	const sp = 'call sp_listar_torneo(' + id + ')';

	db.query(sp, function(err, result) {
		if(err) { 
			console.log(err);
			res.status(400).send({message : 'Id de torneo no valido'});
			return;
		}
		const torneo = result[0][0];
		console.log(torneo);

		res.render('tournament_info',{
            title: torneo.name,
			torneo: torneo,
			session: (req.session.user_id !== undefined)
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