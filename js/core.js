// ---------- CONFIGURACIÓN DEL CANVAS ----------
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// ---------- TECLAS PRESIONADAS ----------
const teclas = {};
document.addEventListener("keydown", (e) => teclas[e.key] = true);
document.addEventListener("keyup", (e) => teclas[e.key] = false);

// ---------- PUNTAJE ----------
let puntos = 0;

// ---------- NIVELES ----------
let nivelActual = 1;
const PIEDRAS_POR_NIVEL = [5, 8, 12]; // nivel 1, 2 y 3 (cantidad de enemigos)

// ---------- TEMAS POR NIVEL ----------
// nombre / lugar: textos que se muestran en el juego
// acento: color del borde del canvas y del HUD
// fondoArriba / fondoAbajo: degradado del fondo
const TEMAS_NIVEL = [
  {
    nombre: "La Comarca",
    lugar: "en la Comarca",
    enemigo: "Jinetes Negros",
    acento: "#7ddc5a",
    fondoArriba: "#0b2410",
    fondoAbajo: "#1f4d22"
  },
  {
    nombre: "Minas de Moria",
    lugar: "en las Minas de Moria",
    enemigo: "Orcos",
    acento: "#8fb4d9",
    fondoArriba: "#080b12",
    fondoAbajo: "#1c2433"
  },
  {
    nombre: "Mordor",
    lugar: "en Mordor",
    enemigo: "El Ojo de Sauron",
    acento: "#ffb020",
    fondoArriba: "#000000",
    fondoAbajo: "#3d0b05"
  }
];

// tema del nivel en el que se está jugando
function temaActual() {
  return TEMAS_NIVEL[nivelActual - 1];
}