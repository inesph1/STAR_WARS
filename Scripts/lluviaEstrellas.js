//cuando cargue el documento
$(document).ready(function () {

    //PETICIONES ASINCRONAS
    const personajes = $('.carta');

    personajes.each(function () {
        $(this).on('click', function () {
            const personaje = $(this).text().trim();
            const personajeCodificado = encodeURIComponent(personaje); //en el caso de darth vader codifica los espacios para la uri
            const apiUrl = `https://swapi.dev/api/people/?search=${personajeCodificado}&format=json`;
            $.ajax({
                url: apiUrl,
                method: 'GET',
                dataType: 'json',
                success: function (response) {

                    //$('#response').text(JSON.stringify(response));
                    console.log(response);
                    //console.log(response.people);
                    obtenerInformacion(response.results[0]);

                    //let json= $('#response').text(JSON.stringify(response));
                    //console.log(`${response.people}/?search`);
                    // console.log(`${response.people}/?search=${personajeCodificado}&format=json`);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    // Manejar errores de la petición
                    $('#response').text('Error: ' + textStatus + ', ' + errorThrown);
                }
            });

        });
    });

    function obtenerInformacion(jsonPersonaje) {
        /*console.log(jsonPersonaje);
        console.log(jsonPersonaje.name);
        console.log(jsonPersonaje.species);
        console.log(jsonPersonaje.homeworld);*/
        let planeta;


        // var parrafo = $(".info");

        const apiUrl = `${jsonPersonaje.homeworld}`;
        $.ajax({
            url: apiUrl,
            method: 'GET',
            dataType: 'json',
            success: function (response) {


                /* console.log(response);
                 console.log(response.name);*/
                planeta = response.name.toString();

                var c2 = $("<div></div>");
                var parrafo = $('<p class="info"></p>');

                $('.info').remove(); //al tratar de eliminar un elemento que aun no existe no salta excepcion
                c2.append(parrafo); //hasta que no haga el append el elemento no existe por lo que borra el elemento anterior

                parrafo.html(`NOMBRE: ${jsonPersonaje.name}<br>PLANETA: ${planeta}<br>PESO: ${jsonPersonaje.height} KG<br>COLOR DE PELO: ${jsonPersonaje.hair_color}<br> 
                    COLOR DE PIEL: ${jsonPersonaje.skin_color}<br>COLOR DE OJOS: ${jsonPersonaje.eye_color}<br>AÑO DE NACIMIENTO: ${jsonPersonaje.birth_year}<br>GENERO: ${jsonPersonaje.gender}<br>`);
                $('.contenedor').append(c2);

            },
            error: function (jqXHR, textStatus, errorThrown) {
                // Manejar errores de la petición
                $('#response').text('Error: ' + textStatus + ', ' + errorThrown);
            }
        });

    }





    //CIELO ESTRELLADO
    // Función para generar un número aleatorio en un rango específico
    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    // Función para crear una estrella
    function createStar() {
        var size = randomInRange(1, 4); // Tamaño aleatorio
        var xPos, yPos;

        // Generar posición aleatoria para las estrellas
        var side = Math.floor(Math.random() * 4); // 0: arriba, 1: derecha, 2: abajo, 3: izquierda
        switch (side) {
            case 0: // Arriba
                xPos = randomInRange(0, $(window).width());
                yPos = 0;
                break;
            case 1: // Derecha
                xPos = $(window).width();
                yPos = randomInRange(0, $(window).height());
                break;
            case 2: // Abajo
                xPos = randomInRange(0, $(window).width());
                yPos = $(window).height();
                break;
            case 3: // Izquierda
                xPos = 0;
                yPos = randomInRange(0, $(window).height());
                break;
        }

        var speed = size * 2; // Velocidad basada en el tamaño
        var $star = $("<div class='star'></div>").css({
            width: size + "px",
            height: size + "px",
            left: xPos,
            top: yPos
        });
        $("#bg").append($star);

        // Calcular la posición central de la pantalla (es donde fugan)
        var centerX = $(window).width() / 2;
        var centerY = $(window).height() / 2;

        // Animación de la estrella hacia el centro de la pantalla con cambio de tamaño
        $star.animate({
            left: centerX + randomInRange(-100, 100) + "px",
            top: centerY + randomInRange(-100, 100) + "px",
            width: "1px", // Cambia el tamaño al llegar al centro
            height: "1px"
        }, speed * 3000, "linear", function () {
            $(this).remove(); // Remueve la estrella cuando alcanza el centro de la pantalla
        });
    }

    // Crea estrellas cada cierto intervalo de tiempo
    setInterval(createStar, 200);

});



