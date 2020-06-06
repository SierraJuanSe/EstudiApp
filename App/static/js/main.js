

$('#Cuenta').click(function () {
    $('#login').hide(1000);
    $('#estudiante').show(1000);
    // swal("Good job!", "You clicked the button!", "error");
});

$('#Ingresar').click(function () {
    $('#fondo').hide(1000);
    $('#menu').show(1000);
    
});


$('#1').click(function () {
alert("bien");
});

$('#cerrar').click(function () {
    $('#fondo').show(1000);
    $('#menu').hide(1000);
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

