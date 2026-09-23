//  PARÁMETROS DE COMBATE 
const ESPADA_COOLDOWN = 380; // ms entre golpes
const ESPADA_ALCANCE = 28;   // distancia del centro del golpe respecto al jugador
const ESPADA_RADIO = 22;     // radio de impacto del golpe
const ESPADA_DANO = 2;
const ESPADA_DURACION = 160; // ms que se ve el arco de la espada

const FLECHA_COOLDOWN = 260;
const FLECHA_VELOCIDAD = 6.5;
const FLECHA_DANO = 1;
const FLECHA_RADIO = 6;
const FLECHA_ALCANCE_MAX = 480;

jugador.cooldownEspada = 0;
jugador.cooldownFlecha = 0;
jugador.ataqueHasta = 0;

//  ARREGLO DE FLECHAS DISPARADAS POR EL JUGADOR 
const flechasJugador = [];

//  ATAQUE CUERPO A CUERPO CON LA ESPADA 
function atacarEspada() {
  if (tiempo < jugador.cooldownEspada) return;
  jugador.cooldownEspada = tiempo + ESPADA_COOLDOWN;
  jugador.ataqueHasta = tiempo + ESPADA_DURACION;

  const v = vectorDireccion(jugador.direccion);
  const cx = jugador.x + v.x * ESPADA_ALCANCE;
  const cy = jugador.y + v.y * ESPADA_ALCANCE;

  enemigos.forEach((en) => {
    if (en.vida <= 0) return;
    if (distancia(cx, cy, en.x, en.y) < ESPADA_RADIO + en.tamano / 2) {
      danarEnemigo(en, ESPADA_DANO + jugador.danoExtra, v);
    }
  });
}

//  DISPARO DE FLECHA ÉLFICA 
function dispararFlechaJugador() {
  if (tiempo < jugador.cooldownFlecha) return;
  if (jugador.flechas <= 0) {
    mostrarMensaje("No te quedan flechas élficas");
    return;
  }
  jugador.cooldownFlecha = tiempo + FLECHA_COOLDOWN;
  jugador.flechas--;

  const v = vectorDireccion(jugador.direccion);
  flechasJugador.push({
    x: jugador.x + v.x * 16,
    y: jugador.y + v.y * 16,
    vx: v.x * FLECHA_VELOCIDAD,
    vy: v.y * FLECHA_VELOCIDAD,
    dano: FLECHA_DANO + jugador.danoExtra,
    recorrido: 0
  });
}

//  USAR UNA POCIÓN DE CURACIÓN (tecla Q) 
function usarPocion() {
  if (jugador.pociones <= 0) {
    mostrarMensaje("No tienes pociones");
    return;
  }
  if (jugador.vida >= jugador.vidaMax) {
    mostrarMensaje("Ya tienes la vida completa");
    return;
  }
  jugador.pociones--;
  jugador.vida = Math.min(jugador.vidaMax, jugador.vida + 2);
  mostrarMensaje("Bebes una poción y recuperas un corazón");
}

//  TECLAS DE COMBATE (espacio = espada, X = flecha, Q = poción) 
document.addEventListener("keydown", (e) => {
  if (juegoTerminado || dialogoActivo) return;
  if (e.code === "Space" && !e.repeat) atacarEspada();
  if (e.key.toLowerCase() === "x" && !e.repeat) dispararFlechaJugador();
  if (e.key.toLowerCase() === "q" && !e.repeat) usarPocion();
});

//  ACTUALIZAR FLECHAS DEL JUGADOR 
function actualizarFlechasJugador(dt) {
  for (let i = flechasJugador.length - 1; i >= 0; i--) {
    const f = flechasJugador[i];
    const nx = f.x + f.vx * dt;
    const ny = f.y + f.vy * dt;

    if (chocaConMapa(nx, ny, 4, 4)) {
      flechasJugador.splice(i, 1);
      continue;
    }

    f.x = nx;
    f.y = ny;
    f.recorrido += Math.hypot(f.vx, f.vy) * dt;

    let impacto = false;
    for (const en of enemigos) {
      if (en.vida <= 0) continue;
      if (distancia(f.x, f.y, en.x, en.y) < FLECHA_RADIO + en.tamano / 2) {
        danarEnemigo(en, f.dano, { x: f.vx, y: f.vy });
        impacto = true;
        break;
      }
    }

    if (impacto || f.recorrido > FLECHA_ALCANCE_MAX) {
      flechasJugador.splice(i, 1);
    }
  }
}

// DIBUJAR FLECHAS DEL JUGADOR 
function dibujarFlechasJugador() {
  flechasJugador.forEach((f) => {
    const ang = Math.atan2(f.vx, -f.vy);
    ctx.save();
    ctx.translate(f.x, f.y);
    ctx.rotate(ang);
    ctx.shadowColor = "#ffd24a";
    ctx.shadowBlur = 6;
    ctx.strokeStyle = "#f5e6a8";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 7);
    ctx.lineTo(0, -7);
    ctx.stroke();
    ctx.fillStyle = "#ffd24a";
    ctx.beginPath();
    ctx.moveTo(0, -10);
    ctx.lineTo(-3, -5);
    ctx.lineTo(3, -5);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  });
}

//  DIBUJAR EL ARCO DE LA ESPADA (mientras dura el golpe) 
function dibujarEspada() {
  if (tiempo >= jugador.ataqueHasta) return;

  const v = vectorDireccion(jugador.direccion);
  const ang = Math.atan2(v.x, -v.y);

  ctx.save();
  ctx.translate(jugador.x, jugador.y);
  ctx.rotate(ang);
  ctx.strokeStyle = "#e5e5e5";
  ctx.lineWidth = 3;
  ctx.shadowColor = "#ffffff";
  ctx.shadowBlur = 4;
  ctx.beginPath();
  ctx.arc(0, -12, 24, -1.0, 1.0);
  ctx.stroke();
  ctx.restore();
}