const wsUri = 'wss://echo.websocket.org/';

const output = document.querySelector('.chat')
const btnSend = document.querySelector('.j-get')
const btnGeo = document.querySelector('.j-geo')
output.innerHTML = ""
let websocket;
let message;
let closeSend = false;
let n = 1

// Функция работы с WebSocket и обработчики событий
function testWebSocket()
{
  websocket = new WebSocket(wsUri);
  websocket.onopen = function(evt) { onOpen(evt) };
  websocket.onclose = function(evt) { onClose(evt) };
  websocket.onmessage = function(evt) { setTimeout(onMessage, 1000, evt) };
  websocket.onerror = function(evt) { onError(evt) };
}

function onOpen(evt)
{
  console.log('CONNECTED');
}

function onClose(evt)
{
  console.log('DISCONNECTED');
  output.innerHTML += `<p class="output">Сервер: Закрываю соединение...</p>`
  closeSend = true;
}

function onMessage(evt)
{
  console.log('RESPONSE: ' + evt.data);
  output.innerHTML += `<p class="output">Ответ сервера: ${evt.data}</p>`
}

function onError(evt)
{
  console.log('ERROR: ' + evt.data);
}

// Обработка ошибки при запросе гео-локации
const error = () => {
  console.log('Невозможно получить ваше местоположение');
}

// Обработка успешного запроса гео-локации с последующим закрытием соединения
const success = (position) => {
  console.log('position', position);
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;
  output.innerHTML += `<p class="output" style="word-wrap: break-word;">Ссылка на карту:
   https://www.openstreetmap.org/#map=18/${latitude}/${longitude}</p>`;
  if (n > 3) {
    message = document.querySelectorAll('.output')[2*n-8]
    message.style = "display:none";
    message = document.querySelectorAll('.output')[2*n-7]
    message.style = "display:none";
  }
  websocket.close();
}

// Отправка сообщения на сервер в случае активного соединения
btnSend.addEventListener('click', () => {
  message = document.querySelector('input').value
  if (closeSend) {
    console.log('Соединение закрыто')
    return
  }
  if (message == "") {
    console.log('Запрос пустой')
    return
  }
  output.innerHTML += `<p class="output">Запрос на сервер: ${message}</p>`
  websocket.send(message)
  if (n > 3) {
    message = document.querySelectorAll('.output')[2*n-8]
    message.style = "display:none";
    message = document.querySelectorAll('.output')[2*n-7]
    message.style = "display:none";
  }
  n++
 });

// Запрос данных гео-локации в случае активного соединения с сервером
btnGeo.addEventListener('click', () => {
    if (closeSend) {
    console.log('Соединение закрыто')
    return
  }
  if (!navigator.geolocation) {
    console.log('Geolocation не поддерживается вашим браузером');
  } else {
    console.log('Определение местоположения…');
    navigator.geolocation.getCurrentPosition(success, error);
  }
});
 
// Инициализация соединения с сервером
 window.addEventListener("load", testWebSocket, false);
