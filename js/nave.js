// ---------- IMAGEN DE LA NAVE ----------
const imgNave = new Image();
imgNave.src = "assets/images/nave.svg";

// ---------- OBJETO NAVE ----------
const nave = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  angulo: 0,          // en radianes, 0 = apuntando hacia arriba
  velocidadGiro: 0.06,
  velocidad: 4,
  tamano: 30
};

// ---------- ACTUALIZAR NAVE (movimiento según teclas) ----------
function actualizarNave() {
  if (teclas["ArrowLeft"]) nave.angulo -= nave.velocidadGiro;
  if (teclas["ArrowRight"]) nave.angulo += nave.velocidadGiro;

  if (teclas["ArrowUp"]) {
    nave.x += Math.sin(nave.angulo) * nave.velocidad;
    nave.y -= Math.cos(nave.angulo) * nave.velocidad;
  }
  if (teclas["ArrowDown"]) {
    nave.x -= Math.sin(nave.angulo) * nave.velocidad;
    nave.y += Math.cos(nave.angulo) * nave.velocidad;
  }

  // que la nave no se salga del canvas (aparece del otro lado)
  if (nave.x < 0) nave.x = canvas.width;
  if (nave.x > canvas.width) nave.x = 0;
  if (nave.y < 0) nave.y = canvas.height;
  if (nave.y > canvas.height) nave.y = 0;
}

// ---------- DIBUJAR NAVE ----------
function dibujarNave() {
  ctx.save();
  ctx.translate(nave.x, nave.y);
  ctx.rotate(nave.angulo);
  ctx.drawImage(
    imgNave,
    -nave.tamano / 2,
    -nave.tamano / 2,
    nave.tamano,
    nave.tamano
  );
  ctx.restore();
}
