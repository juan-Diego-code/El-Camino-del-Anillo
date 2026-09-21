// ---------- FUENTE DEL JUEGO ----------
const FUENTE = "Georgia, 'Times New Roman', serif";

// ---------- MISIONES POR ZONA ----------
const MISIONES = {
  comarca: { descripcion: "Derrota a los Jinetes Negros", tipo: "derrotar", objetivoTipo: "jinete", meta: 5 }
};

let mision = null;

function iniciarMision(id) {
  const m = MISIONES[id];
  if (!m) { mision = null; return; }
  mision = {
    descripcion: m.descripcion,
    tipo: m.tipo,
    objetivoTipo: m.objetivoTipo,
    progreso: 0,
    meta: m.meta,
    completa: false
  };
}

function avanzarMision(tipoEvento, dato) {
  if (!mision || mision.completa) return;
  if (mision.tipo === tipoEvento && dato === mision.objetivoTipo) {
    mision.progreso = Math.min(mision.meta, mision.progreso + 1);
    if (mision.progreso >= mision.meta) {
      mision.completa = true;
      mostrarMensaje("¡Misión cumplida! El camino hacia el este se abre.");
    }
  }
}

// ---------- CARGAR UNA ZONA ----------
function cargarZona(id) {
  zonaActual = id;
  mapaActual = GENERADORES_DE_MAPA[id]();
  colocarJugadorEnInicio();
  canvas.style.borderColor = temaActual().acento;
  actualizarCamara();

  enemigos.length = 0;
  objetosSuelo.length = 0;
  flechasJugador.length = 0;
  (mapaActual.spawnsEnemigos || []).forEach((s) => crearEnemigo(s.tipo, s.x, s.y));

  cargarNpcsDeZona();
  iniciarMision(id);
}

// ---------- INICIAR / REINICIAR PARTIDA ----------
function iniciarPartida() {
  puntos = 0;
  juegoTerminado = false;
  jugador.vidaMax = 6;
  jugador.vida = jugador.vidaMax;
  jugador.flechas = 5;
  jugador.pociones = 0;
  jugador.nivel = 1;
  jugador.xp = 0;
  jugador.xpSiguienteNivel = 20;
  jugador.danoExtra = 0;
  cargarZona("comarca");
  mostrarBanner();
}

// ---------- MENÚ DE INICIO ----------
const menuInicio = document.getElementById("menu-inicio");
const btnJugar = document.getElementById("btn-jugar");

btnJugar.addEventListener("click", () => {
  menuInicio.style.display = "none";
  iniciarPartida();
  requestAnimationFrame(gameLoop);
});

// ---------- PANTALLA DE GAME OVER ----------
const pantallaGameOver = document.getElementById("pantalla-gameover");
const puntajeFinal = document.getElementById("puntaje-final");
const btnReiniciar = document.getElementById("btn-reiniciar");

function mostrarPantallaGameOver() {
  juegoTerminado = true;
  puntajeFinal.textContent = "Caíste " + temaActual().lugar + ". Puntaje: " + puntos;
  pantallaGameOver.classList.remove("oculto");
}

btnReiniciar.addEventListener("click", () => {
  pantallaGameOver.classList.add("oculto");
  iniciarPartida();
});

// ---------- PANTALLA DE VICTORIA ----------
const pantallaVictoria = document.getElementById("pantalla-victoria");
const puntajeVictoria = document.getElementById("puntaje-victoria");
const btnReiniciarVictoria = document.getElementById("btn-reiniciar-victoria");

function mostrarPantallaVictoria() {
  juegoTerminado = true;
  puntajeVictoria.textContent = "La Tierra Media es libre. Puntaje final: " + puntos;
  pantallaVictoria.classList.remove("oculto");
}

btnReiniciarVictoria.addEventListener("click", () => {
  pantallaVictoria.classList.add("oculto");
  iniciarPartida();
});

// ---------- MENSAJE TEMPORAL (cuadro en la parte baja de la pantalla) ----------
const mensaje = { texto: "", hasta: 0 };

function mostrarMensaje(texto, ms = 2200) {
  mensaje.texto = texto;
  mensaje.hasta = performance.now() + ms;
}

function dibujarMensaje() {
  if (tiempo >= mensaje.hasta) return;

  const w = 520;
  const h = 44;
  const x = (canvas.width - w) / 2;
  const y = canvas.height - h - 26;

  ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
  ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = temaActual().acento;
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, w, h);

  ctx.fillStyle = "#f3e2b0";
  ctx.font = "italic 18px " + FUENTE;
  ctx.textAlign = "center";
  ctx.fillText(mensaje.texto, canvas.width / 2, y + 28);
  ctx.textAlign = "left";
}

// ---------- BANNER AL ENTRAR EN UNA ZONA (solo visual) ----------
const BANNER_DURACION = 2500; // milisegundos
let bannerHasta = 0;

function mostrarBanner() {
  bannerHasta = performance.now() + BANNER_DURACION;
}

function dibujarBanner() {
  const restante = bannerHasta - tiempo;
  if (restante <= 0) return;

  const tema = temaActual();
  ctx.globalAlpha = Math.min(1, restante / 700); // se desvanece al final
  ctx.textAlign = "center";

  ctx.fillStyle = "rgba(0, 0, 0, 0.55)";
  ctx.fillRect(0, canvas.height / 2 - 110, canvas.width, 100);

  ctx.fillStyle = tema.acento;
  ctx.font = "bold 44px " + FUENTE;
  ctx.fillText(tema.nombre, canvas.width / 2, canvas.height / 2 - 60);

  ctx.fillStyle = "#e8dcc0";
  ctx.font = "italic 20px " + FUENTE;
  ctx.fillText(tema.subtitulo, canvas.width / 2, canvas.height / 2 - 28);

  ctx.globalAlpha = 1;
  ctx.textAlign = "left";
}

// ---------- HUD ----------
function trazarCorazon(x, y, s) {
  ctx.beginPath();
  ctx.moveTo(x + s / 2, y + s * 0.9);
  ctx.bezierCurveTo(x - s * 0.2, y + s * 0.45, x + s * 0.1, y - s * 0.1, x + s / 2, y + s * 0.3);
  ctx.bezierCurveTo(x + s * 0.9, y - s * 0.1, x + s * 1.2, y + s * 0.45, x + s / 2, y + s * 0.9);
  ctx.closePath();
}

// llenado: 1 = completo, 0.5 = medio, 0 = vacío
function dibujarCorazon(x, y, s, llenado) {
  trazarCorazon(x, y, s);
  ctx.fillStyle = "#3a0f0f";
  ctx.fill();

  if (llenado > 0) {
    ctx.save();
    if (llenado < 1) {
      ctx.beginPath();
      ctx.rect(x - s, y - s, s * 1.5, s * 3); // solo la mitad izquierda
      ctx.clip();
    }
    trazarCorazon(x, y, s);
    ctx.fillStyle = "#e5383b";
    ctx.fill();
    ctx.restore();
  }

  trazarCorazon(x, y, s);
  ctx.strokeStyle = "#f3e2b0";
  ctx.lineWidth = 1.5;
  ctx.stroke();
}

function dibujarHUD() {
  const tema = temaActual();

  ctx.fillStyle = "rgba(0, 0, 0, 0.55)";
  ctx.fillRect(8, 8, 300, 150);
  ctx.strokeStyle = tema.acento;
  ctx.lineWidth = 2;
  ctx.strokeRect(8, 8, 300, 150);

  // corazones (cada corazón = 2 puntos de vida)
  const corazones = jugador.vidaMax / 2;
  for (let i = 0; i < corazones; i++) {
    const valor = jugador.vida - i * 2;
    const llenado = valor >= 2 ? 1 : valor === 1 ? 0.5 : 0;
    dibujarCorazon(20 + i * 22, 16, 18, llenado);
  }

  ctx.textAlign = "left";
  ctx.fillStyle = tema.acento;
  ctx.font = "bold 17px " + FUENTE;
  ctx.fillText(tema.nombre, 20, 61);

  const textoObjetivo = mision
    ? mision.descripcion + " (" + mision.progreso + "/" + mision.meta + ")"
    : tema.objetivo;
  ctx.fillStyle = "#e8dcc0";
  ctx.font = "italic 14px " + FUENTE;
  ctx.fillText(textoObjetivo, 20, 80);

  ctx.fillStyle = "#cfd8dc";
  ctx.font = "14px " + FUENTE;
  ctx.fillText("Flechas: " + jugador.flechas + "   Pociones: " + jugador.pociones, 20, 98);

  // nivel y barra de experiencia
  ctx.fillStyle = "#e8dcc0";
  ctx.font = "13px " + FUENTE;
  ctx.fillText("Nivel " + jugador.nivel, 20, 118);

  const bw = 250;
  const bh = 10;
  ctx.fillStyle = "#3a2f1a";
  ctx.fillRect(20, 126, bw, bh);
  ctx.fillStyle = "#7ddc5a";
  ctx.fillRect(20, 126, bw * (jugador.xp / jugador.xpSiguienteNivel), bh);
  ctx.strokeStyle = "#f3e2b0";
  ctx.lineWidth = 1;
  ctx.strokeRect(20, 126, bw, bh);
}

// ---------- DIBUJAR TODA LA ESCENA ----------
function dibujarEscena() {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // el mundo se dibuja desplazado por la cámara
  ctx.save();
  ctx.translate(-Math.round(camara.x), -Math.round(camara.y));
  dibujarMapa();
  dibujarObjetosSuelo();
  dibujarNPCs();
  dibujarEnemigos();
  dibujarFlechasJugador();
  dibujarJugador();
  dibujarEspada();
  ctx.restore();

  // la interfaz se dibuja fija sobre la pantalla
  dibujarHUD();
  dibujarMensaje();
  dibujarBanner();
  dibujarCuadroDialogo();
}

// ---------- GAME LOOP ----------
let ultimoTiempo = 0;

function gameLoop(ahora) {
  if (!ultimoTiempo) ultimoTiempo = ahora;
  // dt = 1 equivale a un frame a 60 fps (así el juego va igual en monitores de 144 Hz)
  const dt = Math.min((ahora - ultimoTiempo) / (1000 / 60), 3);
  ultimoTiempo = ahora;
  tiempo = ahora;

  if (!juegoTerminado) {
    actualizarJugador(dt);
    actualizarEnemigos(dt);
    actualizarFlechasJugador(dt);
    actualizarObjetosSuelo();
    actualizarDialogo();
    actualizarCamara();
    detectarColisiones();
  }

  dibujarEscena();
  requestAnimationFrame(gameLoop);
}

// ---------- ESCENA INICIAL (se ve detrás del menú) ----------
cargarZona("comarca");
dibujarEscena();