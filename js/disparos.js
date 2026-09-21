// ---------- ARREGLO DE DISPAROS (flechas élficas) ----------
const disparos = [];
const VELOCIDAD_DISPARO = 7;
const TAMANO_DISPARO = 4; // la flecha mide 4 veces este valor de largo

// ---------- CREAR UN DISPARO NUEVO ----------
function crearDisparo() {
  disparos.push({
    x: nave.x,
    y: nave.y,
    angulo: nave.angulo,
    distanciaRecorrida: 0
  });
}

// ---------- ACTUALIZAR DISPAROS ----------
function actualizarDisparos() {
  for (let i = disparos.length - 1; i >= 0; i--) {
    const d = disparos[i];

    d.x += Math.sin(d.angulo) * VELOCIDAD_DISPARO;
    d.y -= Math.cos(d.angulo) * VELOCIDAD_DISPARO;
    d.distanciaRecorrida += VELOCIDAD_DISPARO;

    // eliminar el disparo si sale del canvas o viajó demasiado lejos
    const fueraDeRango =
      d.x < 0 || d.x > canvas.width ||
      d.y < 0 || d.y > canvas.height ||
      d.distanciaRecorrida > 600;

    if (fueraDeRango) {
      disparos.splice(i, 1);
    }
  }
}

// ---------- DIBUJAR DISPAROS (flecha con destello dorado) ----------
function dibujarDisparos() {
  const largo = TAMANO_DISPARO * 4;

  disparos.forEach((d) => {
    ctx.save();
    ctx.translate(d.x, d.y);
    ctx.rotate(d.angulo); // 0 = apunta hacia arriba, igual que la nave

    ctx.shadowColor = "#ffd24a";
    ctx.shadowBlur = 8;

    // astil
    ctx.strokeStyle = "#f5e6a8";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, largo / 2);
    ctx.lineTo(0, -largo / 2);
    ctx.stroke();

    // punta
    ctx.fillStyle = "#ffd24a";
    ctx.beginPath();
    ctx.moveTo(0, -largo / 2 - 4);
    ctx.lineTo(-3, -largo / 2 + 2);
    ctx.lineTo(3, -largo / 2 + 2);
    ctx.closePath();
    ctx.fill();

    // plumas
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, largo / 2 - 4);
    ctx.lineTo(-3, largo / 2);
    ctx.moveTo(0, largo / 2 - 4);
    ctx.lineTo(3, largo / 2);
    ctx.stroke();

    ctx.restore();
  });
}

// ---------- DISPARAR CON LA BARRA ESPACIADORA ----------
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    crearDisparo();
  }
});