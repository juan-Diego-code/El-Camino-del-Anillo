/// Create Event de obj_player
move_speed = 2;       // velocidad horizontal
jump_speed = 8;       // fuerza del salto
grav = 0.4;           // gravedad
max_fall_speed = 10;  // velocidad máxima de caída

hsp = 0;              // velocidad horizontal actual
vsp = 0;              // velocidad vertical actual

facing = 1;           // hacia dónde mira: 1 = derecha, -1 = izquierda

// --- Ataque con espada ---
attack_damage = 1;          // daño de cada golpe
attack_duration = 10;       // pasos que dura la zona de golpe activa
attack_cooldown_time = 20;  // pasos de espera entre ataques
attack_timer = 0;           // > 0 mientras el ataque está activo
attack_cooldown = 0;        // > 0 mientras hay que esperar
attack_w = 28;              // alcance de la espada (ancho de la zona de golpe)
attack_h = 24;              // alto de la zona de golpe

// Zona de golpe (se calcula en el evento Step)
atk_x1 = 0;
atk_y1 = 0;
atk_x2 = 0;
atk_y2 = 0;

// --- Vida y daño recibido ---
max_hp = 5;            // vida máxima
hp = max_hp;           // vida actual
invuln_time = 60;      // pasos de invulnerabilidad tras recibir daño
invuln_timer = 0;      // > 0 mientras es invulnerable

// --- Retroceso al recibir daño ---
knockback_hsp = 3;   // empuje horizontal
knockback_vsp = 3;   // empuje hacia arriba
hurt_time = 15;      // pasos sin control tras un golpe
hurt_timer = 0;      // > 0 mientras retrocede

// --- Estado actual (se recalcula en cada paso) ---
state = PlayerState.IDLE;

// --- Animación ---
image_speed = 0;                // la animación la controlamos desde el Step
run_anim_speed = 0.2;           // cuadros que avanza la carrera por paso (0.2 = 1 cuadro cada 5 pasos)
prev_state = PlayerState.IDLE;  // sirve para detectar cuándo cambia el estado
sprite_index = spr_player_idle;
mask_index = spr_player_idle;   // la caja de colisión es siempre la del sprite quieto