/// Step Event de obj_player
// --- Entrada ---
var _left  = keyboard_check(vk_left)  || keyboard_check(ord("A"));
var _right = keyboard_check(vk_right) || keyboard_check(ord("D"));
var _jump  = keyboard_check_pressed(vk_space)
          || keyboard_check_pressed(vk_up)
          || keyboard_check_pressed(ord("W"));

// --- Movimiento horizontal ---
hsp = (_right - _left) * move_speed;

// --- Gravedad ---
vsp = min(vsp + grav, max_fall_speed);

// --- Salto (solo si hay suelo justo debajo) ---
var _on_ground = place_meeting(x, y + 1, obj_solid);
if (_jump && _on_ground) {
    vsp = -jump_speed;
}

// --- Colisión horizontal ---
if (place_meeting(x + hsp, y, obj_solid)) {
    while (!place_meeting(x + sign(hsp), y, obj_solid)) {
        x += sign(hsp);
    }
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

// --- Límites de la habitación (izquierda y derecha) ---
x = clamp(x, 0, room_width - sprite_width);