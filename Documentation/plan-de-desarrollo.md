# Plan de desarrollo

Plan inicial sujeto a revisión conforme se definan alcance, plataformas y disponibilidad de recursos.

## Etapa 1: definición

- Acordar alcance, público y plataformas de destino.
- Resolver los pilares de diseño y el recorrido narrativo.
- Definir requisitos técnicos y convenciones de nombres.

## Etapa 2: proyecto y prototipo

- Crear un proyecto real desde GameMaker y establecer sus opciones.
- Prototipar movimiento, salto, cámara y colisiones.
- Validar la sensación de control con una sala de prueba.

## Etapa 3: sistemas principales

- Implementar exploración, combate, interacción y progresión.
- Definir guardado, interfaz y configuración.
- Documentar y revisar los sistemas antes de ampliar contenido.

## Etapa 4: contenido vertical

- Construir una sección representativa con arte, audio, enemigos y narrativa.
- Evaluar ritmo, legibilidad, rendimiento y coherencia visual.
- Ajustar alcance según lo aprendido.

## Etapa 5: producción y pulido

- Producir regiones, encuentros y contenido restante.
- Revisar accesibilidad, errores, rendimiento y consistencia.
- Preparar compilaciones y materiales para las plataformas acordadas.

## Estado actual

Etapa 2 completa y Etapa 3 en curso. Existe un nivel jugable de prueba (`rm_init`, la Comarca) con plataformas repartidas por todo el recorrido.

Implementado:
- Jugador: movimiento, salto de altura variable, ataque, vida, daño, retroceso y animaciones por estado.
- Enemigo base y patrullero (provisional, con sprite de orco), con retroceso.
- Cámara con seguimiento suave, fondo de la Comarca e interfaz de corazones.
- Plataformas del nivel definidas como datos en un script.

En marcha: enemigo Nazgûl (sprite y comportamiento).

Pendiente: power-ups, salida y cambio de nivel, más niveles, tilesets, audio, menús, inventario y guardado.

Alcance previsto: al menos 5 niveles (Comarca, Moria, Osgiliath, Puerta Negra y Mordor) con enemigos propios de cada uno.
## Hitos por definir

Fechas, responsables, presupuesto, tamaño del equipo, criterios de aceptación y versión objetivo se definirán cuando exista un alcance aprobado.
