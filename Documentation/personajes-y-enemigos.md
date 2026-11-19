# Personajes y enemigos

Este documento separa lo que ya existe en el prototipo de las decisiones de diseño y el contenido aún no implementado.

## Personaje jugador

La aventura gira en torno al Portador del Anillo. El prototipo ya tiene movimiento, salto, ataque, cinco puntos de vida y estados con animaciones. El desarrollo narrativo, las capacidades futuras y la progresión del personaje siguen pendientes.

El arte actual es provisional. La diferencia de altura de la animación de correr, la espada duplicada en `spr_player_hurt`, la paleta y la presencia del sprite antiguo `spr_player` están registradas en `DECISIONES.md`.

## Enemigos

Cada nivel tendrá una especie de enemigo propia. La variedad de encuentros dentro de cada nivel se conseguirá mediante comportamientos distintos de esa especie, no añadiendo especies diferentes al mismo nivel.

| Nivel | Especie prevista | Estado |
|---|---|---|
| La Comarca | Nazgûl | Acordado; pendiente de sprite definitivo e implementación. |
| Moria | Orcos | Acordado; el patrullero actual es provisional y no representa todavía el contenido terminado de Moria. |
| Osgiliath | Por definir | Pendiente. |
| Puerta Negra | Por definir | Pendiente. |
| Mordor | Por definir | Pendiente. |

Abismo de Helm, Isengard y Campos del Pelennor son niveles opcionales futuros; sus especies están por definir.

### Nazgûl de La Comarca

Características acordadas para su futura implementación:

- Cinco puntos de vida.
- Dos puntos de daño por contacto.
- Patrulla por el escenario y persecución cuando detecte al jugador.
- Integración con `obj_enemy_parent`.

El código y el sprite definitivo están pendientes. El patrullero actual, `obj_enemy_walker`, hereda de `obj_enemy_parent` y usa `spr_enemy_walker`; no se debe presentar como Nazgûl.

### Arquitectura de enemigos existente

`obj_enemy_parent` aporta vida, temporizador de invulnerabilidad visual y destrucción al agotarse la vida. El patrullero hijo implementa movimiento, gravedad, colisiones y retroceso. El daño de contacto al jugador sigue fijo en un punto en el código, así que aún falta admitir cantidades distintas por enemigo.

## Personajes no jugables y jefes

El elenco de NPC, sus funciones y diálogos están por definir. No hay jefes implementados ni encuentros contra jefes confirmados.

## Guía de consistencia

- Dar a cada personaje una función narrativa o jugable comprensible.
- Mantener legibles la silueta y las animaciones.
- Expresar la variedad de enemigos de una región mediante comportamiento, ritmo y presentación, conservando una especie propia por nivel.
- No documentar como existente un personaje, recurso o comportamiento que siga en diseño.
