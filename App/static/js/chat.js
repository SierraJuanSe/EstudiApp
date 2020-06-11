let nombre = 'juan'
let chatsActivos =['chat_general']

const url = 'ws://localhost:30000';
const websocket = new WebSocket(url);

websocket.onopen = function (evt) {
  console.log('conectado');
}

websocket.onmessage = function (mensaje) {
  reciveMsg(mensaje)
}

websocket.onclose = function (evt) {
  info = {
    type: 'close',
    from: nombre,
  }
  console.log("--Desconectado--" + evt.data);
  websocket.close();
  $('#tablero').hide(500);
  $('#menu').show(500);
};

/* Funciones de click */
$(document).on('click', '.min-chat',function () {
  minChat(this);
});

$(document).on('click', '.close-chat',function () {
  closeChat(this)
});

$(document).on('click', '.btn-send',function () {
  sendMsg(this)
});

$(document).on('keypress', '.ipt-chat',function (e) {
  if (e.keyCode == 13 && !e.shiftKey) {
    e.preventDefault();
    sendMsg(this)
  }
});
/* fin funciones de click */


function minChat(chat_page) {
  let chat = $(chat_page).parent().parent().parent()
  chat.children('.chat-page').slideToggle();
}

function closeChat(chat_page) {
  let chat = $(chat_page).parent().parent().parent()
  chat.slideToggle()
}

function sendMsg(btn) {
  let info = getInfoMsgOut(btn)

  if (info.msg != '') {
    drawMsgOut(info)
    websocket.send(JSON.stringify(info))
  }
}

function getInfoMsgOut(btn) {
  let msg = $(btn).parent().children('.ipt-chat').val();
  let chat = $(btn).parent().parent().parent().parent().attr('id');
  let today = new Date()
  let time = today.getHours() + ':' + today.getMinutes();

  info = {
    type: 'msg',
    from: nombre,
    to: chat,
    msg: msg,
    time: time
  }
  $(btn).parent().children('.ipt-chat').val('')
  return info
}

function drawMsgOut(info) {
  let chatPage = $('#' + info.to).find('.msg-page');

  let outgoingMSg = '<div class="outgoing-chats"><div class="outgoing-msg-inbox">\
                    <p>'+ info.msg + '</p><span class="time-send">' + info.time + '</span></div></div>'

  chatPage.append(outgoingMSg).parent().animate({ scrollTop: chatPage.prop("scrollHeight") }, 500);
}

function reciveMsg(mensaje) {
  let msg = JSON.parse(mensaje.data);

  if (msg.type === 'msg') {
    drawRecivedMsg(msg);
  }
}

function drawRecivedMsg(msg) {
  let chatPage = $('#' + msg.to).find('.msg-page');
  let recivedMsg = '<div class="received-chats"><div class="received-msg-inbox">\
      <p><span class="sender">'+ msg.from + '</span>' + msg.msg + '</p>\
      <span class="time-send">'+ msg.time + '</span></div></div>'

  chatPage.append(recivedMsg).parent().animate({ scrollTop: chatPage.prop("scrollHeight") }, 500);
}


function ping() {
  msm = {
    type: 'ping',
    message: 'Hago Ping'
  };
  var prom = JSON.stringify(msm);
  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  sleep(30000).then(() => {
    websocket.send(prom);
  });
}

/* funciones de prueba */

function openChat(grupo) {
  let chatCont = $('#chatContainer')

  if(chatsActivos.includes(grupo)){
    $('#chat'+grupo).show()
  }else{
    chatCont.append(drawChat(grupo))
    chatsActivos.push(grupo)
  }
}

function drawChat(grupo) {
  let chatDiv = '<div class="chati"><div id="chat'+grupo+'" class="chat" value>' //falta cerrar
  chatDiv += '<div class="msg-header"><div class="msg-header-name"><h4>'+grupo+'</h4></div>\
  <div class="header-icons"><i class="min-chat fas fa-minus"></i><i class="close-chat fas fa-times"></i></div></div>'
  chatDiv += '<div class="chat-page">' //falta cerrar
  chatDiv += '<div class="msg-inbox"><div class="chats"><div class="msg-page"></div></div></div>'
  chatDiv += '<div class="msg-bottom"><div class="input-group ipt-group-chat">\
  <textarea type="text" class="form-control ipt-chat" placeholder="escribe mensaje..." rows="1"></textarea>\
  <div class="input-group-append btn-send"><span class="input-group-text input-group-text-chat"><i class="fab fa-telegram-plane fa-lg"></i>\
  </span></div></div></div>'
  chatDiv += '</div></div></div>'

  return chatDiv
}
