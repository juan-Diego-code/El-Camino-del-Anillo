// ---------- IMÁGENES DE LOS ENEMIGOS (una por nivel) ----------
const imgNazgul = new Image();
imgNazgul.src = "./assets/images/nazgul.svg"; // nivel 1: La Comarca

const imgOrco = new Image();
imgOrco.src = "./assets/images/orco.svg"; // nivel 2: Minas de Moria

const imgOjo = new Image();
imgOjo.src = "./assets/images/ojo.svg"; // nivel 3: Mordor

// posición 0 = nivel 1, posición 1 = nivel 2, posición 2 = nivel 3
const imagenesEnemigos = [imgNazgul, imgOrco, imgOjo];

// ---------- ARREGLO DE ENEMIGOS (antes "piedras") ----------
const piedras = [];

// ---------- CREAR ENEMIGOS DEL NIVEL ----------
function crearPiedras() {
  const cantidad = PIEDRAS_POR_NIVEL[nivelActual - 1];
  const imagen = imagenesEnemigos[nivelActual - 1];

  for (let i = 0; i < cantidad; i++) {
    piedras.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      angulo: Math.random() * Math.PI * 2,
      velocidad: 1 + Math.random() * 1.5,
      tamano: 40 + Math.random() * 20,
      rotacion: (Math.random() - 0.5) * 0.05,
      rotacionActual: 0,
      imagen: imagen
    });
  }
}

// ---------- ACTUALIZAR ENEMIGOS ----------
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

// ---------- DIBUJAR ENEMIGOS ----------
function dibujarPiedras() {
  piedras.forEach((p) => {
    p.rotacionActual += p.rotacion;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotacionActual);
    ctx.drawImage(
      p.imagen,
      -p.tamano / 2,
      -p.tamano / 2,
      p.tamano,
      p.tamano
    );
    ctx.restore();
  });
}