# Decisiones técnicas: El Camino del Anillo

## Entorno
- Motor: GameMaker, IDE 2026.0.0.16, Runtime 2026.0.0.23
- Lenguaje: GML de código (no GML visual)
- Ejecución del juego: Windows 11
- Desarrollo principal y Git: Mac
- Rama de desarrollo: feature/gamemaker
- Proyecto: GameMaker/ElCaminoDelAnillo/ElCaminoDelAnillo.yyp

## Convenciones de nombres
| Recurso | Prefijo | Ejemplo |
|---|---|---|
| Objeto | obj_ | obj_player |
| Sprite | spr_ | spr_player_idle |
| Habitación | rm_ | rm_init |
| Script | scr_ | scr_player_states |
| Tileset | ts_ | ts_shire |
| Sonido / música | snd_ / mus_ | snd_sword_hit |
| Fuente | fnt_ | fnt_dialogue |
| Secuencia | seq_ | seq_intro |

Reglas: minúsculas, guion bajo, sin tildes, espacios ni ñ.

## Reglas de trabajo
1. Los archivos .yyp y .yy los genera solo GameMaker; nunca se editan a mano.
2. Los recursos nuevos (objetos, sprites, habitaciones, scripts) se crean en Windows en sesiones por lotes.
3. El código .gml se puede editar desde la Mac.
4. Nunca tener el proyecto abierto en GameMaker en ambos equipos a la vez.
5. Antes de abrir GameMaker: cerrar el IDE y hacer git pull. Al terminar: guardar, cerrar, commit y push.
6. No avanzar a una mecánica nueva hasta comprobar que la anterior funciona.

## Mecánicas terminadas
- Proyecto base abre y compila en Windows
- rm_init y obj_game creados