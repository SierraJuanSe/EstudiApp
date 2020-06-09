var s = 0;
var m = 25;

function cronometrar() {
    escribir();
    id = setInterval(escribir, 1000);
}

function escribir() {
    while (s >= 0) {


        s--;
        if (s < 0) { m--; s = 59; }
        var minutero = document.getElementById("minutero")
        var segundero = document.getElementById("segundero")
        minutero.innerHTML = '<h1 style="font-size:150px">' + m + ':' + s + '</h1>';
        if (s < 10) { minutero.innerHTML = '<h1 style="font-size:150px">' + m + ':0' + s + '</h1>'; } else { minutero.innerHTML = '<h1 style="font-size:150px">' + m + ':' + s + '</h1>'; }
    }
}
function parar() {
    clearInterval(id);
}

function reiniciar() {
    clearInterval(id);
    m = 25; s = 1;
    escribir();
    $("#Btn_play").show(250);
}

function cambiaTamanio() {
    var pausa;
    pausa = document.getElementById("Btn_pause");
    pausa.style = 'width:300px; height:75px'
    var replay;
    replay = document.getElementById("Btn_replay");
    replay.style = 'width:300px; height:75px'
}

$('#Btn_pause').click(function (e) {
    e.preventDefault();
    parar();
    $("#Btn_play").show(250);
    var pausa;
    pausa = document.getElementById("Btn_pause");
    pausa.style = 'width:200px; height:75px'
    var replay;
    replay = document.getElementById("Btn_replay");
    replay.style = 'width:200px; height:75px'
});

$('#Btn_play').click(function (e) {
    e.preventDefault();
    console.log('Hola');
    cronometrar();
    $("#Btn_play").hide(1);
    cambiaTamanio();
});

$('#Btn_replay').click(function (e) {
    e.preventDefault();
    reiniciar();
    var pausa;
    pausa = document.getElementById("Btn_pause");
    pausa.style = 'width:200px; height:75px'
    var replay;
    replay = document.getElementById("Btn_replay");
    replay.style = 'width:200px; height:75px'
});

$('#Btn_pomodoro').click(function (e) {
    clearInterval(id);
    m = 25; s = 1;
    escribir();
    $("#Btn_play").show(250);
    var pausa;
    pausa = document.getElementById("Btn_pause");
    pausa.style = 'width:200px; height:75px'
    var replay;
    replay = document.getElementById("Btn_replay");
    replay.style = 'width:200px; height:75px'
});

$('#Btn_descanso').click(function (e) {
    clearInterval(id);
    m = 5; s = 1;
    escribir();
    $("#Btn_play").show(250);
    var pausa;
    pausa = document.getElementById("Btn_pause");
    pausa.style = 'width:200px; height:75px'
    var replay;
    replay = document.getElementById("Btn_replay");
    replay.style = 'width:200px; height:75px'
});

$('#Btn_descanso2').click(function (e) {
    clearInterval(id);
    m = 10; s = 1;
    escribir();
    $("#Btn_play").show(250);
    var pausa;
    pausa = document.getElementById("Btn_pause");
    pausa.style = 'width:200px; height:75px'
    var replay;
    replay = document.getElementById("Btn_replay");
    replay.style = 'width:200px; height:75px'
});