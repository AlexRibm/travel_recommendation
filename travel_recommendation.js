// Función para mostrar los resultados
function mostrarResultados(lugares) {
  const resultadosDiv = document.getElementById('resultados');
  const introDiv = document.querySelector('.intro');
  
  resultadosDiv.innerHTML = '';  // Limpiar resultados anteriores

  if (lugares.length > 0) {
      introDiv.classList.add('hidden');  // Ocultar el div de introducción
      resultadosDiv.classList.remove('hidden');  // Mostrar el div de resultados

      lugares.forEach(lugar => {
          const lugarDiv = document.createElement('div');
          lugarDiv.classList.add('lugar');

          const nombreLugar = document.createElement('h2');
          nombreLugar.textContent = lugar.name;

          const imagenLugar = document.createElement('img');
          imagenLugar.src = lugar.imageUrl;
          imagenLugar.alt = lugar.name;

          const descripcionLugar = document.createElement('p');
          descripcionLugar.textContent = lugar.description;

          lugarDiv.appendChild(nombreLugar);
          lugarDiv.appendChild(imagenLugar);
          lugarDiv.appendChild(descripcionLugar);

          resultadosDiv.appendChild(lugarDiv);
      });
  } else {
      introDiv.classList.remove('hidden');  // Mostrar el div de introducción si no hay resultados
      resultadosDiv.classList.add('hidden');  // Ocultar el div de resultados
  }
}

fetch('Travel_recommendation_api.json')  // Asegúrate de que esta ruta sea correcta
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then(data => {
      console.log('JSON data:', data);  // Depuración
      window.lugares = data;
  })
  .catch(error => {
      console.error('Hubo un problema con la solicitud fetch:', error);
  });

function buscarResultados(event) {
  event.preventDefault();  // Evita la recarga de la página

  let inputTexto = document.querySelector('.search-input').value.toLowerCase();
  let resultados = [];

  if (inputTexto.includes('beaches')) {
      resultados = window.lugares.beaches;
      console.log('Mostrando resultados de playas');
  } else if (inputTexto.includes('temples')) {
      resultados = window.lugares.temples;
      console.log('Mostrando resultados de templos');
  } else if (inputTexto.includes('countries')) {
      resultados = window.lugares.countries.map(country => country.cities).flat();
      console.log('Mostrando resultados de países');
  } else {
      console.log('No se encontraron resultados para la palabra clave ingresada');
  }

  mostrarResultados(resultados);
}

function limpiarResultados() {
  const resultadosDiv = document.getElementById('resultados');
  const introDiv = document.querySelector('.intro');
  
  resultadosDiv.innerHTML = '';  // Limpiar el contenido del div de resultados
  resultadosDiv.classList.add('hidden');  // Ocultar el div de resultados
  introDiv.classList.remove('hidden');  // Mostrar el div de introducción
}

document.getElementById('boton-busqueda').addEventListener('click', buscarResultados);
document.getElementById('boton-reiniciar').addEventListener('click', limpiarResultados);
