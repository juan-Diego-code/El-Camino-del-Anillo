# El Camino del Anillo

Proyecto de videojuego 2D de plataformas y exploración, concebido como una aventura metroidvania ambientada en el universo de *El Señor de los Anillos*. Esta rama prepara la estructura y la documentación para la futura versión desarrollada en GameMaker.

## Tecnologías

- **GameMaker** como entorno de desarrollo previsto.
- **GML (GameMaker Language)** para la lógica del juego que se incorporará más adelante.
- **Git** para el historial y control de versiones.

La carpeta `GameMaker/` organiza los recursos de destino, pero todavía no contiene un proyecto GameMaker funcional ni recursos importables. Crea y configura el proyecto desde GameMaker antes de añadir recursos. No se incluyen archivos de proyecto ni código GML en esta etapa.

## Visión del juego

La propuesta combina desplazamiento de plataformas, exploración de zonas conectadas, combate y progresión. La aventura toma como eje el viaje del Portador del Anillo y lugares como la Comarca, las Minas de Moria y Mordor. El diseño detallado permanece abierto a iteración y se recoge en `Documentation/`.

## Estructura

```text
Documentation/              Diseño, narrativa, sistemas, elenco y planificación
GameMaker/
  Objects/                   Jugador, enemigos, jefes, NPC, objetos, combate, mundo e interfaz
  Rooms/                     Regiones, interiores, arenas de jefes y menús
  Scripts/                   Sistemas y lógica organizada por responsabilidad
  Sprites/                   Personajes, entorno, objetos, efectos e interfaz
  Tilesets/                  Regiones, arquitectura y peligros
  Sounds/                    Música, ambiente, personajes, combate e interfaz
  Fonts/                     Tipografías de interfaz y decorativas
  Shaders/                   Posprocesado y efectos visuales
  Sequences/                 Cinemáticas y eventos guionizados
```

Las carpetas `.gitkeep` solo mantienen esta organización en Git. No son recursos de GameMaker.

## Documentación

- [Diseño general](Documentation/diseno-general.md)
- [Historia y narrativa](Documentation/historia-y-narrativa.md)
- [Mecánicas](Documentation/mecanicas.md)
- [Personajes y enemigos](Documentation/personajes-y-enemigos.md)
- [Plan de desarrollo](Documentation/plan-de-desarrollo.md)

## Estado

Etapa inicial de estructuración y diseño. No hay código GML ni recursos de juego implementados todavía. La versión web anterior se retira de esta rama para dar paso al trabajo de GameMaker; el historial de Git se conserva.
