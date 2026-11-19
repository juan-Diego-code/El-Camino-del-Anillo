# Mecánicas

Estado de las mecánicas del prototipo y de las que siguen en diseño. Para las decisiones de nivel y las estimaciones del salto, consulta [DECISIONES.md](DECISIONES.md).

## Movimiento y plataformas

**Implementado:** movimiento horizontal, gravedad, colisiones con sólidos, salto de altura variable y coyote time. Las plataformas de La Comarca se describen como datos y se crean mediante un constructor reutilizable.

**Diseño acordado:** distribuir plataformas por todo el recorrido; comenzar cada nivel con una sección de aprendizaje sin enemigos y aumentar progresivamente la dificultad. La apariencia de plataformas por región y la construcción de los demás niveles están pendientes.

## Combate y daño

**Implementado:** ataque con espada y zona de golpe; el jugador tiene cinco puntos de vida, recibe daño por contacto, obtiene invulnerabilidad temporal y retroceso, y reinicia la sala al quedarse sin vida. Los enemigos comparten la arquitectura de `obj_enemy_parent`, con un patrullero provisional como hijo.

**Pendiente:** daño de contacto configurable por enemigo, necesario para que el Nazgûl cause dos puntos de daño. También están pendientes los power-ups y la curación. Defensa, consumibles adicionales y jefes no están definidos.

## Enemigos y detección

La Comarca tendrá Nazgûl y Moria tendrá orcos; cada nivel tendrá una especie propia. La variedad dentro de cada nivel dependerá de comportamientos. El Nazgûl está acordado con cinco puntos de vida, patrulla y persecución al detectar al jugador, pero su sprite definitivo y su código están pendientes.

## Estados e interfaz

**Implementado:** estados y animaciones del jugador (`IDLE`, `RUN`, `AIR`, `ATTACK`, `HURT`), cámara con seguimiento suave e interfaz de corazones.

## Exploración y progresión

La salida del nivel y la transición a otra región están pendientes. Rutas alternativas, accesos condicionados por capacidades, mapa, guardado y viaje rápido no están implementados ni especificados en detalle.

## Otras funcionalidades

Parallax, tilesets, audio, menús e inventario están pendientes. Las plataformas de destino, reasignación de controles, opciones de dificultad y ajustes de accesibilidad aún deben definirse.
