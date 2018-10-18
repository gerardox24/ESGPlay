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