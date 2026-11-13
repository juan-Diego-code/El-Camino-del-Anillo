/// Step Event de obj_enemy_walker
event_inherited(); // ejecuta el Step del padre (parpadeo, retroceso y muerte)

if (knockback_timer > 0) {
    // Retrocediendo por un golpe: se ignora la patrulla
    hsp = knockback_dir * knockback_speed;
} else {
    // --- Patrulla: da la vuelta al alejarse demasiado del origen ---
    if (x - start_x > patrol_range) dir = -1;
    if (x - start_x < -patrol_range) dir = 1;

    hsp = dir * move_speed;
}

vsp = min(vsp + grav, max_fall_speed);

// --- Colisión horizontal: si choca con un sólido, da la vuelta ---
if (place_meeting(x + hsp, y, obj_solid)) {
    while (!place_meeting(x + sign(hsp), y, obj_solid)) {
        x += sign(hsp);
    }
    if (knockback_timer <= 0) dir *= -1; // si lo empujaron contra una pared, no cambia su patrulla
    hsp = 0;
}
x += hsp;

// --- Colisión vertical ---
if (place_meeting(x, y + vsp, obj_solid)) {
    while (!place_meeting(x, y + sign(vsp), obj_solid)) {
        y += sign(vsp);
    }
    vsp = 0;
}
y += vsp;