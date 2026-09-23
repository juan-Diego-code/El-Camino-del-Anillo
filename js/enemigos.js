//  TIPOS DE ENEMIGO 
const TIPOS_ENEMIGO = {
  jinete:     { vida: 4,  dano: 1, velocidad: 1.4, tamano: 30, color: "#2a2a33", detectar: 150 },
  orco:       { vida: 6,  dano: 1, velocidad: 1.7, tamano: 28, color: "#3d4a2f", detectar: 130 },
  orcoFuerte: { vida: 10, dano: 2, velocidad: 1.9, tamano: 32, color: "#5a1f1f", detectar: 160 },
  // el Ojo de Sauron no patrulla ni persigue: es inmóvil y ataca con pulsos de energía
  ojo:        { vida: 30, dano: 2, velocidad: 0,   tamano: 70, color: "#ff7a00", detectar: 0 }
};

// cada cuánto lanza un pulso el Ojo, y cuánto dura visible/activo el anillo de daño
const OJO_PULSO_INTERVALO = 2400;
const OJO_PULSO_DURACION = 500;
const OJO_PULSO_RADIO_MAX = 130;

//  ARREGLOS DE ENEMIGOS Y OBJETOS EN EL SUELO 
const enemigos = [];
const objetosSuelo = [];

//  CREAR UN ENEMIGO 
function crearEnemigo(tipo, x, y) {
  const base = TIPOS_ENEMIGO[tipo];
  enemigos.push({
    tipo, x, y,
    vida: base.vida,
    vidaMax: base.vida,
    dano: base.dano,
    velocidad: base.velocidad,
    tamano: base.tamano,
    color: base.color,
    detectar: base.detectar,
    dirPatrulla: Math.random() * Math.PI * 2,
    cambioPatrulla: 0,
    knockX: 0,
    knockY: 0,
    flashHasta: 0,
    pulsoHasta: tiempo + 1500,
    pulsoActivoHasta: 0,
    pulsoDanio: false
  });
}

//  APLICAR DAÑO A UN ENEMIGO (desde espada o flecha) 
function danarEnemigo(en, dano, dir) {
  en.vida -= dano;
  en.flashHasta = tiempo + 120;

  const largo = Math.hypot(dir.x, dir.y) || 1;
  en.knockX = (dir.x / largo) * 6;
  en.knockY = (dir.y / largo) * 6;

  if (en.vida <= 0) {
    puntos += 10;
    jugador.xp += 5;
    subirNivelSiCorresponde();
    avanzarMision("derrotar", en.tipo);

    if (en.tipo === "ojo") {
      mostrarPantallaVictoria();
      return;
    }

    const r = Math.random();
    if (r < 0.35) {
      objetosSuelo.push({ x: en.x, y: en.y, tipo: "flecha", cantidad: 3 });
    } else if (r < 0.5) {
      objetosSuelo.push({ x: en.x, y: en.y, tipo: "pocion" });
    }
  }
}

// ACTUALIZAR EL OJO DE SAURON (inmóvil, ataca con pulsos de energía)
function actualizarOjo(en) {
  en.knockX = 0;
  en.knockY = 0; // es demasiado masivo para retroceder

  if (tiempo >= en.pulsoHasta) {
    en.pulsoHasta = tiempo + OJO_PULSO_INTERVALO;
    en.pulsoActivoHasta = tiempo + OJO_PULSO_DURACION;
    en.pulsoDanio = false;
  }

  // mientras el anillo del pulso se expande, daña una sola vez si alcanza al jugador
  if (tiempo < en.pulsoActivoHasta && !en.pulsoDanio) {
    const progreso = 1 - (en.pulsoActivoHasta - tiempo) / OJO_PULSO_DURACION;
    const radioActual = progreso * OJO_PULSO_RADIO_MAX;
    const dist = distancia(jugador.x, jugador.y, en.x, en.y);
    if (dist < radioActual + jugador.ancho / 2) {
      const l = dist || 1;
      danarJugador(en.dano, { x: (jugador.x - en.x) / l, y: (jugador.y - en.y) / l });
      en.pulsoDanio = true;
    }
  }

  // contacto directo si el jugador se pega demasiado al Ojo
  const dist = distancia(jugador.x, jugador.y, en.x, en.y);
  if (dist < (en.tamano + jugador.ancho) / 2) {
    const l = dist || 1;
    danarJugador(en.dano, { x: (jugador.x - en.x) / l, y: (jugador.y - en.y) / l });
  }
}

//  ACTUALIZAR ENEMIGOS (patrulla, persecución y contacto) 
function actualizarEnemigos(dt) {
  for (let i = enemigos.length - 1; i >= 0; i--) {
    const en = enemigos[i];
    if (en.vida <= 0) { enemigos.splice(i, 1); continue; }

    if (en.tipo === "ojo") {
      actualizarOjo(en);
      continue;
    }

    // retroceso por golpe recibido
    if (en.knockX !== 0 || en.knockY !== 0) {
      const nx = en.x + en.knockX * dt;
      const ny = en.y + en.knockY * dt;
      const mitad = en.tamano * 0.6;
      if (!chocaConMapa(nx, en.y, mitad, mitad)) en.x = nx;
      if (!chocaConMapa(en.x, ny, mitad, mitad)) en.y = ny;

      en.knockX *= 0.85;
      en.knockY *= 0.85;
      if (Math.abs(en.knockX) < 0.15) en.knockX = 0;
      if (Math.abs(en.knockY) < 0.15) en.knockY = 0;
      continue;
    }

    const dx = jugador.x - en.x;
    const dy = jugador.y - en.y;
    const dist = Math.hypot(dx, dy) || 1;

    let vx, vy;
    if (dist < en.detectar) {
      // persigue al jugador
      vx = dx / dist;
      vy = dy / dist;
    } else {
      // patrulla en una dirección aleatoria que cambia cada tanto
      en.cambioPatrulla -= dt;
      if (en.cambioPatrulla <= 0) {
        en.dirPatrulla = Math.random() * Math.PI * 2;
        en.cambioPatrulla = 60 + Math.random() * 90;
      }
      vx = Math.sin(en.dirPatrulla);
      vy = -Math.cos(en.dirPatrulla);
    }

    const paso = en.velocidad * dt;
    const mitad = en.tamano * 0.6;
    const nx = en.x + vx * paso;
    const ny = en.y + vy * paso;
    if (!chocaConMapa(nx, en.y, mitad, mitad)) en.x = nx;
    else en.cambioPatrulla = 0; // si choca contra un muro patrullando, elige otra dirección pronto
    if (!chocaConMapa(en.x, ny, mitad, mitad)) en.y = ny;

    // contacto cuerpo a cuerpo con el jugador
    if (dist < (en.tamano + jugador.ancho) / 2) {
      danarJugador(en.dano, { x: dx / dist, y: dy / dist });
    }
  }
}

//  DIBUJAR ENEMIGOS 
//  DIBUJAR EL OJO DE SAURON (resplandor, iris llameante y pulso) 
function dibujarOjo(en) {
  ctx.save();
  ctx.translate(en.x, en.y);

  // anillo del pulso de energía, mientras está activo
  if (tiempo < en.pulsoActivoHasta) {
    const progreso = 1 - (en.pulsoActivoHasta - tiempo) / OJO_PULSO_DURACION;
    ctx.strokeStyle = "rgba(255, 90, 20, " + (1 - progreso) * 0.8 + ")";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(0, 0, progreso * OJO_PULSO_RADIO_MAX, 0, Math.PI * 2);
    ctx.stroke();
  }

  const danado = tiempo < en.flashHasta;
  const pulso = 1 + Math.sin(tiempo / 260) * 0.05;

  // resplandor exterior
  const brillo = ctx.createRadialGradient(0, 0, en.tamano * 0.15, 0, 0, en.tamano * 0.7 * pulso);
  brillo.addColorStop(0, "rgba(255, 170, 60, 0.55)");
  brillo.addColorStop(1, "rgba(255, 90, 20, 0)");
  ctx.fillStyle = brillo;
  ctx.beginPath();
  ctx.arc(0, 0, en.tamano * 0.7 * pulso, 0, Math.PI * 2);
  ctx.fill();

  // iris llameante
  ctx.fillStyle = danado ? "#ffffff" : "#ff7a00";
  ctx.strokeStyle = "#ffd24a";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.ellipse(0, 0, en.tamano * 0.45 * pulso, en.tamano * 0.32 * pulso, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // pupila vertical
  ctx.fillStyle = "#1a0500";
  ctx.beginPath();
  ctx.ellipse(0, 0, en.tamano * 0.07, en.tamano * 0.28 * pulso, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();

  // barra de vida (el jefe siempre la muestra, no solo cuando está herido)
  const w = en.tamano * 1.3;
  ctx.fillStyle = "#3a0f0f";
  ctx.fillRect(en.x - w / 2, en.y - en.tamano / 2 - 16, w, 6);
  ctx.fillStyle = "#ff7a00";
  ctx.fillRect(en.x - w / 2, en.y - en.tamano / 2 - 16, w * (en.vida / en.vidaMax), 6);
}

function dibujarEnemigos() {
  enemigos.forEach((en) => {
    if (en.tipo === "ojo") { dibujarOjo(en); return; }

    ctx.save();
    ctx.translate(en.x, en.y);
    const danado = tiempo < en.flashHasta;
    ctx.fillStyle = danado ? "#ffffff" : en.color;

    if (en.tipo === "jinete") {
      // silueta encapuchada triangular, un Jinete Negro
      ctx.beginPath();
      ctx.moveTo(0, -en.tamano / 2);
      ctx.lineTo(en.tamano / 2, en.tamano / 2);
      ctx.lineTo(-en.tamano / 2, en.tamano / 2);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "#8b1a1a";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.fillStyle = "#8b1a1a";
      ctx.beginPath();
      ctx.arc(0, -en.tamano / 8, en.tamano / 8, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // orco: círculo verde/rojo oscuro con ojos
      ctx.beginPath();
      ctx.arc(0, 0, en.tamano / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#1a1a1a";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.fillStyle = "#ff3b3b";
      ctx.beginPath();
      ctx.arc(-en.tamano / 6, -en.tamano / 8, 2, 0, Math.PI * 2);
      ctx.arc(en.tamano / 6, -en.tamano / 8, 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // barra de vida sobre el enemigo (solo si está herido)
    if (en.vida < en.vidaMax) {
      const w = en.tamano;
      ctx.fillStyle = "#3a0f0f";
      ctx.fillRect(en.x - w / 2, en.y - en.tamano / 2 - 10, w, 5);
      ctx.fillStyle = "#e5383b";
      ctx.fillRect(en.x - w / 2, en.y - en.tamano / 2 - 10, w * (en.vida / en.vidaMax), 5);
    }
  });
}

// ACTUALIZAR OBJETOS EN EL SUELO (recogida de flechas) 
function actualizarObjetosSuelo() {
  for (let i = objetosSuelo.length - 1; i >= 0; i--) {
    const o = objetosSuelo[i];
    if (distancia(jugador.x, jugador.y, o.x, o.y) < 20) {
      if (o.tipo === "flecha") {
        jugador.flechas = Math.min(jugador.flechasMax, jugador.flechas + o.cantidad);
        mostrarMensaje("+" + o.cantidad + " flechas élficas");
      } else if (o.tipo === "pocion") {
        jugador.pociones++;
        mostrarMensaje("Encontraste una poción de curación");
      } else if (o.tipo === "llave") {
        jugador.llaves++;
        mostrarMensaje("Encontraste la llave de Moria");
        avanzarMision("recolectar", "llave");
      }
      objetosSuelo.splice(i, 1);
    }
  }
}

//  DIBUJAR OBJETOS EN EL SUELO 
function dibujarObjetosSuelo() {
  objetosSuelo.forEach((o) => {
    ctx.save();
    ctx.translate(o.x, o.y + Math.sin(tiempo / 300 + o.x) * 2);

    if (o.tipo === "pocion") {
      ctx.fillStyle = "#5c3d1e";
      ctx.fillRect(-2, -8, 4, 4);
      ctx.fillStyle = "#8b1a1a";
      ctx.strokeStyle = "#f3e2b0";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(0, 1, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    } else if (o.tipo === "llave") {
      ctx.strokeStyle = "#ffd24a";
      ctx.lineWidth = 2.5;
      ctx.shadowColor = "#ffd24a";
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(-4, 0, 4, 0, Math.PI * 2);
      ctx.moveTo(0, 0);
      ctx.lineTo(8, 0);
      ctx.moveTo(5, 0);
      ctx.lineTo(5, 4);
      ctx.moveTo(8, 0);
      ctx.lineTo(8, 4);
      ctx.stroke();
    } else {
      ctx.strokeStyle = "#f5e6a8";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 6);
      ctx.lineTo(0, -6);
      ctx.stroke();
      ctx.fillStyle = "#ffd24a";
      ctx.beginPath();
      ctx.moveTo(0, -9);
      ctx.lineTo(-3, -4);
      ctx.lineTo(3, -4);
      ctx.closePath();
      ctx.fill();
    }

    ctx.restore();
  });
}