// ---------- NPCs DE LA ZONA ACTUAL ----------
let npcs = [];

// ---------- ESTADO DEL DIÁLOGO ACTIVO ----------
// null cuando no hay diálogo en curso
let dialogoActivo = null;
const VELOCIDAD_TEXTO = 28; // ms por letra

// ---------- CARGAR LOS NPCs DEFINIDOS EN EL MAPA DE LA ZONA ----------
function cargarNpcsDeZona() {
  npcs = (mapaActual.npcs || []).map((n) => ({ ...n }));
  dialogoActivo = null;
}

// ---------- BUSCAR UN NPC CERCA DEL JUGADOR ----------
function npcCercano() {
  let mejor = null;
  let mejorDist = 44;
  npcs.forEach((n) => {
    const d = distancia(jugador.x, jugador.y, n.x, n.y);
    if (d < mejorDist) { mejor = n; mejorDist = d; }
  });
  return mejor;
}

// ---------- INICIAR UN DIÁLOGO CON UN NPC ----------
function iniciarDialogo(npc) {
  dialogoActivo = {
    npc,
    indiceLinea: 0,
    indiceChar: 0,
    ultimoChar: tiempo,
    textoCompleto: false
  };
}

// ---------- REVELAR EL TEXTO LETRA POR LETRA ----------
function actualizarDialogo() {
  if (!dialogoActivo) return;
  const linea = dialogoActivo.npc.lineas[dialogoActivo.indiceLinea];

  if (dialogoActivo.indiceChar < linea.length) {
    if (tiempo - dialogoActivo.ultimoChar > VELOCIDAD_TEXTO) {
      dialogoActivo.indiceChar++;
      dialogoActivo.ultimoChar = tiempo;
    }
  } else {
    dialogoActivo.textoCompleto = true;
  }
}

// ---------- AVANZAR EL DIÁLOGO (tecla E) ----------
function avanzarDialogo() {
  if (!dialogoActivo) return;
  const linea = dialogoActivo.npc.lineas[dialogoActivo.indiceLinea];

  // si el texto todavía se está revelando, muéstralo completo de una vez
  if (dialogoActivo.indiceChar < linea.length) {
    dialogoActivo.indiceChar = linea.length;
    dialogoActivo.textoCompleto = true;
    return;
  }

  dialogoActivo.indiceLinea++;
  if (dialogoActivo.indiceLinea >= dialogoActivo.npc.lineas.length) {
    dialogoActivo = null;
  } else {
    dialogoActivo.indiceChar = 0;
    dialogoActivo.textoCompleto = false;
    dialogoActivo.ultimoChar = tiempo;
  }
}

// ---------- TECLA E: hablar con un NPC cercano o avanzar el diálogo ----------
document.addEventListener("keydown", (e) => {
  if (juegoTerminado) return;
  if (e.key.toLowerCase() === "e" && !e.repeat) {
    if (dialogoActivo) {
      avanzarDialogo();
    } else {
      const npc = npcCercano();
      if (npc) iniciarDialogo(npc);
    }
  }
});

// ---------- DIBUJAR LOS NPCs (figura simple con túnica y capucha) ----------
function dibujarNPCs() {
  npcs.forEach((n) => {
    ctx.save();
    ctx.translate(n.x, n.y);

    ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
    ctx.beginPath();
    ctx.ellipse(0, 15, 10, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = n.color;
    ctx.beginPath();
    ctx.moveTo(-9, 14);
    ctx.lineTo(9, 14);
    ctx.lineTo(5, -6);
    ctx.lineTo(-5, -6);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "#00000055";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = "#e6c79c";
    ctx.beginPath();
    ctx.arc(0, -12, 7, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    // "E" flotante cuando el jugador está cerca y puede interactuar
    if (!dialogoActivo && distancia(jugador.x, jugador.y, n.x, n.y) < 44) {
      ctx.fillStyle = "#ffd24a";
      ctx.font = "bold 13px " + FUENTE;
      ctx.textAlign = "center";
      ctx.fillText("E", n.x, n.y - 32 + Math.sin(tiempo / 250) * 3);
      ctx.textAlign = "left";
    }
  });
}

// ---------- DIBUJAR EL CUADRO DE DIÁLOGO ----------
function dibujarCuadroDialogo() {
  if (!dialogoActivo) return;

  const w = 680;
  const h = 120;
  const x = (canvas.width - w) / 2;
  const y = canvas.height - h - 20;

  ctx.fillStyle = "rgba(10, 10, 10, 0.88)";
  ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = "#ffd24a";
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, w, h);

  ctx.textAlign = "left";
  ctx.fillStyle = "#ffd24a";
  ctx.font = "bold 18px " + FUENTE;
  ctx.fillText(dialogoActivo.npc.nombre, x + 20, y + 32);

  const linea = dialogoActivo.npc.lineas[dialogoActivo.indiceLinea];
  const textoMostrado = linea.substring(0, dialogoActivo.indiceChar);
  ctx.fillStyle = "#f3e2b0";
  ctx.font = "17px " + FUENTE;
  ctx.fillText(textoMostrado, x + 20, y + 66, w - 40);

  if (dialogoActivo.textoCompleto) {
    ctx.fillStyle = "#cfd8dc";
    ctx.font = "italic 13px " + FUENTE;
    ctx.fillText("Presiona E para continuar", x + 20, y + h - 14);
  }
}