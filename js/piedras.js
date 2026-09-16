// ---------- IMAGEN DE LAS PIEDRAS ----------
const imgPiedra = new Image();
imgPiedra.src = "assets/images/piedra.svg";

// ---------- ARREGLO DE PIEDRAS ----------
const piedras = [];
const CANTIDAD_PIEDRAS = 5;

// ---------- CREAR PIEDRAS INICIALES ----------
function crearPiedras() {
  for (let i = 0; i < CANTIDAD_PIEDRAS; i++) {
    piedras.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      angulo: Math.random() * Math.PI * 2,
      velocidad: 1 + Math.random() * 1.5,
      tamano: 40 + Math.random() * 20,
      rotacion: (Math.random() - 0.5) * 0.05,
      rotacionActual: 0
    });
  }
}

// ---------- ACTUALIZAR PIEDRAS ----------
function actualizarPiedras() {
  piedras.forEach((p) => {
    p.x += Math.sin(p.angulo) * p.velocidad;
    p.y -= Math.cos(p.angulo) * p.velocidad;

    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;
  });
}

// ---------- DIBUJAR PIEDRAS ----------
function dibujarPiedras() {
  piedras.forEach((p) => {
    p.rotacionActual += p.rotacion;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotacionActual);
    ctx.drawImage(
      imgPiedra,
      -p.tamano / 2,
      -p.tamano / 2,
      p.tamano,
      p.tamano
    );
    ctx.restore();
  });
}