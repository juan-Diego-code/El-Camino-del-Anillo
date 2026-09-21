// ---------- ESPERAR A QUE LAS IMÁGENES CARGUEN ----------
let imagenesListas = 0;
const TOTAL_IMAGENES = 2;
let imagenesCargadas = false;

function imagenCargada() {
  imagenesListas++;
  if (imagenesListas === TOTAL_IMAGENES) {
    imagenesCargadas = true;
  }
}

imgNave.onload = imagenCargada;
imgPiedra.onload = imagenCargada;

imgNave.onerror = () => console.error("No se pudo cargar assets/nave.svg (revisa la ruta)");
imgPiedra.onerror = () => console.error("No se pudo cargar assets/piedra.svg (revisa la ruta)");

// ---------- MENÚ DE INICIO ----------
const menuInicio = document.getElementById("menu-inicio");
const btnJugar = document.getElementById("btn-jugar");

btnJugar.addEventListener("click", () => {
  if (!imagenesCargadas) {
    alert("Las imágenes aún están cargando, espera un segundo e intenta de nuevo.");
    return;
  }
  menuInicio.style.display = "none";
  crearPiedras();
  gameLoop();
});

// ---------- PANTALLA DE GAME OVER ----------
const pantallaGameOver = document.getElementById("pantalla-gameover");
const puntajeFinal = document.getElementById("puntaje-final");
const btnReiniciar = document.getElementById("btn-reiniciar");

function mostrarPantallaGameOver() {
  puntajeFinal.textContent = "Puntaje: " + puntos;
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
  crearPiedras();

  pantallaGameOver.classList.add("oculto");
}

btnReiniciar.addEventListener("click", reiniciarJuego);

// ---------- PANTALLA DE VICTORIA ----------
const pantallaVictoria = document.getElementById("pantalla-victoria");
const puntajeVictoria = document.getElementById("puntaje-victoria");
const btnReiniciarVictoria = document.getElementById("btn-reiniciar-victoria");

function mostrarPantallaVictoria() {
  puntajeVictoria.textContent = "Puntaje final: " + puntos;
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
  crearPiedras();
}

// ---------- DIBUJAR PUNTAJE ----------
function dibujarPuntaje() {
  ctx.fillStyle = "#ffffff";
  ctx.font = "20px Arial";
  ctx.textAlign = "left";
  ctx.fillText("Puntos: " + puntos, 15, 30);
  ctx.fillText("Nivel: " + nivelActual, 15, 55);
}

// ---------- GAME LOOP ----------
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

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

  requestAnimationFrame(gameLoop);
}