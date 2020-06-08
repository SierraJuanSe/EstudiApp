


$('#Cuenta').click(function () {
    $('#login').hide(1000);
    $('#estudiante').show(1000);
    // swal("Good job!", "You clicked the button!", "error");
});

$('#Ingresar').click(function () {
    $('#fondo').hide(1000);
    $('#menu').show(1000);
    $('#menu1').show(1000);

});





$('#cerrar').click(function () {
    $('#fondo').show(1000);
    $('#menu').hide(1000);
});


$('#int').click(function () {
    alert("ajaa");
});

$('#bthorario').click(function () {
    $('#div-horario').show(1000);
    $('#volver').show(1000);
    $('#menu1').hide(1000);
});

$('#btgrupos').click(function () {
    $('#Grupos').show(1000);
    $('#volver').show(1000);
    $('#crearC').show(1000);
    $('#menu1').hide(1000);
});

$('#btpom').click(function () {
    $('.Spomodoro').show(1000);
    $('#volver').show(1000);
    $('#menu1').hide(1000);
});

$('#btsnack').click(function () {

});



$('#infoDiseño').click(function () {

});

$('#addDiseño').click(function () {

});
$('#deleteDiseño').click(function () {

});


$('#btVolver').click(function () {
    $('.Spomodoro').hide(1000);
    $('#div-horario').hide(1000);
    $('#menu1').show(1000);
    $('#volver').hide(1000);
    $('#Grupos').hide(1000);
});

$('#buscar').click(function () {
    var inp = $('#inputbuscar').val();
    var drop = $('#dropc').find('option:selected').text();
    if (inp == '' && drop == 'Selecciona...') {
        swal("Error", "Digita o selecciona", "error")
    } else {
        if (inp != '') {
            $('#datosM').hide(1000);
            $('#Consultas').append($('#in1'));
            $('#Consultas').show(1000);
        }

    }
});


$('#Crear').click(function () {
    var nom = $('#nombre').val();
    var ape = $('#apellido').val();
    var carre = $('#carrera').find('option:selected').text();
    var semestre = $('#semestre').find('option:selected').text();
    var correo = $('#correo').val();
    var pass = $('#password').val();
    var vpass = $('#verifypass').val();

    if (pass == vpass) {
        swal("Muy bien!", "Has creado una cuenta!", "success").then((value => {
            $('#login').show(1000);
            $('#estudiante').hide(1000);
        }

        ));
    } else {
        swal("Error", "Verifica tus datos", "error")
    }

});

$('#crearGrupo').click(function () {
    swal("Muy bien!", "Has creado una grupo de estudio!", "success");
});


function ConsultasGrupos(nombre) {
    for (let i = 1; i < 13; i++) {

    }

}