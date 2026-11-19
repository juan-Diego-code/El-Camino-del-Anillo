/// Create Event de obj_enemy_nazgul
event_inherited();

// Estadísticas
max_hp = 5;
hp = max_hp;
contact_damage = 2;

// Movimiento
move_speed = 1;
chase_speed = 1.5;
grav = 0.4;
max_fall_speed = 10;

dir = choose(-1, 1);
hsp = 0;
vsp = 0;

// Patrulla
start_x = x;
patrol_range = 120;

// Detección
detection_range = 120;
is_chasing = false;

// Ataque por proximidad
attack_range = 32;
attack_damage = 2;
attack_hit_frame = 1;
attack_cooldown_time = 45;
attack_cooldown = 0;
is_attacking = false;
attack_hit_applied = false;
attack_last_frame_seen = false;
patrol_returning = false;
patrol_recover_pending = false;
