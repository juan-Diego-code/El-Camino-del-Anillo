/// Plataformas del nivel 1: La Comarca.
/// Cada plataforma: [x, y, ancho_en_bloques, alto_en_bloques]
/// Reglas de diseño: ver Documentation/DECISIONES.md.
function level_comarca_platforms() {
    return [
        // Zona A: aprendizaje (0 a 400)
        [224,  672, 2, 2],   // A1: escalón sólido
        [320,  608, 3, 1],   // A2

        // Zona B: plataformas (400 a 1300). Las de x 800 a 1088 y el muro de x 1400 ya están en la sala.
        [480,  672, 2, 2],   // B1: escalón sólido
        [544,  608, 4, 1],   // B2
        [1120, 544, 3, 1],   // B3
        [1248, 608, 2, 1],   // B4

        // Zona C: ruta alta sobre los enemigos (1560 a 2310)
        [1568, 672, 2, 2],   // C0: escalón sólido
        [1632, 608, 4, 1],   // C1
        [1792, 544, 3, 1],   // C2
        [1920, 608, 4, 1],   // C3
        [2080, 544, 3, 1],   // C4
        [2208, 608, 4, 1],   // C5

        // Zona D: tramo final (2360 a 3080)
        [2368, 672, 2, 2],   // D0: escalón sólido
        [2432, 608, 3, 1],   // D1
        [2592, 608, 3, 1],   // D2: hueco de 2 bloques, el máximo
        [2720, 544, 3, 1],   // D3
        [2848, 480, 3, 1],   // D4
        [2976, 544, 3, 1]    // D5
    ];
}