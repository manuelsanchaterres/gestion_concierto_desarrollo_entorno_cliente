function enviarFormulario() {
    
    const botonEnviarFormulario = document.getElementById("registrar");
    
    botonEnviarFormulario.addEventListener("submit", (event) => {

        event.preventDefault();
    })
    
    let evento = {

        nombreEvento:document.getElementById("evento").value,
        artistaEvento: document.getElementById("artista").value,
        fechaEvento:document.getElementById("fecha").value,
        // conversión a integer porque el value del input te viene como string
        asistentesEvento: parseInt(document.getElementById("aforo").value),
        // campo calculado
        temporadaEvento:"",
        salaEvento:  parseInt(document.getElementById("sala").value),
        cacheArtistaEvento:parseInt(document.getElementById("cache").value),
        gastosGestionEvento:parseInt(document.getElementById("gastos_g").value),
        // campo calculado
        importeTotalEvento: 0
    }


    // FUNCIONES MANU

    /*Asigna cada concierto a una temporada (primavera, verano, otoño, invierno) 
    para facilitar la programación y marketing.*/

    function determinarTemporada(fechaInput) {
        // Conversión String a Date, fecha viene como String del campo Fecha del Evento
        const fecha = typeof fechaInput === "string" ? new Date(fechaInput) : fechaInput;

        // Helper function to calculate days since the start of the year
        
        function diasInicioAño(fecha) {
            const comienzoAño = new Date(fecha.getFullYear(), 0, 1);
            const diferenciaTiempo = fecha - comienzoAño;
            return Math.floor(diferenciaTiempo / (1000 * 60 * 60 * 24));
        }

        // Days thresholds for each season based on 2023
        const año = fecha.getFullYear();
        const diasInicioPrimavera = diasInicioAño(new Date(año, 2, 20));  // March 20
        const diasFinPrimavera = diasInicioAño(new Date(año, 5, 20));     // June 20
        const diasInicioVerano = diasInicioAño(new Date(año, 5, 20));     // June 20
        const diasFinVerano = diasInicioAño(new Date(año, 8, 22));        // September 22
        const diasInicioOtoño = diasInicioAño(new Date(año, 8, 22));      // September 22
        const diasFinOtoño = diasInicioAño(new Date(año, 11, 21));        // December 21
        const diasInicioInvierno = diasInicioAño(new Date(año, 11, 21));  // December 21
        const diasTotales = diasInicioAño(fecha);

        // Determine season based on days passed since the start of the year
        let temporada = "";
        if (diasTotales >= diasInicioPrimavera && diasTotales < diasFinPrimavera) {
            temporada = "primavera";
        } else if (diasTotales >= diasInicioVerano && diasTotales < diasFinVerano) {
            temporada = "verano";
        } else if (diasTotales >= diasInicioOtoño && diasTotales < diasFinOtoño) {
            temporada = "otoño";
        } else {
            temporada = "invierno";
        }
        return temporada;
    }

    // objeto para guardar campos
    const temporada = determinarTemporada(evento.fechaEvento);
    const campoTemporada = document.getElementById("temporada");
    const campoImporteTotal = document.getElementById("importe");
    // asignamos valor temporada al campo temporada
    evento.temporadaEvento = temporada;
    campoTemporada.value = temporada;
    evento.importeTotalEvento = evento.cacheArtistaEvento + evento.gastosGestionEvento;
    campoImporteTotal.value = evento.importeTotalEvento;


    /*: 
        Calcula el ingreso esperado multiplicando el 
        precio del ticket por el número de tickets vendidos.
    */

    /* 
        como el número de tickets depende de la reserva del cliente
        supondremos un número constante de tickets de 250
    */

    let ticketsVendidos = 250;

    /*Calcular Ingresos Esperados: VERIFICAR CALCULO PRECIO DEL TICKET CON ANA*/
    
    function calcularIngresosEsperados(precioTicket, ticketsVendidos) {

        return precioTicket * ticketsVendidos;
    }

    //Crear Descripción del Evento:

    function crearDescripcionEvento(nombreConcierto, nombreArtista, fecha) {

        // función para convertir fecha a formato español, parámetro fecha tipo new Date()

        function formatoEspañolFecha(fecha) {
            return new Intl.DateTimeFormat('es-ES', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
            }).format(fecha);
        }

        return (`Disfruta del Concierto ${nombreConcierto} de la mano de ${nombreArtista} el próximo ${formatoEspañolFecha(fecha)}`)
    }

    //Calcular Ingreso por Asistente

    function  calcularIngresoPorAsistente(ingresoTotal, asistentes) {

        const ingresoMedio = ingresoTotal/asistentes;
        
        return ingresoMedio.toFixed(2);
    }

    // necesito valor funcion calcularIngresosEsperados

    // calcularIngresoPorAsistente(ingresoTotal, evento.asistentesEvento)
}