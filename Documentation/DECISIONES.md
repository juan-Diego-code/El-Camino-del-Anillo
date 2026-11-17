# Decisiones técnicas: El Camino del Anillo

## Entorno
- Motor: GameMaker, IDE 2026.0.0.16, Runtime 2026.0.0.23 (comprobar que la versión del IDE en la Mac coincide con la del .yyp)
- Lenguaje: GML de código (no GML visual)
- Desarrollo, pruebas y Git: Mac (macOS Ventura 13.5.1)
- Windows 11: sin uso actualmente (pospuesto). Si se vuelve a usar, aplica la regla 5 de "Reglas de trabajo"
- Rama de desarrollo: feature/gamemaker
- Proyecto: GameMaker/ElCaminoDelAnillo/ElCaminoDelAnillo.yyp

## Alcance del juego
- Mínimo 5 niveles, cada uno en una localización distinta de la historia, inspirados en las películas.
- Cada nivel tiene sus propios enemigos, con sprites propios. Ejemplos acordados: Comarca con los Nazgûl, Moria con orcos.
- Las demás localizaciones y sus enemigos están por definir.
- Consecuencia técnica: todos los enemigos heredan de `obj_enemy_parent` (vida, parpadeo, retroceso y muerte comunes). Cada tipo añade solo su comportamiento propio.
- Cada nivel tendrá su fondo (`spr_bg_<region>`) y sus salas.

## Convenciones de nombres
| Recurso | Prefijo | Ejemplo |
|---|---|---|
| Objeto | obj_ | obj_player |
| Objeto de enemigo | obj_enemy_ | obj_enemy_walker |
| Sprite | spr_ | spr_player_idle |
| Sprite de animación | spr_<personaje>_<estado> | spr_player_attack |
| Fondo | spr_bg_<región> | spr_bg_shire |
| Habitación | rm_ | rm_init |
| Habitación de nivel | rm_<región>_<número> (por confirmar) | rm_shire_01 |
| Script | scr_ | scr_player_states |
| Tileset | ts_ | ts_shire |
| Sonido / música | snd_ / mus_ | snd_sword_hit |
| Fuente | fnt_ | fnt_dialogue |
| Secuencia | seq_ | seq_intro |

Reglas: minúsculas, guion bajo, sin tildes, espacios ni ñ.

## Organización del Asset Browser (carpetas del IDE)
- Objects: Core (obj_game, obj_camera), Player, Enemies, World (obj_solid), UI (obj_hud)
- Sprites: Characters, Enemies, Environment, UI
- Scripts: Player
- Se crean carpetas nuevas solo cuando hacen falta.
- Las carpetas vacías fuera del proyecto se eliminaron; la organización vive dentro del IDE.

## Reglas de trabajo
1. Los archivos .yyp y .yy los genera solo GameMaker; nunca se editan a mano. Crear o mover recursos los modifica, y es normal.
2. Los recursos nuevos (objetos, sprites, habitaciones, scripts) se crean en el IDE.
3. El código .gml puede editarse fuera del IDE; en ese caso, cerrar el proyecto en GameMaker antes y reabrirlo después.
4. Antes de cada commit: `git status` y comprobar que solo cambian los archivos esperados.
5. Si se vuelve a usar Windows: nunca tener el proyecto abierto en ambos equipos a la vez; cerrar el IDE y hacer git pull antes de abrir; al terminar guardar, cerrar, commit y push.
6. No avanzar a una mecánica nueva hasta comprobar que la anterior funciona.
7. No se crean sistemas ni carpetas antes de necesitarlos.
8. Las plataformas de cada nivel se definen como datos en un script (`scr_level_<región>`), con el formato `[x, y, ancho, alto]` en píxeles y bloques. `platforms_build` (en `scr_platforms`) las crea al iniciar. Los enemigos se colocan en el editor de salas, siempre en el suelo (los patrulleros no detectan bordes).

## Mecánicas terminadas
- Proyecto base abre y compila
- rm_init y obj_game creados
- Movimiento, gravedad y colisiones del jugador
- Salto de altura variable y margen al dejar un borde (coyote time)
- Ataque con espada (zona de golpe invisible, con animación)
- Enemigo base con vida y parpadeo, y enemigo patrullero (orco, provisional)
- Cámara con seguimiento suave
- Vida del jugador, daño por contacto e invulnerabilidad temporal con parpadeo
- Retroceso del jugador y de los enemigos al recibir daño
- Estados del jugador (idle, run, air, attack, hurt) en scr_player_states
- Animaciones del jugador por estado; sprites con origen abajo al centro y máscara de colisión fija (spr_player_idle, modo manual)
- Fondo de la Comarca en rm_init (repetido horizontalmente) y limpieza de pantalla en obj_game (Draw Begin)
- Interfaz de vida con corazones (obj_hud, Draw GUI)
- Plataformas del nivel como datos (scr_platforms y scr_level_comarca), 18 repartidas por todo el recorrido
- Jugador al inicio del nivel; enemigos colocados en el editor de salas

## Pendiente
- Nazgûl: sprite y código (patrulla, persecución al ver al jugador, 5 de vida, 2 de daño por contacto; hay que añadir daño por enemigo)
- Sustituir los patrulleros de la Comarca por Nazgûl; el orco se reserva para Moria
- Sistema de power-ups (empezar por un objeto que cura 1 de vida)
- Salida del nivel y cambio de zona (se decide al terminar la Comarca)
- Sprite de plataformas distinto en cada nivel: parametrizar platforms_build
- Quitar el spr_player antiguo y asignar spr_player_idle al objeto
- Arte definitivo del jugador (Etapa 4): regenerar correr (46 px contra 55), quitar la espada duplicada de spr_player_hurt y rehacer la paleta (5 negros casi idénticos)
- Definir salas y enemigos de Moria, Osgiliath, Puerta Negra y Mordor
- Parallax y fondos por región; tilesets, audio, menús, inventario y guardado
- Observación sin investigar: al mover la ventana con una tecla pulsada, el personaje puede seguir caminando (posible tecla atascada)

## Diseño de niveles
- Cada nivel tiene un único tipo de enemigo propio en todo el recorrido (Comarca: Nazgûl; Moria: orcos).
- La variedad dentro de un nivel viene del comportamiento de los enemigos, no de sprites distintos.
- Las plataformas se reparten por toda la extensión del nivel, no solo en un tramo.
- Cada nivel empieza con un tramo de aprendizaje sin enemigos y la dificultad sube hasta el final.
- Niveles principales, en orden: Comarca, Moria, Osgiliath, Puerta Negra, Mordor. Opcionales más adelante: Abismo de Helm, Isengard, Campos del Pelennor.
- Cada nivel cubre todo el alto de su sala con fondo; el draw_clear de obj_game es solo una red de seguridad.

## Reglas de diseño de niveles (según el salto actual; valores calculados, no medidos)
- Salto completo: unos 84 px. Salto corto (toque rápido): unos 21 px.
- Escalón máximo hacia arriba: 2 bloques (64 px). Con 3 bloques (96 px) no se llega.
- Hueco horizontal seguro: hasta 1 bloque (32 px) si además hay que subir; hasta 2 bloques (64 px) a la misma altura.
- Espacio libre bajo una plataforma: mínimo 2 bloques (64 px); el jugador mide 55 px.
- Los enemigos de suelo solo pasan bajo plataformas con 96 px o más de espacio.
- Si cambian jump_speed, grav, move_speed o jump_cut_speed, hay que revisar estas medidas.