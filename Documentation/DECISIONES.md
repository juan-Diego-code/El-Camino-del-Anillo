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

## Mecánicas terminadas
- Proyecto base abre y compila
- rm_init y obj_game creados
- Movimiento, salto, gravedad y colisiones del jugador
- Ataque con espada (zona de golpe provisional, sin animación)
- Enemigo base con vida y parpadeo, y enemigo patrullero
- Cámara con seguimiento suave
- Vida del jugador, daño por contacto e invulnerabilidad temporal con parpadeo
- Retroceso del jugador y de los enemigos al recibir daño
- Estados del jugador (idle, run, air, attack, hurt) en scr_player_states
- Fondo de la Comarca en rm_init (repetido horizontalmente)
- Interfaz de vida con corazones (obj_hud, Draw GUI)

## Pendiente de verificar
- Plataformas de prueba en rm_init (saltos, colisiones por debajo y laterales)

## Pendiente
- Animaciones por estado (idle, correr, atacar, herido) para jugador y enemigos
- Reducir los sprites a una paleta común de 16 colores
- Mejorar la sensación del salto (altura variable y margen tras dejar un borde)
- Parallax y fondos por región
- Definir las 5 localizaciones, sus enemigos y sus salas
- Observación sin investigar: al mover la ventana con una tecla pulsada, el personaje puede seguir caminando (posible tecla atascada)