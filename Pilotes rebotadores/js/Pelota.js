export class Pelota {
    constructor(x, y, velX, velY, color, tamaño) {
      this.x = x;
      this.y = y;
      this.velX = velX;
      this.velY = velY;
      this.color = color;
      this.tamaño = tamaño;
    }
  
    // Método para dibujar la pelota en el contexto proporcionado
    dibujar(ctx) {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.arc(this.x, this.y, this.tamaño, 0, 2 * Math.PI);
      ctx.fill();
    }
  
    // Método para manejar el movimiento de la pelota dentro del área del canvas
    mover(anchoCanvas, altoCanvas) {
      if (this.x + this.tamaño > anchoCanvas || this.x - this.tamaño < 0) {
        this.velX = -this.velX; // Rebote en los extremos horizontales
      }
  
      if (this.y + this.tamaño > altoCanvas || this.y - this.tamaño < 0) {
        this.velY = -this.velY; // Rebote en los extremos verticales
      }
  
      // Actualizar la posición de la pelota según las velocidades actuales
      this.x += this.velX;
      this.y += this.velY;
    }
  }
  