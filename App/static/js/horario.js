const diasSemana = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo']
const colores = ['bg-primary', 'bg-success', 'bg-danger', 'bg-warning', 'bg-info']
let diaEvento = ''
let cell
let eventos = []
initTableBody();

/*  Eventos de click  */
$('#btn-guardarEvento').click(function(){
  nuevoEvento()
});

$('#btn-borrarEvento').click(function(){
  borrarEvento()
});

$('.cell').click(function () {
  $('#modal-nuevoEvento').modal('toggle')
  diaEvento = this.className.split(' ')[0].split('-')[1];
  cell = this.id
})

function openDivNuevoEvento() {
  $('#div-nuevoEvento').slideToggle( "slow")
}
/*  fin eventos de click  */


function getDataNuevoEvento() {
  const nameMateria = $('#ipt-materia').val()
  const color = $('#ipt-color').val()
  const horaIn = $('#ipt-horaIn').val()
  const horaOut = $('#ipt-horaOut').val()
  const salon = $('#ipt-salon').val()

  let evento = {
    nombre: nameMateria,
    color: color,
    horaIn: horaIn,
    horaOut: horaOut,
    salon: salon,
    dias: diaEvento,
    cell: cell
  }

  return evento
}

function drawNuevoEvento(evento){
  let titulo = $('<h6 class="nombreEvento"></h6>')
  let sHoraIn = $('<span class="horaInEvento"></span>')
  let sHoraOut = $('<span class="horaOutEvento"></span>')
  let salon = $('<small class="text-muted salonEvento"></small>')
  let horas = $('<small></small>')
  
  titulo.append(evento.nombre)
  sHoraIn.append(evento.horaIn)
  sHoraOut.append(evento.horaOut)
  horas.append(sHoraIn)
  horas.append(' - ')
  horas.append(sHoraOut)
  salon.append(evento.salon)

  let div = $('<div></div>')

  div.append(titulo)
  div.append(horas)
  div.append('<br>')
  div.append(salon)

  return div
}

function borrarEvento() {  
  $('#'+cell).empty()
  $('#'+cell).removeClass(colores)

  for(let i = 0; i<eventos.length; i++){
    if(eventos[i].cell === cell){
      eventos.splice(i, 1)
    }
  }
}

function nuevoEvento() {
  let evento = getDataNuevoEvento()
  
  $('#'+evento.cell).empty()
  $('#'+cell).removeClass(colores)
  $('#'+evento.cell).append(drawNuevoEvento(evento));
  $('#'+evento.cell).addClass(evento.color)
  guardarEvento(evento)
  console.log(eventos);
}

function guardarEvento(evento) {
  for(let i = 0; i<eventos.length; i++){
    if(eventos[i].cell === evento.cell){
      eventos.splice(i, 1, evento)
      return
    }
  }

  eventos.push(evento)
}

function initTableBody(params) {
  for(let j = 0; j<9; j++){
    let row = $('<tr></tr>');

    for(let i = 0; i<=6 ; i++){
      let day = $('<td></td>')
      day.attr('id', 'cell-'+j+i);
      day.addClass('col-'+diasSemana[i])
      day.addClass('cell')
      row.append(day);
    }

    $('#table-body').append(row);
  }
}

function nuevaFila() {
  
  let row = $('<tr></tr>');

  for(let i = 0; i<=6 ; i++){
    let day = $('<td></td>')
    day.addClass('col-'+diasSemana[i])
    row.append(day);
  }

  return row
}

