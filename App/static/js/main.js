var Ngrupos = 11;
var aux = 12;
let inscrito = ['bd', 'Literatura', 'EcuacionesDif', 'Econometria', 'Phyton']

$('#Cuenta').click(function () {
    $('#login').hide(1000);
    $('#estudiante').show(1000);

});

$('#Ingresar').click(function () {
    $('#fondo').hide(1000);
    $('#menu').show(1000);
    $('#menu1').show(1000);
    $('#chatContainer').show(1000)

    ingresoGeneral()
});


$('#cerrar').click(function () {
    $('#fondo').show(1000);
    $('#menu').hide(1000);
    $('#chatContainer').hide();
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
    botonesDatosQuemados();
    Permisos();

});

$('#btpom').click(function () {
    $('.Spomodoro').show(1000);
    $('#volver').show(1000);
    $('#menu1').hide(1000);
});

$('#btsnack').click(function () {
    $('#snacks').show(1000);
    $('#volver').show(1000);
    $('#menu1').hide(1000);
});




$('#btVolver').click(function () {
    $('.Spomodoro').hide(1000);
    $('#div-horario').hide(1000);
    $('#menu1').show(1000);
    $('#volver').hide(1000);
    $('#Grupos').hide(1000);
    $('#snacks').hide(1000);
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
    var nom = $('#nomg').val();
    var salon = $('#salong').val();
    var des = $('#descg').val();
    var dia = $('#dropg').find('option:selected').text();
    var ini = $('#horain').val();
    var fin = $('#horafin').val();
    swal("Muy bien!", "Has creado una grupo de estudio!", "success");
    pintargrupos(nom, salon, des, dia, ini, fin);
    $('#nomg').val('');
    $('#salong').val('');
    $('#descg').val('');

    $('#horain').val('');
    $('#horafin').val('');


});



$('#buscar').click(function () {

    var inp = $('#inputbuscar').val();
    var drop = $('#dropc').find('option:selected').text();
    if (inp == '' && drop == 'Selecciona...') {
        swal("Error", "Digita o selecciona", "error")
    } else {
        if (inp != '') {
            Consultas(inp);
        } else {
            Consultas(drop);
        }

    }
});




var sum = 0, d = 0, c = 11;
function pintargrupos(nom, salon, des, dia, ini, fin) {
    text = '';
    var modal = '';
    sum = sum + 1;
    aux = aux + 1;
    c = c + 1;
    var id = nom.replace(/ /g, "");

    modal =
        '<div class="modal fade" id="modalg' + c + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">' +
        '<div class="modal-dialog"><div class="modal-content"><div class="modal-header">' +
        '<h5 class="modal-title" id="exampleModalLabel">' + nom + '</h5>' +
        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
        '<span aria-hidden="true">&times;</span> </button> </div><div class="modal-body">' + des + '</div> <div class="modal-footer">' +
        '<button type="button" class="btn btn-secondary" data-dismiss="modal">OK</button>' +
        '</div> </div> </div> </div>';

    $('#modals-grupos').append(modal);


    text = '<div class="col-6 col-sm-3"  id="' + id + '" >' +
        '<div  class="card border-info mb-3" style = "max-width: 18rem;" >' +
        '<div id="ng' + aux + '" class="card-header">' + nom + '</div>' +
        '<div class="card-body text-info">' +
        '<h5 class="card-title">' + dia + ':' + ini + '-' + fin + '</h5>' +
        '<p id="incr' + c + '" class="card-text">Inscribete</p>' + '<div class="row">' +
        '<div class="col hov" data-toggle="modal" data-target="#modalg' + c + '"  >' +
        '<span class="material-icons">' + 'info' + '</span>' + '</div>' + '<div class="col hov" id="chatdiseño">' +
        '<span id="schat' + aux + '" class="material-icons">' + 'chat' + '</span>' + '</div>' + '<div class="col hov" id="addDiseño">' +
        '<span id="sadd' + aux + '" class="material-icons">' + 'add' + '</span>' + '</div>' + '<div class="col hov" id="deleteDiseño">' +
        '<span id="delete' + aux + '" class="material-icons">' + 'delete' + '</span>' + '</div>' + '</div>' + '</div>' + '</div >' + '</div>';
    // $('#g' + d).append(text);
    $('#n').append(text);

    $('#delete' + aux).css("display", "none");
    $('#schat' + aux).css("display", "none");
    $('#sadd' + aux).click(function () {
        swal("¡Muy bien!", "Te has incrito a un grupo de estudio ", "success");
        $('#incr' + c).empty();
        $('#incr' + c).append('Estas inscrito');
        $('#sadd' + aux).css("display", "none");
        $('#delete' + aux).css("display", "inline");
        $('#schat' + aux).css("display", "inline");
    });

    $('#delete' + aux).click(function () {


        swal("¿Estas seguro?", "Al salir de un grupo no ppuedes ir a las reuniones", "warning", {
            buttons: ["Cancelar", "Estoy seguro"]
        })

            .then((value) => {
                if (value == true) {
                    swal("Exito", "Has salido de un grupo de estudio", "success");
                    $('#incr' + c).empty();
                    $('#incr' + c).append('Inscribete');
                    $('#sadd' + aux).css("display", "inline");
                    $('#delete' + aux).css("display", "none");
                    $('#schat' + aux).css("display", "none");

                }
            });
    });

    $('#schat' + aux).click(function () {

    });

    Ngrupos = Ngrupos + 1;


}



var sum1 = 0, d1 = 0, c1 = 12;
function Consultas(cons) {
    for (let i = 0; i < Ngrupos + 1; i++) {
        var carta = document.getElementById('incr' + i).parentNode.parentNode.parentNode.id;
        $('#' + carta).css("display", "inline");
    }


    d1 = 0;
    sum1 = 0;
    if (cons == 'Todos') {
        for (let i = 0; i < Ngrupos + 1; i++) {
            var carta = document.getElementById('incr' + i).parentNode.parentNode.parentNode.id;
            $('#' + carta).css("display", "inline");
        }
    } else if (cons == 'Inscritos') {
        for (let i = 0; i < Ngrupos + 1; i++) {

            var carta = document.getElementById('incr' + i).parentNode.parentNode.parentNode.id;
            var inc = document.getElementById('incr' + i).textContent;
            console.log(carta + inc);
            if (inc != 'Estas inscrito') {

                $('#' + carta).css("display", "none");

            }

        }



    } else if (cons == 'No Inscritos') {
        for (let i = 0; i < Ngrupos + 1; i++) {

            var carta = document.getElementById('incr' + i).parentNode.parentNode.parentNode.id;
            var inc = document.getElementById('incr' + i).textContent;
            console.log(carta + inc);
            if (inc != 'Inscribete') {

                $('#' + carta).css("display", "none");
            }

        }



    } else {
        var g = 1;
        for (let i = 0; i < Ngrupos + 1; i++) {
            var carta = document.getElementById('ng' + (i + 1)).parentNode.parentNode.id;
            var inc = document.getElementById('ng' + (i + 1)).textContent;
            var car;
            console.log(carta + inc);
            if (inc != cons) {
                $('#' + carta).css("display", "none");
            } else {
                car = carta;
                g = 0;
                $('#' + carta).css("display", "inline");
                $('#inputbuscar').val('');
            }
        }

        if (g == 1) {
            swal("No existe", "El grupo que tratas de buscar no exite", "error");
            $('#inputbuscar').val('');
            Consultas('Todos');
        }

    }

}


function Permisos() {
    for (let i = 0; i <= 11; i++) {
        var carta = document.getElementById('incr' + i).parentNode.parentNode.parentNode.id;
        var inc = document.getElementById('incr' + i).textContent;
        if (inc == 'Inscribete') {
            $('#delete' + (i + 1)).css("display", "none");
            $('#schat' + (i + 1)).css("display", "none");
        } else {
            $('#sadd' + (i + 1)).css("display", "none");

        }

    }
}


function botonesDatosQuemados() {

    for (let i = 1; i <= 12; i++) {
        $('#schat' + i).click(function () {
            let grupo = $(this).parent().parent().parent().parent().parent().attr('id');
            openChat(grupo);
            ingresocualquiera('chat'+grupo);
        });

        $('#sadd' + i).click(function () {
            swal("¡Muy bien!", "Te has incrito a un grupo de estudio ", "success");
            $('#incr' + (i - 1)).empty();
            $('#incr' + (i - 1)).append('Estas inscrito');
            $('#sadd' + i).css("display", "none");
            $('#delete' + i).css("display", "inline");
            $('#schat' + i).css("display", "inline");
            let grupo = $(this).parent().parent().parent().parent().parent().attr('id');
            inscrito.push(grupo)
        });

        $('#delete' + i).click(function () {

            swal("¿Estas seguro?", "Al salir de un grupo no ppuedes ir a las reuniones", "warning", {
                buttons: ["Cancelar", "Estoy seguro"]
            })

                .then((value) => {
                    if (value == true) {
                        swal("Exito", "Has salido de un grupo de estudio", "success");
                        $('#incr' + (i - 1)).empty();
                        $('#incr' + (i - 1)).append('Inscribete');
                        $('#sadd' + i).css("display", "inline");
                        $('#delete' + i).css("display", "none");
                        $('#schat' + i).css("display", "none");
                        let grupo = $(this).parent().parent().parent().parent().parent().attr('id');
                        inscrito.splice(inscrito.indexOf(grupo), 1)
                        console.log(inscrito);
                    }
                });
        });


    }
}

function ingresoGeneral(){
    info = {
        type: 'new',
        from: nombre,
        to: 'chat_general'
    }

    websocket.send(JSON.stringify(info))
}

function ingresocualquiera(cualquier){
    info = {
        type: 'new',
        from: nombre,
        to: cualquier
    }

    websocket.send(JSON.stringify(info))
}