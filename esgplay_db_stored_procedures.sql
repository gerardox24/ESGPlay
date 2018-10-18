/* Función para listar torneos */

delimiter //
create procedure sp_listar_torneos ()
begin
	select *
    from tournament;
end //
delimiter ;

/*call sp_listar_torneos()*/

/* Función para crear un torneo	*/

delimiter //
create procedure sp_registrar_torneo
(in nombre nvarchar(255), 
	descripcion text, 
	fecha_inicio date, 
    fecha_fin date, 
    maximo_equipos int, 
    url_imagen text)
begin
	insert into tournament values (
		null,
		nombre,
		descripcion,
		fecha_inicio,
		fecha_fin,
		maximo_equipos,
		url_imagen
	);
end //
delimiter ;

/*drop procedure sp_registrar_torneo*/

/*call sp_registrar_torneo('Torneo 3', 'Tercer torneo', '2018-10-5', '2018-10-6', 5, 'imagen 3');*/

delimiter //
create procedure sp_actualizar_torneo 
(in id_tournament int,
	nombre nvarchar(255), 
	descripcion text, 
	fecha_inicio date, 
    fecha_fin date, 
    maximo_equipos int, 
    url_imagen text)
begin
	update tournament
    set name = nombre,
		description = descripcion,
        first_day = fecha_inicio,
        last_day = fecha_fin,
        max_teams = maximo_equipos,
        url_to_image = url_imagen
	where id = id_tournament;
end //
delimiter ;

/*call sp_actualizar_torneo( 2, 'Torneo 2', 'Segundo torneo', '2018-10-5', '2018-10-6', 5, 'imagen 3');*/

/* Función para eliminar un torneo */

delimiter //
create procedure sp_eliminar_torneo 
(in id_tournament int)
begin
	delete from tournament
    where id = id_tournament;
end //
delimiter ;

/*call sp_eliminar_torneo(3)*/