// ---------- DISTANCIA ENTRE DOS PUNTOS ----------
function distancia(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  }
  
  // ---------- ESTADO DEL JUEGO ----------
  let juegoTerminado = false;
  
  // ---------- DETECTAR TODAS LAS COLISIONES ----------
  function detectarColisiones() {
    if (juegoTerminado) return;
  
    // disparo vs piedra
    for (let i = disparos.length - 1; i >= 0; i--) {
      const d = disparos[i];
  
      for (let j = piedras.length - 1; j >= 0; j--) {
        const p = piedras[j];
        const radioPiedra = p.tamano / 2;
  
        if (distancia(d.x, d.y, p.x, p.y) < radioPiedra) {
          disparos.splice(i, 1);
          piedras.splice(j, 1);
          break; // este disparo ya se usó, pasar al siguiente
        }
      }
    }
  
    // nave vs piedra
    const radioNave = nave.tamano / 2;
    for (const p of piedras) {
      const radioPiedra = p.tamano / 2;
      if (distancia(nave.x, nave.y, p.x, p.y) < radioNave + radioPiedra) {
        juegoTerminado = true;
        break;
      }
    }
  }
  
  // ---------- MOSTRAR MENSAJE DE FIN DE JUEGO ----------
  function dibujarFinDeJuego() {
    if (!juegoTerminado) return;
  
    ctx.fillStyle = "#ffffff";
    ctx.font = "40px Arial";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
  }
  