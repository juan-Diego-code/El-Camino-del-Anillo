// ---------- ESPERAR A QUE LAS IMÁGENES CARGUEN ----------
let imagenesListas = 0;
const TOTAL_IMAGENES = 2;

function imagenCargada() {
  imagenesListas++;
  if (imagenesListas === TOTAL_IMAGENES) {
    crearPiedras();
    gameLoop();
  }
}

imgNave.onload = imagenCargada;
imgPiedra.onload = imagenCargada;

imgNave.onerror = () => console.error("No se pudo cargar assets/nave.svg (revisa la ruta)");
imgPiedra.onerror = () => console.error("No se pudo cargar assets/piedra.svg (revisa la ruta)");

// ---------- GAME LOOP ----------
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!juegoTerminado) {
    actualizarNave();
    actualizarPiedras();
    actualizarDisparos();
    detectarColisiones();
  }

  dibujarNave();
  dibujarPiedras();
  dibujarDisparos();
  dibujarFinDeJuego();

  requestAnimationFrame(gameLoop);
}