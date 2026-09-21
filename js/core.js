// ---------- CONFIGURACIÓN DEL CANVAS ----------
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// tamaño de cada casilla del mapa, en píxeles (800 x 600 = 20 x 15 tiles en pantalla)
const TAMANO_TILE = 40;

// ---------- TECLAS PRESIONADAS ----------
// se guardan en minúsculas: "arrowup", "w", "a", " ", "x", "e"...
const teclas = {};
const TECLAS_DEL_JUEGO = ["arrowup", "arrowdown", "arrowleft", "arrowright", " "];

document.addEventListener("keydown", (e) => {
  const k = e.key.toLowerCase();
  teclas[k] = true;
  // evitar que la página se desplace, pero sin romper los botones del menú
  if (TECLAS_DEL_JUEGO.includes(k) && e.target.tagName !== "BUTTON") {
    e.preventDefault();
  }
});
document.addEventListener("keyup", (e) => {
  teclas[e.key.toLowerCase()] = false;
});
// si la ventana pierde el foco, soltar todas las teclas (evita quedarse caminando solo)
window.addEventListener("blur", () => {
  for (const k in teclas) teclas[k] = false;
});

// ---------- PUNTAJE ----------
let puntos = 0;

// ---------- TIEMPO (lo actualiza el game loop, en milisegundos) ----------
let tiempo = 0;

// ---------- UTILIDADES ----------
function limitar(valor, min, max) {
  return Math.max(min, Math.min(max, valor));
}

// ---------- ZONAS ----------
let zonaActual = "comarca";

const ZONAS = {
  comarca: {
    nombre: "La Comarca",
    lugar: "en la Comarca",
    subtitulo: "Los Jinetes Negros rondan los caminos",
    objetivo: "Explora la Comarca",
    acento: "#7ddc5a"
  },
  moria: {
    nombre: "Minas de Moria",
    lugar: "en las Minas de Moria",
    subtitulo: "Algo se mueve en la oscuridad",
    objetivo: "Cruza las minas",
    acento: "#8fb4d9"
  },
  mordor: {
    nombre: "Mordor",
    lugar: "en Mordor",
    subtitulo: "La Grieta del Destino te espera",
    objetivo: "Llega a la Grieta del Destino",
    acento: "#ffb020"
  }
};

function temaActual() {
  return ZONAS[zonaActual];
}