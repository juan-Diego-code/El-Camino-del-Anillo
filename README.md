# El Camino del Anillo

Videojuego 2D de plataformas y exploración, inspirado en Hollow Knight y ambientado en el universo de *El Señor de los Anillos*. Se desarrolla en GameMaker con GML.

## Tecnologías

- **GameMaker** (IDE 2026.0.0.16, Runtime 2026.0.0.23).
- **GML (GameMaker Language)** para toda la lógica del juego.
- **Git y GitHub** para el control de versiones y la sincronización entre Mac y Windows.

## Visión del juego

La propuesta combina desplazamiento de plataformas, exploración de zonas conectadas, combate y progresión. La aventura toma como eje el viaje del Portador del Anillo y lugares como la Comarca, las Minas de Moria y Mordor. El diseño detallado permanece abierto a iteración y se recoge en `Documentation/`.

## Estructura

```text
Documentation/              Diseño, narrativa, decisiones técnicas y planificación
GameMaker/
  ElCaminoDelAnillo/         Proyecto real de GameMaker (.yyp, objetos, sprites, rooms)
```

El proyecto se abre desde `GameMaker/ElCaminoDelAnillo/ElCaminoDelAnillo.yyp`.

## Documentación

- [Decisiones técnicas](Documentation/DECISIONES.md)
- [Diseño general](Documentation/diseno-general.md)
- [Historia y narrativa](Documentation/historia-y-narrativa.md)
- [Mecánicas](Documentation/mecanicas.md)
- [Personajes y enemigos](Documentation/personajes-y-enemigos.md)
- [Plan de desarrollo](Documentation/plan-de-desarrollo.md)

## Estado

Prototipo en una sola sala (`rm_init`) con movimiento, salto, ataque, un enemigo patrullero y cámara. Consulta `Documentation/plan-de-desarrollo.md` para el detalle y los siguientes pasos.