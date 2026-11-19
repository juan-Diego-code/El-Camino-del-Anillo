# El Camino del Anillo

Videojuego 2D de plataformas y exploración inspirado en *El Señor de los Anillos*. El prototipo jugable actual recorre La Comarca y está desarrollado en GameMaker con GML.

## Tecnología y proyecto

- GameMaker IDE 2026.0.0.16, según los metadatos del proyecto.
- GML de código.
- Proyecto: [`GameMaker/ElCaminoDelAnillo/ElCaminoDelAnillo.yyp`](GameMaker/ElCaminoDelAnillo/ElCaminoDelAnillo.yyp).

## Visión y alcance

El viaje se organiza en cinco niveles principales: La Comarca, Moria, Osgiliath, Puerta Negra y Mordor. Abismo de Helm, Isengard y Campos del Pelennor son posibles niveles opcionales futuros. Cada nivel tendrá una especie de enemigo propia; dentro de cada nivel, la variedad se basará en comportamientos distintos. La Comarca tendrá Nazgûl y Moria tendrá orcos.

Las plataformas se distribuirán a lo largo del recorrido. Cada nivel empezará con una sección de aprendizaje sin enemigos y aumentará progresivamente la dificultad. Estas son decisiones de diseño; solo La Comarca cuenta actualmente con un prototipo jugable.

## Estado del prototipo

La sala `rm_init` contiene el nivel de prueba de La Comarca. El prototipo incluye movimiento y colisiones, salto variable con coyote time, ataque con espada, cinco puntos de vida, daño e invulnerabilidad, retroceso, estados y animaciones del jugador, enemigo base, patrullero provisional (orco), cámara suave, HUD de corazones y fondo de la región. Las plataformas de La Comarca están definidas como datos y se crean con un constructor reutilizable.

El Nazgûl está acordado, pero todavía no implementado. Su sprite definitivo y su código están pendientes. El patrullero actual no debe confundirse con el Nazgûl.

## Estructura

```text
Documentation/              Diseño, decisiones técnicas y planificación
GameMaker/ElCaminoDelAnillo/ Proyecto GameMaker: objetos, scripts, sprites y salas
```

Abre el archivo `.yyp` indicado arriba desde GameMaker IDE.

## Documentación

- [Decisiones técnicas](Documentation/DECISIONES.md)
- [Diseño general](Documentation/diseno-general.md)
- [Historia y narrativa](Documentation/historia-y-narrativa.md)
- [Mecánicas](Documentation/mecanicas.md)
- [Personajes y enemigos](Documentation/personajes-y-enemigos.md)
- [Plan de desarrollo](Documentation/plan-de-desarrollo.md)
