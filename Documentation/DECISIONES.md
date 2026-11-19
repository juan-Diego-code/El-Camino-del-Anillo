# Decisiones técnicas: El Camino del Anillo

## Entorno

- Motor: GameMaker IDE 2026.0.0.16, según `GameMaker/ElCaminoDelAnillo/ElCaminoDelAnillo.yyp`.
- Lenguaje: GML de código, no GML visual.
- Runtime: la documentación anterior registra 2026.0.0.23; no se encontró esa versión en los metadatos revisados del proyecto, por lo que queda pendiente confirmarla en GameMaker IDE.
- Rama de desarrollo documentada: `feature/gamemaker`.
- Proyecto: `GameMaker/ElCaminoDelAnillo/ElCaminoDelAnillo.yyp`.

## Alcance y niveles

Niveles principales, en orden:

1. La Comarca.
2. Moria.
3. Osgiliath.
4. Puerta Negra.
5. Mordor.

Niveles opcionales futuros: Abismo de Helm, Isengard y Campos del Pelennor.

Cada nivel tendrá una especie de enemigo propia. La Comarca tendrá Nazgûl y Moria tendrá orcos. Dentro de un nivel, la variedad se expresará con comportamientos distintos de esa especie, no con especies adicionales. La especie y los comportamientos de los demás niveles aún están por definir.

Cada nivel tendrá fondos y salas propios. Los nombres `spr_bg_<region>` y `rm_<region>_<numero>` son convenciones previstas; solo se deben usar al crear esos recursos en GameMaker.

## Arquitectura y organización actuales

- El proyecto real vive en `GameMaker/ElCaminoDelAnillo/` y registra recursos mediante `.yyp` y `.yy`.
- La sala prototipo `rm_init` mide 3200 × 768. `obj_game` crea el suelo, el jugador, las plataformas, la cámara y el HUD; las instancias de enemigos están colocadas en la sala.
- `obj_player` reúne la lógica del jugador. `obj_enemy_parent` contiene datos y comportamiento común; `obj_enemy_walker` es el patrullero concreto provisional.
- `scr_platforms` crea bloques a partir de listas y `scr_level_comarca` contiene los datos de las 18 plataformas del prototipo.
- El Asset Browser organiza objetos, scripts y sprites por categorías. Las carpetas se crean cuando hacen falta.

## Convenciones de nombres

| Recurso | Prefijo | Ejemplo existente o patrón |
|---|---|---|
| Objeto | `obj_` | `obj_player` |
| Objeto enemigo | `obj_enemy_` | `obj_enemy_walker` |
| Sprite | `spr_` | `spr_player_idle` |
| Animación | `spr_<personaje>_<estado>` | `spr_player_attack` |
| Fondo | `spr_bg_<region>` | `spr_bg_shire` |
| Sala | `rm_` | `rm_init` |
| Sala de nivel | `rm_<region>_<numero>` | Convención futura |
| Script | `scr_` | `scr_platforms` |
| Tileset | `ts_` | Convención futura |
| Sonido / música | `snd_` / `mus_` | Convención futura |
| Fuente / secuencia | `fnt_` / `seq_` | Convención futura |

Usar minúsculas y guion bajo; evitar tildes, espacios y `ñ` en nombres de recursos.

## Plataformas y diseño de niveles

- Las plataformas de cada nivel se definen como datos en un script `scr_level_<region>` y se crean con `platforms_build`, definido en `scr_platforms`.
- Cada registro usa `[x, y, ancho_en_bloques, alto_en_bloques]`; las coordenadas se expresan en píxeles y ancho/alto en bloques.
- Los enemigos se colocan en el editor de salas. El patrullero actual no detecta bordes.
- Las plataformas se distribuirán por todo el recorrido. Cada nivel comenzará con una sección de aprendizaje sin enemigos y elevará progresivamente la dificultad.

## Mecánicas implementadas

- Proyecto GameMaker con sala `rm_init`.
- Movimiento, gravedad, colisiones, salto variable y coyote time.
- Ataque de espada con zona de golpe.
- Vida del jugador de cinco puntos, daño por contacto, invulnerabilidad temporal, parpadeo, retroceso y reinicio de sala al morir.
- Estados y animaciones del jugador: `IDLE`, `RUN`, `AIR`, `ATTACK` y `HURT`.
- Enemigo padre con vida, parpadeo al recibir daño y destrucción al llegar a cero; patrullero provisional hijo con movimiento, gravedad y colisiones.
- Cámara con seguimiento suave, fondo repetido de la Comarca e interfaz de corazones.
- Constructor de plataformas y datos para las 18 plataformas de La Comarca.

## Valores estimados para el diseño del salto

Son estimaciones calculadas con los parámetros actuales, no mediciones definitivas de juego:

- Salto completo: aproximadamente 84 px; salto corto: aproximadamente 21 px.
- Escalón máximo hacia arriba: 64 px. Un desnivel de 96 px no se alcanza con el salto actual.
- Hueco horizontal seguro al subir: 32 px; a la misma altura: 64 px.
- Espacio libre bajo una plataforma: mínimo 64 px; el jugador mide 55 px.
- Los enemigos de suelo necesitan al menos 96 px libres para pasar bajo plataformas.

Si cambian `jump_speed`, `grav`, `move_speed` o `jump_cut_speed`, se deben revisar estas estimaciones.

## Reglas de trabajo

1. GameMaker genera los archivos `.yyp` y `.yy`; no editarlos a mano.
2. Crear recursos nuevos (objetos, sprites, scripts y salas) desde GameMaker IDE.
3. El código `.gml` puede editarse fuera del IDE; cerrar el proyecto antes y reabrirlo después.
4. Antes de editar, revisar `git status`; antes de un commit, confirmar que solo cambian los archivos esperados.
5. No avanzar una mecánica nueva sin comprobar la anterior.
6. No crear sistemas ni carpetas antes de necesitarlos.
7. No hacer commits ni pushes sin autorización.

## Problemas conocidos y pendientes de arte

- Hay una diferencia de altura entre la animación de correr y las demás; se había registrado una altura de 46 px para correr frente a 55 px en otras poses, pendiente de corregir/confirmar en el arte.
- `spr_player_hurt` tiene una espada duplicada.
- La paleta del jugador necesita revisión.
- `spr_player` sigue presente y asignado en `obj_player.yy`; el Create de `obj_player` asigna `spr_player_idle` como sprite y máscara. La limpieza de este recurso antiguo está pendiente.
- Se observó que al mover la ventana con una tecla pulsada el personaje podría seguir caminando; causa sin investigar.

## Funcionalidades pendientes

- Nazgûl para La Comarca: cinco puntos de vida, dos puntos de daño por contacto, patrulla y persecución al detectar al jugador. Implementación y sprite definitivo pendientes. El daño por contacto actual está fijado en un punto y deberá ampliarse para admitir daño por enemigo.
- Power-ups y curación.
- Salida del nivel y transición entre niveles.
- Sprites de plataformas distintos por región.
- Arte definitivo del jugador.
- Enemigos y salas de los demás niveles.
- Parallax, tilesets, audio, menús, inventario y guardado.
