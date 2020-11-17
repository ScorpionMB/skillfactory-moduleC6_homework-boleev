const btn = document.querySelector('.j-btn');
const vision = document.querySelector('p');

btn.addEventListener('click', () => {
  const width = window.screen.width;
  const height = window.screen.height;
  const alertVision = `Ширина экрана: ${width} пикс, высота экрана: ${height} пикс`
  alert(alertVision)
  vision.innerHTML = `Ширина экрана: ${width} пикс, высота экрана: ${height} пикс`
})