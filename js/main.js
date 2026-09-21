// ---------- FUENTE DEL JUEGO ----------
const FUENTE = "Georgia, 'Times New Roman', serif";

// ---------- ESPERAR A QUE LAS IMÁGENES CARGUEN ----------
const todasLasImagenes = [imgNave, ...imagenesEnemigos];
const TOTAL_IMAGENES = todasLasImagenes.length;
let imagenesListas = 0;
let imagenesCargadas = false;

function imagenCargada() {
  imagenesListas++;
  if (imagenesListas === TOTAL_IMAGENES) {
    imagenesCargadas = true;
  }
}

todasLasImagenes.forEach((img) => {
  if (img.complete && img.naturalWidth > 0) {
    imagenCargada();
  } else {
    img.onload = imagenCargada;
  }
  img.onerror = () => console.error("No se pudo cargar " + img.src + " (revisa la ruta)");
});

// ---------- TEMA VISUAL DEL NIVEL ----------
function aplicarTema() {
  canvas.style.borderColor = temaActual().acento;
}

// ---------- FONDOS POR NIVEL ----------
let cuadro = 0; // contador de frames, para animaciones del fondo

function fondoComarca() {
  // estrellas
  ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
  for (let i = 0; i < 20; i++) {
    ctx.fillRect((i * 97) % 800, (i * 53) % 250, 1.5, 1.5);
  }

  // colinas
  ctx.fillStyle = "#17401b";
  ctx.beginPath();
  ctx.ellipse(140, 620, 280, 120, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#1c4a20";
  ctx.beginPath();
  ctx.ellipse(560, 640, 340, 130, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#245a28";
  ctx.beginPath();
  ctx.ellipse(800, 620, 180, 90, 0, 0, Math.PI * 2);
  ctx.fill();

}

function fondoMoria() {
  // estalactitas (arriba) y estalagmitas (abajo)
  for (let i = 0; i < 17; i++) {
    const x = i * 50;
    const hArriba = 30 + ((i * 37) % 50);
    const hAbajo = 25 + ((i * 53) % 45);

    ctx.fillStyle = "#121826";
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + 50, 0);
    ctx.lineTo(x + 25, hArriba);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#101623";
    ctx.beginPath();
    ctx.moveTo(x, canvas.height);
    ctx.lineTo(x + 50, canvas.height);
    ctx.lineTo(x + 25, canvas.height - hAbajo);
    ctx.closePath();
    ctx.fill();
  }
}

function fondoMordor() {
  // resplandor rojo que late suavemente
  const pulso = 0.25 + 0.1 * Math.sin(cuadro * 0.03);
  const brillo = ctx.createRadialGradient(400, 0, 10, 400, 0, 500);
  brillo.addColorStop(0, "rgba(255, 90, 20, " + pulso + ")");
  brillo.addColorStop(1, "rgba(255, 90, 20, 0)");
  ctx.fillStyle = brillo;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // montañas
  const picos = [
    [0, 540], [80, 490], [150, 530], [240, 460], [320, 520], [400, 480],
    [480, 535], [570, 455], [660, 515], [740, 485], [800, 530]
  ];

  ctx.fillStyle = "#0a0202";
  ctx.beginPath();
  ctx.moveTo(0, canvas.height);
  picos.forEach(([x, y]) => ctx.lineTo(x, y));
  ctx.lineTo(canvas.width, canvas.height);
  ctx.closePath();
  ctx.fill();

  // borde de lava en las cumbres
  ctx.strokeStyle = "rgba(255, 74, 42, 0.5)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  picos.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
  ctx.stroke();

  // brasas que suben
  ctx.fillStyle = "rgba(255, 140, 40, 0.6)";
  for (let i = 0; i < 25; i++) {
    const vel = 0.4 + (i % 4) * 0.2;
    const x = (i * 97 + Math.sin(cuadro * 0.02 + i) * 15 + 800) % 800;
    const y = canvas.height - ((i * 53 + cuadro * vel) % canvas.height);
    ctx.fillRect(x, y, 2, 2);
  }
}

function dibujarFondo() {
  const tema = temaActual();

  const degradado = ctx.createLinearGradient(0, 0, 0, canvas.height);
  degradado.addColorStop(0, tema.fondoArriba);
  degradado.addColorStop(1, tema.fondoAbajo);
  ctx.fillStyle = degradado;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (nivelActual === 1) fondoComarca();
  else if (nivelActual === 2) fondoMoria();
  else fondoMordor();
}

// ---------- MENÚ DE INICIO ----------
const menuInicio = document.getElementById("menu-inicio");
const btnJugar = document.getElementById("btn-jugar");

btnJugar.addEventListener("click", () => {
  if (!imagenesCargadas) {
    alert("Las imágenes aún están cargando, espera un segundo e intenta de nuevo.");
    return;
  }
  menuInicio.style.display = "none";
  aplicarTema();
  mostrarBannerNivel();
  crearPiedras();
  gameLoop();
});

// ---------- PANTALLA DE GAME OVER ----------
const pantallaGameOver = document.getElementById("pantalla-gameover");
const puntajeFinal = document.getElementById("puntaje-final");
const btnReiniciar = document.getElementById("btn-reiniciar");

function mostrarPantallaGameOver() {
  puntajeFinal.textContent = "Caíste " + temaActual().lugar + ". Puntaje: " + puntos;
  pantallaGameOver.classList.remove("oculto");
}

function reiniciarJuego() {
  puntos = 0;
  nivelActual = 1;
  juegoTerminado = false;

  nave.x = canvas.width / 2;
  nave.y = canvas.height / 2;
  nave.angulo = 0;

  piedras.length = 0;
  disparos.length = 0;
  aplicarTema();
  mostrarBannerNivel();
  crearPiedras();

  pantallaGameOver.classList.add("oculto");
}

btnReiniciar.addEventListener("click", reiniciarJuego);

// ---------- PANTALLA DE VICTORIA ----------
const pantallaVictoria = document.getElementById("pantalla-victoria");
const puntajeVictoria = document.getElementById("puntaje-victoria");
const btnReiniciarVictoria = document.getElementById("btn-reiniciar-victoria");

function mostrarPantallaVictoria() {
  puntajeVictoria.textContent = "La Tierra Media es libre. Puntaje final: " + puntos;
  pantallaVictoria.classList.remove("oculto");
}

btnReiniciarVictoria.addEventListener("click", () => {
  pantallaVictoria.classList.add("oculto");
  reiniciarJuego();
});

// ---------- AVANZAR DE NIVEL ----------
function avanzarNivel() {
  if (nivelActual >= PIEDRAS_POR_NIVEL.length) {
    juegoTerminado = true;
    mostrarPantallaVictoria();
    return;
  }
  nivelActual++;
  aplicarTema();
  mostrarBannerNivel();
  crearPiedras();
}

// ---------- BANNER DE NIVEL (solo visual, no afecta el juego) ----------
const BANNER_DURACION = 150; // frames (unos 2.5 segundos)
let bannerFrames = 0;

function mostrarBannerNivel() {
  bannerFrames = BANNER_DURACION;
}

function dibujarBanner() {
  if (bannerFrames <= 0) return;

  const tema = temaActual();
  ctx.globalAlpha = Math.min(1, bannerFrames / 45); // se desvanece al final
  ctx.textAlign = "center";

  ctx.fillStyle = tema.acento;
  ctx.font = "bold 44px " + FUENTE;
  ctx.fillText(tema.nombre, canvas.width / 2, canvas.height / 2 - 60);

  ctx.fillStyle = "#e8dcc0";
  ctx.font = "italic 20px " + FUENTE;
  ctx.fillText(
    "Nivel " + nivelActual + " de " + PIEDRAS_POR_NIVEL.length + ". Enemigos: " + tema.enemigo,
    canvas.width / 2,
    canvas.height / 2 - 25
  );

  ctx.globalAlpha = 1;
  ctx.textAlign = "left";
  bannerFrames--;
}

// ---------- DIBUJAR PUNTAJE ----------
function dibujarPuntaje() {
  ctx.fillStyle = "#f3e2b0";
  ctx.font = "20px " + FUENTE;
  ctx.textAlign = "left";
  ctx.fillText("Puntos: " + puntos, 15, 30);
  ctx.fillText("Nivel " + nivelActual + ": " + temaActual().nombre, 15, 55);
}

// ---------- GAME LOOP ----------
function gameLoop() {
  cuadro++;
  dibujarFondo(); // reemplaza al clearRect: pinta todo el canvas

  if (!juegoTerminado) {
    actualizarNave();
    actualizarPiedras();
    actualizarDisparos();
    detectarColisiones();

    if (piedras.length === 0) {
      avanzarNivel();
    }
  }

  dibujarNave();
  dibujarPiedras();
  dibujarDisparos();
  dibujarPuntaje();
  dibujarBanner();

  requestAnimationFrame(gameLoop);
}

// ---------- FONDO INICIAL (se ve detrás del menú) ----------
aplicarTema();
dibujarFondo();