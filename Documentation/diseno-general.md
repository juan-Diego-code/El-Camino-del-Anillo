# Diseño general del juego

## Concepto

*El Camino del Anillo* es un videojuego 2D de plataformas y exploración inspirado en *El Señor de los Anillos*. El prototipo jugable actual cubre una sección de La Comarca. La estructura futura contempla regiones conectadas, obstáculos y combates a lo largo del viaje.

## Pilares de diseño

- **Exploración con propósito:** cada región podrá ofrecer rutas y puntos de interés que inviten a observar el entorno.
- **Movimiento legible:** saltos, peligros y superficies deben comunicar claramente sus posibilidades.
- **Progresión:** nuevas capacidades podrán abrir caminos, cuando este sistema se diseñe e implemente.
- **Aventura y tensión:** la calma de algunas regiones contrastará con el peligro creciente del viaje.
- **Narrativa integrada:** el mundo y los encuentros contribuirán al sentido del recorrido.

Estos pilares describen la dirección de diseño; no implican que ya existan mapa, progresión por habilidades o narrativa dentro del juego.

## Formato y tecnología

- Juego 2D para un jugador, desarrollado en GameMaker con GML.
- El proyecto declara GameMaker IDE 2026.0.0.16.
- La cámara con seguimiento suave está implementada en el prototipo. Resolución final, plataformas de distribución, duración y alcance de producción están por definir.

## Niveles

Niveles principales, en orden: La Comarca, Moria, Osgiliath, Puerta Negra y Mordor. Abismo de Helm, Isengard y Campos del Pelennor se consideran opcionales para el futuro.

Cada nivel tendrá una especie de enemigo propia. La Comarca tendrá Nazgûl y Moria tendrá orcos; la variedad de encuentros dentro de cada nivel dependerá de los comportamientos de esa especie. Las especies de los otros niveles están pendientes de definición.

El diseño acordado distribuye plataformas por todo el recorrido y comienza cada nivel con una sección de aprendizaje sin enemigos, seguida de una dificultad creciente. Solo La Comarca cuenta actualmente con datos de plataformas y un prototipo jugable.

## Producción

Los recursos reales del juego se gestionan en el proyecto GameMaker de `GameMaker/ElCaminoDelAnillo/`. La documentación del juego está en `Documentation/`. El Nazgûl, el resto de niveles, el arte definitivo y las funcionalidades de progresión aún deben producirse; su estado se detalla en el [plan de desarrollo](plan-de-desarrollo.md).
