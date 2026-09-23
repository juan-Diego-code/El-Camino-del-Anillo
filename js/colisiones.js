// DISTANCIA ENTRE DOS PUNTOS 
function distancia(x1, y1, x2, y2) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

// ESTADO DEL JUEGO 
let juegoTerminado = false;

// QUÉ TILE HAY EN UN PUNTO DEL MAPA 
// fuera del mapa cuenta como muro
function tileEn(px, py) {
  const x = Math.floor(px / TAMANO_TILE);
  const y = Math.floor(py / TAMANO_TILE);
  if (x < 0 || y < 0 || x >= mapaActual.cols || y >= mapaActual.filas) return "#";
  return mapaActual.tiles[y][x];
}

//  ¿UNA CAJA CENTRADA EN (cx, cy) CHOCA CON ALGÚN TILE SÓLIDO?
// la caja es más chica que un tile, así que basta revisar sus 4 esquinas
function chocaConMapa(cx, cy, w, h) {
  const x0 = cx - w / 2;
  const x1 = cx + w / 2 - 0.01;
  const y0 = cy - h / 2;
  const y1 = cy + h / 2 - 0.01;

  return (
    TILES_SOLIDOS.has(tileEn(x0, y0)) ||
    TILES_SOLIDOS.has(tileEn(x1, y0)) ||
    TILES_SOLIDOS.has(tileEn(x0, y1)) ||
    TILES_SOLIDOS.has(tileEn(x1, y1))
  );
}

//  DETECTAR TODAS LAS COLISIONES 
function detectarColisiones() {
  if (juegoTerminado) return;

  // jugador vs salidas de zona
  const izq = jugador.x - jugador.ancho / 2;
  const der = jugador.x + jugador.ancho / 2;
  const arr = jugador.y - jugador.alto / 2;
  const aba = jugador.y + jugador.alto / 2;

  for (const s of mapaActual.salidas) {
    const tocaSalida = izq < s.x + s.ancho && der > s.x && arr < s.y + s.alto && aba > s.y;
    if (!tocaSalida) continue;

    if (!mision || !mision.completa) {
      mostrarMensaje("El camino sigue cerrado. Misión: " + (mision ? mision.descripcion : "?"));
    } else if (GENERADORES_DE_MAPA[s.destino]) {
      cargarZona(s.destino);
      mostrarBanner();
    } else {
      const nombreDestino = ZONAS[s.destino] ? ZONAS[s.destino].nombre : "lo desconocido";
      mostrarMensaje("Más allá aguarda " + nombreDestino + "... (próximamente)");
    }
  }

  // lava de Mordor: quema al Portador si se para sobre ella
  if (tileEn(jugador.x, jugador.y) === "V") {
    danarJugador(1, { x: 0, y: 0 }); // danarJugador ya respeta la invulnerabilidad temporal
  }
}