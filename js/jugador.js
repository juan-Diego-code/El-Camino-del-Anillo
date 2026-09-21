// ---------- OBJETO JUGADOR (el Portador del Anillo) ----------
// x, y = centro del personaje en píxeles del mapa
const jugador = {
  x: 0,
  y: 0,
  ancho: 24,          // tamaño de la caja de colisión
  alto: 24,
  velocidad: 3,       // píxeles por frame (a 60 fps)
  direccion: "abajo", // "arriba" | "abajo" | "izquierda" | "derecha"
  caminando: false,
  animacion: 0,
  vida: 6,            // en medios corazones: 6 = 3 corazones
  vidaMax: 6
};

// ---------- COLOCAR AL JUGADOR EN EL INICIO DE LA ZONA ----------
function colocarJugadorEnInicio() {
  jugador.x = mapaActual.inicio.x;
  jugador.y = mapaActual.inicio.y;
  jugador.direccion = "abajo";
  jugador.caminando = false;
}

// ---------- ACTUALIZAR JUGADOR (dt = 1 equivale a un frame a 60 fps) ----------
function actualizarJugador(dt) {
  let dx = 0;
  let dy = 0;
  if (teclas["arrowleft"] || teclas["a"]) dx -= 1;
  if (teclas["arrowright"] || teclas["d"]) dx += 1;
  if (teclas["arrowup"] || teclas["w"]) dy -= 1;
  if (teclas["arrowdown"] || teclas["s"]) dy += 1;

  if (dx === 0 && dy === 0) {
    jugador.caminando = false;
    return;
  }

  // en diagonal se camina a la misma velocidad que en línea recta
  const largo = Math.hypot(dx, dy);
  const paso = jugador.velocidad * dt;
  const mx = (dx / largo) * paso;
  const my = (dy / largo) * paso;

  // se mueve un eje a la vez para poder deslizarse por las paredes
  if (!chocaConMapa(jugador.x + mx, jugador.y, jugador.ancho, jugador.alto)) jugador.x += mx;
  if (!chocaConMapa(jugador.x, jugador.y + my, jugador.ancho, jugador.alto)) jugador.y += my;

  // hacia dónde mira (en diagonal manda el eje horizontal)
  if (dx !== 0) jugador.direccion = dx < 0 ? "izquierda" : "derecha";
  else jugador.direccion = dy < 0 ? "arriba" : "abajo";

  jugador.caminando = true;
  jugador.animacion += dt;
}

// ---------- DIBUJAR JUGADOR ----------
function dibujarJugador() {
  const { x, y, direccion } = jugador;
  const lateral = direccion === "izquierda" || direccion === "derecha";
  const paso = jugador.caminando ? Math.sin(jugador.animacion * 0.5) : 0;
  const rebote = Math.abs(paso) * -1.5;

  // sombra
  ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
  ctx.beginPath();
  ctx.ellipse(x, y + 14, 11, 4, 0, 0, Math.PI * 2);
  ctx.fill();

  // pies
  ctx.fillStyle = "#7a5c3a";
  ctx.beginPath();
  ctx.ellipse(x - 4, y + 13 + paso * 2, 4, 3, 0, 0, Math.PI * 2);
  ctx.ellipse(x + 4, y + 13 - paso * 2, 4, 3, 0, 0, Math.PI * 2);
  ctx.fill();

  // capa verde
  const ancho = lateral ? 7 : 9;
  const angosto = lateral ? 4 : 6;
  ctx.fillStyle = "#2f6b3a";
  ctx.strokeStyle = "#9be37a";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(x - ancho, y + 12);
  ctx.lineTo(x + ancho, y + 12);
  ctx.lineTo(x + angosto, y - 4 + rebote);
  ctx.lineTo(x - angosto, y - 4 + rebote);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // cabeza
  const cy = y - 10 + rebote;
  ctx.fillStyle = direccion === "arriba" ? "#5a3a1e" : "#e6c79c";
  ctx.strokeStyle = "#7a5c3a";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(x, cy, 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // pelo rizado (mitad superior de la cabeza)
  if (direccion !== "arriba") {
    ctx.fillStyle = "#5a3a1e";
    ctx.beginPath();
    ctx.arc(x, cy - 1, 8.5, Math.PI, Math.PI * 2);
    ctx.fill();
  }

  // ojos
  ctx.fillStyle = "#222222";
  if (direccion === "abajo") {
    ctx.beginPath();
    ctx.arc(x - 3, cy + 1, 1.3, 0, Math.PI * 2);
    ctx.arc(x + 3, cy + 1, 1.3, 0, Math.PI * 2);
    ctx.fill();
  } else if (lateral) {
    const lado = direccion === "izquierda" ? -1 : 1;
    ctx.beginPath();
    ctx.arc(x + lado * 4.5, cy + 1, 1.3, 0, Math.PI * 2);
    ctx.fill();
  }

  // el Anillo en el pecho (no se ve de espaldas)
  if (direccion !== "arriba") {
    ctx.save();
    ctx.shadowColor = "#ffd24a";
    ctx.shadowBlur = 6;
    ctx.strokeStyle = "#ffd24a";
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.arc(x, y + 4 + rebote, 3, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }
}