// ---------- CONFIGURACIÓN DEL CANVAS ----------
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// ---------- TECLAS PRESIONADAS ----------
const teclas = {};
document.addEventListener("keydown", (e) => teclas[e.key] = true);
document.addEventListener("keyup", (e) => teclas[e.key] = false);