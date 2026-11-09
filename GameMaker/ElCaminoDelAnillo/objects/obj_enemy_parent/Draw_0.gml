/// Draw Event de obj_enemy_parent
// Parpadea mientras está en invulnerabilidad tras un golpe
if (hit_timer > 0 && (hit_timer mod 4) < 2) exit;

draw_self();