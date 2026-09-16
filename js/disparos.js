const disparos = [];
const VELOCIDAD_DISPARO = 7;
const TAMANO_DISPARO = 4;

function crearDisparo() {
  disparos.push({
    x: nave.x,
    y: nave.y,
    angulo: nave.angulo,
    distanciaRecorrida: 0
  });
}

function actualizarDisparos() {
  for (let i = disparos.length - 1; i >= 0; i--) {
    const d = disparos[i];

    d.x += Math.sin(d.angulo) * VELOCIDAD_DISPARO;
    d.y -= Math.cos(d.angulo) * VELOCIDAD_DISPARO;
    d.distanciaRecorrida += VELOCIDAD_DISPARO;

    const fueraDeRango =
      d.x < 0 || d.x > canvas.width ||
      d.y < 0 || d.y > canvas.height ||
      d.distanciaRecorrida > 600;

    if (fueraDeRango) {
      disparos.splice(i, 1);
    }
  }
}

function dibujarDisparos() {
  ctx.fillStyle = "#ffdd00";
  disparos.forEach((d) => {
    ctx.beginPath();
    ctx.arc(d.x, d.y, TAMANO_DISPARO, 0, Math.PI * 2);
    ctx.fill();
  });
}

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    crearDisparo();
  }
});