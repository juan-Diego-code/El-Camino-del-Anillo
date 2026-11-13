/// Create Event de obj_enemy_parent
max_hp = 3;      // puntos de vida
hp = max_hp;
hit_time = 15;   // pasos de invulnerabilidad tras recibir un golpe
hit_timer = 0;

// --- Retroceso al recibir daño ---
knockback_speed = 3;  // empuje horizontal
knockback_time = 10;  // pasos retrocediendo
knockback_timer = 0;  // > 0 mientras retrocede
knockback_dir = 0;    // 1 = derecha, -1 = izquierda