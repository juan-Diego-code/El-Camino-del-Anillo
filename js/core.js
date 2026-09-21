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
const PIEDRAS_POR_NIVEL = [5, 8, 12]; // nivel 1, 2 y 3
