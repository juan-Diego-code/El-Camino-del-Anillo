# AGENTS.md — El Camino del Anillo

## Proyecto

Videojuego 2D de plataformas y exploración inspirado en *El Señor de los Anillos*. El prototipo jugable actual corresponde a La Comarca.

- Motor: GameMaker IDE 2026.0.0.16 (versión declarada en el `.yyp`).
- Lenguaje: GML de código.
- Proyecto GameMaker: `GameMaker/ElCaminoDelAnillo/ElCaminoDelAnillo.yyp`.
- Niveles principales previstos: La Comarca, Moria, Osgiliath, Puerta Negra y Mordor.

## Arquitectura actual

- Los recursos GameMaker viven bajo `GameMaker/ElCaminoDelAnillo/`; sus metadatos y vínculos se describen en `.yyp` y `.yy`.
- La sala activa es `rm_init`, de 3200 × 768 píxeles. `obj_game` crea el suelo, jugador, plataformas, cámara e interfaz; los enemigos se colocan en el editor de salas.
- El jugador es `obj_player`. Sus eventos Create, Step y Draw contienen inicialización, movimiento/combate/daño/estados y presentación.
- `obj_enemy_parent` proporciona vida, invulnerabilidad visual, temporizador de retroceso y destrucción al llegar a cero. Los enemigos concretos heredan de él y ejecutan `event_inherited()`.
- `obj_enemy_walker` implementa movimiento patrullero y colisiones con `obj_solid`; su sprite asignado es `spr_enemy_walker`.
- `scr_player_states` declara `PlayerState`; `scr_platforms` crea bloques desde datos y `scr_level_comarca` define las 18 plataformas de La Comarca.
- `obj_camera`, `obj_hud` y `obj_game` gestionan cámara, corazones y limpieza de pantalla.
- Los recursos visuales actualmente presentes están en `sprites/`; no se debe asumir que existan recursos fuera de los registrados en el proyecto.

## Sistemas implementados

- Movimiento horizontal, gravedad, colisiones, salto variable y coyote time.
- Ataque de espada con zona de golpe, daño a enemigos y enfriamiento.
- Cinco puntos de vida del jugador, corazones, daño por contacto, invulnerabilidad temporal, retroceso y reinicio de sala al morir.
- Estados y animaciones del jugador: `IDLE`, `RUN`, `AIR`, `ATTACK` y `HURT`.
- Enemigo padre con vida, parpadeo al recibir daño y destrucción al morir; patrullero hijo con gravedad, colisiones y patrulla delimitada por distancia al origen.
- Cámara con seguimiento suave, fondo repetido de La Comarca e interfaz de corazones.
- Creación de plataformas a partir de listas `[x, y, ancho_en_bloques, alto_en_bloques]`.

## Convenciones de programación y nombres

- Usar GML compatible con GameMaker IDE 2026.0.0.16.
- Nombres de recursos en minúsculas, con prefijos existentes: `obj_`, `spr_`, `scr_`, `rm_`; separar palabras con guion bajo y evitar tildes, espacios y `ñ`.
- Mantener la organización actual del Asset Browser (Core, Enemies, Player, UI, World; Scripts/Levels y Scripts/Player; Sprites por categoría). Crear carpetas solo cuando sean necesarias.
- Los eventos GML se mantienen junto al objeto correspondiente y con sus nombres de evento generados por GameMaker (por ejemplo `Create_0.gml`, `Step_0.gml`, `Draw_0.gml`). Los scripts tienen su carpeta de recurso y archivo `.gml` correspondiente.
- Seguir el estilo existente: comentarios breves en español, nombres descriptivos y variables locales temporales con prefijo `_`.
- No inventar ni referenciar sprites, objetos, scripts, salas u otros recursos que no estén creados y registrados.

## Reglas para scripts y cambios de código

- Antes de editar cualquier archivo, ejecutar `git status` y revisar los cambios existentes. No sobrescribir trabajo ajeno.
- Hacer cambios acotados que extiendan los sistemas actuales; no duplicar movimiento, vida, combate, colisiones ni lógica común ya implementada.
- Antes de añadir un sistema, localizar el punto de extensión apropiado y documentar por qué hace falta.
- No renombrar recursos existentes de forma arbitraria ni eliminar o simplificar código funcional.
- No editar binarios, sprites ni arte visual salvo petición explícita.
- Si se edita GML fuera del IDE, respetar las convenciones de GameMaker y revisar los metadatos implicados; `.yyp` y `.yy` los genera GameMaker y no se editan a mano según las decisiones actuales del proyecto.
- No hacer commits ni pushes sin autorización explícita.

## Reglas para objetos, sprites y salas

- Crear recursos nuevos y cambiar su jerarquía o asignaciones desde GameMaker IDE; no inventar nombres de recursos pendientes.
- Los enemigos concretos deben integrarse con `obj_enemy_parent` y conservar el flujo heredado salvo necesidad justificada.
- Enemigos y plataformas colocados manualmente se editan en el Room Editor. Las plataformas definidas por datos se mantienen en `scr_level_<nivel>` y se crean mediante `platforms_build`.
- La variedad prevista entre enemigos de un nivel procede de comportamientos, no de especies distintas. Cada nivel tiene su tipo de enemigo propio según el diseño acordado.
- No cambiar tamaños, máscaras, origen, capas ni asignaciones de sprites/salas sin revisar sus efectos sobre colisiones y metadatos.

## Sistemas que deben preservarse

No reimplementar ni modificar innecesariamente el movimiento y salto del jugador, colisiones, ataque, vida/invulnerabilidad, estados/animación, enemigo padre, cámara, HUD, sala `rm_init` ni construcción de plataformas. Si una tarea requiere ampliarlos, conservar el comportamiento existente y limitar el cambio a la necesidad concreta.

## Documentación

- Mantener README, decisiones técnicas y plan de desarrollo coherentes con el estado real, diferenciando con claridad implementado, acordado y pendiente.
- No convertir propuestas de diseño general en funcionalidades existentes.
- Actualizar documentación solo cuando forme parte de la tarea solicitada; no borrar decisiones previas sin explicar el motivo.
- La documentación técnica principal está en `README.md` y `Documentation/`.

## Revisión antes de finalizar una tarea

1. Revisar `git status` antes y después para confirmar que solo cambian los archivos previstos.
2. Revisar referencias a recursos y eventos afectados para detectar nombres inexistentes o enlaces rotos.
3. Comparar el cambio con este archivo y con las decisiones vigentes; identificar discrepancias en vez de resolverlas silenciosamente.
4. Si se solicita verificación, usar GameMaker IDE/runtime disponible y reportar exactamente qué se comprobó. No afirmar compilación o pruebas que no se ejecutaron.
5. Resumir archivos modificados, comportamiento afectado, verificaciones y riesgos conocidos. No crear commits ni pushes sin autorización.
