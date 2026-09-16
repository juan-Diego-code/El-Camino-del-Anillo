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
  
  // ---------- INICIO ----------
  crearPiedras();
  gameLoop();