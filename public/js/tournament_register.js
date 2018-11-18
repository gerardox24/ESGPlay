window.onload = () => {
	console.log('La validación del formulario de la página de registro de torneos cargó');
	let nuevoTorneoBoton = document.getElementById('nuevo-torneo');
	let primeraFecha = document.getElementById('txtFechaInicio');
	let segundaFecha = document.getElementById('txtFechaFin');
	let errorFechaMensaje = document.getElementById('error-fecha');

	var today = new Date();
	primeraFecha.setAttribute("min", today.toISOString().substring(0, 10));

	function fechasOrdenadas(fechaA, fechaB) {
		return Date.parse(fechaB) > Date.parse(fechaA)
	}

	nuevoTorneoBoton.onclick = (event) => {
		console.log('Click en registrar');
		console.log(primeraFecha.value);
		console.log(segundaFecha.value);

		if (!fechasOrdenadas(primeraFecha.value, segundaFecha.value)) {
			
			console.log('Las fechas no están ordenadas');
			//event.target.setCustomValidity('La fecha debe ser menor a la fecha de fin del torneo');
			errorFechaMensaje.style.display = 'block';
			event.preventDefault();
		} else {
			errorFechaMensaje.style.display = 'none';
		}
	};
};