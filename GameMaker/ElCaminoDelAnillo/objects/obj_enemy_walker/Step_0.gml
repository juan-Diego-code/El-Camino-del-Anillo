/// Step Event de obj_enemy_walker
event_inherited(); // ejecuta el Step del padre (parpadeo y muerte)

// --- Patrulla: da la vuelta al alejarse demasiado del origen ---
if (x - start_x > patrol_range) dir = -1;
if (x - start_x < -patrol_range) dir = 1;

hsp = dir * move_speed;
vsp = min(vsp + grav, max_fall_speed);

// --- Colisión horizontal: si choca con un sólido, da la vuelta ---
if (place_meeting(x + hsp, y, obj_solid)) {
    while (!place_meeting(x + sign(hsp), y, obj_solid)) {
        x += sign(hsp);
    }
    dir *= -1;
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