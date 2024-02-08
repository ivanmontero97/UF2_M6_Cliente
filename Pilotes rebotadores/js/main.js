import { Pelota } from './Pelota.js';

const lienzo = document.querySelector('canvas');
const ctx = lienzo.getContext('2d');

// Hacer que el canvas ocupe toda la pantalla
lienzo.width = window.innerWidth;
lienzo.height = window.innerHeight;

// Función para generar un número aleatorio entre dos valores
function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Función para crear un conjunto de pelotas aleatorias
function crearPelotas(cantidad) {
  const pelotas = [];

  for (let i = 0; i < cantidad; i++) {
    const tamaño = aleatorio(10, 20);
    const x = aleatorio(tamaño, lienzo.width - tamaño);
    const y = aleatorio(tamaño, lienzo.height - tamaño);
    const velX = aleatorio(-4, 4);
    const velY = aleatorio(-4, 4);
    const color = `rgb(${aleatorio(0, 255)}, ${aleatorio(0, 255)}, ${aleatorio(0, 255)})`;

    const nuevaPelota = new Pelota(x, y, velX, velY, color, tamaño);
    pelotas.push(nuevaPelota);
  }

  return pelotas;
}

// Función principal de animación
function bucle() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, lienzo.width, lienzo.height);

  const pelotas = crearPelotas(20);

  pelotas.forEach((pelota) => {
    pelota.dibujar(ctx);
    pelota.mover(lienzo.width, lienzo.height);
  });

  detectarColisiones(pelotas);

  requestAnimationFrame(bucle);
}

// Función para detectar colisiones entre pelotas y actualizar velocidades
function detectarColisiones(pelotas) {
  for (let i = 0; i < pelotas.length; i++) {
    for (let j = i + 1; j < pelotas.length; j++) {
      const dx = pelotas[i].x - pelotas[j].x;
      const dy = pelotas[i].y - pelotas[j].y;
      const distancia = Math.sqrt(dx * dx + dy * dy);

      if (distancia < pelotas[i].tamaño + pelotas[j].tamaño) {
        intercambiarVelocidades(pelotas[i], pelotas[j]);
      }
    }
  }
}

// Función para intercambiar velocidades entre dos pelotas
function intercambiarVelocidades(pelota1, pelota2) {
  const tempVelX = pelota1.velX;
  pelota1.velX = pelota2.velX;
  pelota2.velX = tempVelX;

  const tempVelY = pelota1.velY;
  pelota1.velY = pelota2.velY;
  pelota2.velY = tempVelY;
}

bucle();