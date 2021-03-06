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

/* Procedimiento para listar las estadísticas por juego de un usuario */

delimiter //
create procedure sp_listar_estadisticas_usuario
(in id_usuario int)
begin
	select g.name as 'game_name', 
			AVG(pd.gpm) as 'gpm_avg',
			AVG(pd.xpm) as 'xpm_avg',
			AVG(pd.kills) as 'kills_avg',
			AVG(pd.deaths) as 'deaths_avg',
			AVG(pd.assists) as 'assists_avg',
			((pd.kills + pd.deaths) / pd.assists) as 'kda'
	from playdetails pd join play p on pd.play_id = p.id
		join game g on p.game_id = g.id
	where user_id = id_usuario
	group by p.game_id;
end //
delimiter ;

/*drop procedure sp_listar_estadisticas_usuario

call sp_listar_estadisticas_usuario(1)*/

/* Procedimiento para obtener la información de un torneo */

delimiter //
create procedure sp_listar_torneo
(in id_torneo int)
begin
	select *
	from tournament
	where id = id_torneo;
end //
delimiter ;

/* call sp_listar_torneo(1) */

/* Procedimiento almacenado para inscribir un usuario a un torneo */

delimiter //
create procedure sp_registrar_inscripcion_torneo
(in id_torneo int,
	id_usuario int)
begin
	declare play_id_out int;
	insert into Play values (
		null,
		1,
		null,
		null
	);
    set play_id_out = last_insert_id();
    
    insert into TournamentPlay values (
		null,
        id_torneo,
        play_id_out,
        null,
        null,
        null
        
    );
    
    insert into PlayDetails values (
		null,
        id_usuario,
        play_id_out,
        null,
        null,
        null,
        null,
        null,
        null,
        null
    );
end //
delimiter ;

/* Procedimiento almacenado para obtener la lista de usuarios registrados en un torneo */

delimiter //
create procedure sp_listar_torneo_inscritos
(in id_torneo int)
begin
	select pd.user_id, u.username
	from TournamentPlay tp join PlayDetails pd on tp.play_id = pd.play_id
		join User u on pd.user_id = u.id
	where tp.tournament_id = id_torneo;
end //
delimiter ;

/* Verifica si un usuario y una contraseña coinciden */

delimiter //
create procedure sp_getLoginUsuario
(in username varchar(255),
	pass varchar(255))
begin
	SELECT * FROM user WHERE username = username AND password = pass;
end //
delimiter ;