# Plan de desarrollo

Plan de trabajo sujeto a revisión cuando se concrete el alcance de producción. El estado de esta página distingue sistemas ya implementados de trabajo acordado o pendiente.

## Etapas

1. **Definición:** alcance, pilares, recorrido narrativo y requisitos técnicos.
2. **Proyecto y prototipo:** proyecto GameMaker, controles, movimiento, cámara y colisiones.
3. **Sistemas principales:** exploración, combate, interfaz, interacción y progresión.
4. **Contenido vertical:** una sección representativa con arte, audio, enemigos y narrativa.
5. **Producción y pulido:** regiones, encuentros, revisión de calidad y compilaciones para plataformas definidas.

## Estado actual

La etapa 2 está completada y la etapa 3 está en curso. Existe un prototipo jugable de La Comarca en `rm_init`.

Implementado: movimiento y colisiones; salto variable y coyote time; ataque; cinco puntos de vida, daño, invulnerabilidad y retroceso; estados y animaciones del jugador; enemigo padre y patrullero provisional (orco); cámara suave; HUD de corazones; fondo de La Comarca; constructor reutilizable y datos de sus 18 plataformas.

## Próximos trabajos

- Implementar el Nazgûl de La Comarca cuando esté listo su sprite definitivo: cinco puntos de vida, dos puntos de daño por contacto, patrulla y persecución al detectar al jugador. El daño por contacto configurable por enemigo también está pendiente.
- Diseñar y construir salida y transición entre niveles.
- Desarrollar power-ups y curación.
- Definir enemigos y salas para Moria, Osgiliath, Puerta Negra y Mordor.
- Parametrizar la apariencia de las plataformas por región.
- Completar el arte del jugador y resolver los problemas visuales registrados en `DECISIONES.md`.
- Añadir, cuando se desarrollen, parallax, tilesets, audio, menús, inventario y guardado.

## Alcance de niveles

Niveles principales, en orden: La Comarca, Moria, Osgiliath, Puerta Negra y Mordor. Abismo de Helm, Isengard y Campos del Pelennor son opciones futuras, no contenido comprometido.

Cada nivel tendrá una especie de enemigo propia; la variedad de encuentros dentro de un nivel vendrá de comportamientos distintos. La Comarca tendrá Nazgûl y Moria tendrá orcos. Las plataformas recorrerán el nivel completo, con un inicio de aprendizaje sin enemigos y dificultad creciente. La aplicación de estas reglas a los otros niveles sigue pendiente de producción.

## Hitos por definir

Fechas, responsables, presupuesto, tamaño del equipo, criterios de aceptación y plataformas finales se concretarán cuando exista un alcance de producción aprobado.
