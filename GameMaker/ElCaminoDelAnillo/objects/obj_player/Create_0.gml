/// Create Event de obj_player
move_speed = 4;       // velocidad horizontal
jump_speed = 12;      // fuerza del salto
grav = 0.5;           // gravedad
max_fall_speed = 14;  // velocidad máxima de caída

hsp = 0;              // velocidad horizontal actual
vsp = 0;              // velocidad vertical actual

facing = 1;           // hacia dónde mira: 1 = derecha, -1 = izquierda

// --- Ataque con espada ---
attack_damage = 1;          // daño de cada golpe
attack_duration = 10;       // pasos que dura la zona de golpe activa
attack_cooldown_time = 20;  // pasos de espera entre ataques
attack_timer = 0;           // > 0 mientras el ataque está activo
attack_cooldown = 0;        // > 0 mientras hay que esperar
attack_w = 48;              // alcance de la espada (ancho de la zona de golpe)
attack_h = 32;              // alto de la zona de golpe

// Zona de golpe (se calcula en el evento Step)
atk_x1 = 0;
atk_y1 = 0;
atk_x2 = 0;
atk_y2 = 0;