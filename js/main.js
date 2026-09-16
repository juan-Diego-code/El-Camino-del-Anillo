const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const imgNave = new Image();
imgNave.src = "assets/images/nave.svg";

const imgPiedra = new Image();
imgPiedra.src = "assets/images/piedra.svg";

const nave = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    angulo: 0,          
    velocidadGiro: 0.06,
    velocidad: 4,
    tamano: 30
  };

const piedras = [];
const cantidad_piedras = 5;

function crearPiedras() {
  for (let i = 0; i <cantidad_piedras; i++) {
    piedras.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      angulo: Math.random() * Math.PI * 2,
      velocidad: 1 + Math.random() * 1.5,
      tamano: 40 + Math.random() * 20,
      rotacion: (Math.random() - 0.5) * 0.05
    });
  }
}

const teclas = {};
document.addEventListener("keydown", (e) => teclas[e.key] = true);
document.addEventListener("keyup", (e) => teclas[e.key] = false);

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
  
    if (nave.x < 0) nave.x = canvas.width;
    if (nave.x > canvas.width) nave.x = 0;
    if (nave.y < 0) nave.y = canvas.height;
    if (nave.y > canvas.height) nave.y = 0;
  }

function actualizarPiedras() {
  piedras.forEach((p) => {
    p.x += Math.sin(p.angulo) * p.velocidad;
    p.y -= Math.cos(p.angulo) * p.velocidad;

    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;
  });
}

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

function dibujarPiedras() {
  piedras.forEach((p) => {
    p.rotacionActual = (p.rotacionActual || 0) + p.rotacion;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotacionActual);
    ctx.drawImage(
      imgPiedra,
      -p.tamano / 2,
      -p.tamano / 2,
      p.tamano,
      p.tamano
    );
    ctx.restore();
  });
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    actualizarNave();
    actualizarPiedras();
  
    dibujarNave();
    dibujarPiedras();
  
    requestAnimationFrame(gameLoop);
  }

crearPiedras();
gameLoop();