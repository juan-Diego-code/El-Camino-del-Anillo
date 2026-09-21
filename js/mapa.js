// ---------- LEYENDA DE TILES ----------
//  .  pasto            f  pasto con flores
//  c  camino           p  puente de madera
//  E  salida de zona   F  campo de cultivo
//  T  árbol (sólido)   #  valla (sólido)
//  ~  agua (sólido)    H  colina de casa hobbit (sólido)
//  D  puerta de casa hobbit (sólido)
const TILES_SOLIDOS = new Set(["#", "T", "~", "H", "D"]);

// ---------- RUIDO DETERMINISTA (mismo mapa y mismos detalles siempre) ----------
function ruido(x, y) {
  let h = Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

// ---------- MAPA ACTUAL Y CÁMARA ----------
let mapaActual = null;
const camara = { x: 0, y: 0 };

function actualizarCamara() {
  camara.x = limitar(jugador.x - canvas.width / 2, 0, mapaActual.ancho - canvas.width);
  camara.y = limitar(jugador.y - canvas.height / 2, 0, mapaActual.alto - canvas.height);
}

// ---------- CREAR EL MAPA DE LA COMARCA (40 x 30 tiles) ----------
function crearMapaComarca() {
  const cols = 40;
  const filas = 30;
  const T = TAMANO_TILE;

  // arreglo de arreglos: tiles[fila][columna]
  const tiles = [];
  for (let y = 0; y < filas; y++) tiles.push(new Array(cols).fill("."));

  const poner = (x, y, c) => {
    if (x >= 0 && x < cols && y >= 0 && y < filas) tiles[y][x] = c;
  };
  const rect = (x0, y0, x1, y1, c) => {
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) poner(x, y, c);
  };

  // bosque (noreste y sureste) y flores sueltas
  for (let y = 0; y < filas; y++) {
    for (let x = 0; x < cols; x++) {
      const r = ruido(x, y);
      const enBosque = (x >= 28 && y <= 10) || (x >= 29 && y >= 19);
      if (r < (enBosque ? 0.38 : 0.06)) tiles[y][x] = "T";
      else if (r > 0.93) tiles[y][x] = "f";
    }
  }

  // borde de árboles alrededor de todo el mapa
  for (let x = 0; x < cols; x++) { poner(x, 0, "T"); poner(x, filas - 1, "T"); }
  for (let y = 0; y < filas; y++) { poner(0, y, "T"); poner(cols - 1, y, "T"); }

  // estanque (noroeste)
  rect(8, 3, 11, 5, "~");
  poner(8, 3, "."); poner(11, 3, "."); poner(8, 5, "."); poner(11, 5, ".");

  // río de 2 tiles de ancho que cruza el mapa de norte a sur
  rect(26, 0, 27, filas - 1, "~");

  // campo cultivado con valla
  rect(4, 21, 15, 27, "#");
  rect(5, 22, 14, 26, "F");

  // casas hobbit (cada una ocupa 3 x 2 tiles) con su caminito hasta el camino principal
  const casas = [{ x: 5, y: 6 }, { x: 12, y: 7 }, { x: 19, y: 5 }];
  casas.forEach((c) => {
    rect(c.x - 1, c.y - 1, c.x + 3, c.y + 2, "."); // despejar alrededor
    rect(c.x, c.y, c.x + 2, c.y + 1, "H");
    poner(c.x + 1, c.y + 1, "D");
    for (let y = c.y + 2; y <= 14; y++) poner(c.x + 1, y, "c");
  });

  // camino principal (2 tiles de ancho) con puente sobre el río
  for (let x = 1; x < cols; x++) {
    for (let y = 14; y <= 15; y++) poner(x, y, x === 26 || x === 27 ? "p" : "c");
  }

  // camino hacia el campo (abre un hueco en la valla)
  for (let y = 16; y <= 21; y++) { poner(9, y, "c"); poner(10, y, "c"); }

  // salida hacia la siguiente zona (borde este)
  poner(cols - 1, 14, "E");
  poner(cols - 1, 15, "E");

  return {
    id: "comarca",
    cols: cols,
    filas: filas,
    tiles: tiles,
    casas: casas,
    ancho: cols * T,
    alto: filas * T,
    inicio: { x: 6 * T + T / 2, y: 15 * T },
    salidas: [{ x: (cols - 1) * T, y: 14 * T, ancho: T, alto: 2 * T, destino: "moria" }]
  };
}

// una función generadora por zona (Moria y Mordor se agregan en la Fase 4)
const GENERADORES_DE_MAPA = {
  comarca: crearMapaComarca
};

// ---------- DIBUJAR UN TILE ----------
function dibujarPasto(px, py, x, y) {
  const T = TAMANO_TILE;
  ctx.fillStyle = ruido(x * 3 + 1, y * 7 + 2) > 0.5 ? "#2f6b3a" : "#2b6435";
  ctx.fillRect(px, py, T, T);

  if (ruido(x + 9, y + 4) > 0.7) {
    ctx.strokeStyle = "#3f8a4a";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(px + 12, py + 26); ctx.lineTo(px + 10, py + 19);
    ctx.moveTo(px + 15, py + 26); ctx.lineTo(px + 17, py + 18);
    ctx.stroke();
  }
}

function dibujarTile(c, px, py, x, y) {
  const T = TAMANO_TILE;

  if (c === "c" || c === "E") {
    ctx.fillStyle = ruido(x, y) > 0.5 ? "#a68a5b" : "#9c8153";
    ctx.fillRect(px, py, T, T);
    ctx.fillStyle = "#8c7349";
    ctx.fillRect(px + ruido(x, y + 1) * 28 + 4, py + ruido(x + 2, y) * 28 + 4, 3, 2);
    ctx.fillRect(px + ruido(x + 5, y + 3) * 28 + 4, py + ruido(x + 1, y + 7) * 28 + 4, 3, 2);

    if (c === "E") {
      // flecha dorada que late, indica la salida
      const a = 0.35 + 0.25 * Math.sin(tiempo / 300);
      ctx.fillStyle = "rgba(255, 210, 74, " + a + ")";
      ctx.beginPath();
      ctx.moveTo(px + 12, py + 10);
      ctx.lineTo(px + 30, py + 20);
      ctx.lineTo(px + 12, py + 30);
      ctx.closePath();
      ctx.fill();
    }
    return;
  }

  if (c === "~" || c === "p") {
    ctx.fillStyle = "#25599a";
    ctx.fillRect(px, py, T, T);
    ctx.strokeStyle = "rgba(160, 210, 255, 0.5)";
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 2; i++) {
      const yy = py + 12 + i * 16 + Math.sin(tiempo / 500 + x * 0.7 + i) * 2;
      ctx.beginPath();
      ctx.moveTo(px + 6, yy);
      ctx.quadraticCurveTo(px + T / 2, yy - 4, px + T - 6, yy);
      ctx.stroke();
    }

    if (c === "p") {
      // puente: tablones y barandas donde hay agua arriba o abajo
      ctx.fillStyle = "#8b5e34";
      ctx.fillRect(px, py, T, T);
      ctx.strokeStyle = "#5c3d1e";
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let k = 10; k < T; k += 10) { ctx.moveTo(px + k, py); ctx.lineTo(px + k, py + T); }
      ctx.stroke();
      ctx.fillStyle = "#4a2f16";
      if (mapaActual.tiles[y - 1] && mapaActual.tiles[y - 1][x] === "~") ctx.fillRect(px, py, T, 5);
      if (mapaActual.tiles[y + 1] && mapaActual.tiles[y + 1][x] === "~") ctx.fillRect(px, py + T - 5, T, 5);
    }
    return;
  }

  if (c === "F") {
    ctx.fillStyle = "#5e4126";
    ctx.fillRect(px, py, T, T);
    ctx.strokeStyle = "#3f2b17";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(px, py + 10); ctx.lineTo(px + T, py + 10);
    ctx.moveTo(px, py + 30); ctx.lineTo(px + T, py + 30);
    ctx.stroke();
    ctx.fillStyle = "#6cc04a";
    for (let k = 0; k < 3; k++) {
      ctx.beginPath(); ctx.arc(px + 8 + k * 12, py + 7, 3, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(px + 8 + k * 12, py + 27, 3, 0, Math.PI * 2); ctx.fill();
    }
    return;
  }

  // todo lo demás se dibuja sobre pasto
  dibujarPasto(px, py, x, y);

  if (c === "f") {
    const colores = ["#ffd24a", "#f5f0e0", "#e58ab0"];
    for (let k = 0; k < 3; k++) {
      ctx.fillStyle = colores[Math.floor(ruido(x + k, y + 5) * 3)];
      ctx.beginPath();
      ctx.arc(px + 8 + ruido(x, y + k) * 24, py + 8 + ruido(x + k, y) * 24, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (c === "T") {
    ctx.fillStyle = "#5b3a1e";
    ctx.fillRect(px + 16, py + 24, 8, 14);
    ctx.fillStyle = "#1f5a2a";
    ctx.beginPath(); ctx.arc(px + 20, py + 20, 18, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#2f7d3a";
    ctx.beginPath(); ctx.arc(px + 15, py + 15, 8, 0, Math.PI * 2); ctx.fill();
  } else if (c === "#") {
    ctx.fillStyle = "#8b5e34";
    ctx.fillRect(px, py + 12, T, 5);
    ctx.fillRect(px, py + 25, T, 5);
    ctx.fillStyle = "#6b4423";
    ctx.fillRect(px + 17, py + 8, 6, 26);
  }
}

// ---------- DIBUJAR UNA CASA HOBBIT (colina redonda con puerta) ----------
function dibujarCasa(c) {
  const T = TAMANO_TILE;
  const cx = (c.x + 1.5) * T;
  const base = (c.y + 2) * T;

  ctx.fillStyle = "#4c9a4a";
  ctx.strokeStyle = "#2b6a30";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.ellipse(cx, base, 1.5 * T - 2, 2 * T - 4, 0, Math.PI, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // ventanas redondas
  ctx.fillStyle = "#f3d98b";
  ctx.strokeStyle = "#7a5c3a";
  [-1, 1].forEach((s) => {
    ctx.beginPath();
    ctx.arc(cx + s * 38, base - 32, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  });

  // puerta redonda con marco dorado
  ctx.fillStyle = "#2a6a34";
  ctx.strokeStyle = "#ffd24a";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(cx, base - 16, 15, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#ffd24a";
  ctx.beginPath();
  ctx.arc(cx + 5, base - 16, 2.5, 0, Math.PI * 2);
  ctx.fill();
}

// ---------- DIBUJAR EL MAPA (solo lo que se ve en pantalla) ----------
// se llama con el contexto ya desplazado por la cámara
function dibujarMapa() {
  const m = mapaActual;
  const T = TAMANO_TILE;

  const c0 = Math.max(0, Math.floor(camara.x / T));
  const c1 = Math.min(m.cols - 1, Math.floor((camara.x + canvas.width) / T));
  const f0 = Math.max(0, Math.floor(camara.y / T));
  const f1 = Math.min(m.filas - 1, Math.floor((camara.y + canvas.height) / T));

  for (let y = f0; y <= f1; y++) {
    for (let x = c0; x <= c1; x++) {
      dibujarTile(m.tiles[y][x], x * T, y * T, x, y);
    }
  }
  m.casas.forEach(dibujarCasa);
}