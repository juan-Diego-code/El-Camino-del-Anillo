/// Step Event de obj_player
// --- Entrada ---
var _left  = keyboard_check(vk_left)  || keyboard_check(ord("A"));
var _right = keyboard_check(vk_right) || keyboard_check(ord("D"));
var _jump  = keyboard_check_pressed(vk_space)
          || keyboard_check_pressed(vk_up)
          || keyboard_check_pressed(ord("W"));
var _attack = keyboard_check_pressed(ord("J"))
           || keyboard_check_pressed(ord("X"));

// --- Movimiento horizontal ---
hsp = (_right - _left) * move_speed;
if (hsp != 0) {
    facing = sign(hsp);
}

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

// --- Ataque ---
if (attack_cooldown > 0) attack_cooldown--;
if (attack_timer > 0) attack_timer--;

if (_attack && attack_cooldown <= 0) {
    attack_timer = attack_duration;
    attack_cooldown = attack_cooldown_time;
}

// Zona de golpe: delante del jugador, a la altura de su centro
if (attack_timer > 0) {
    var _cy = (bbox_top + bbox_bottom) / 2;
    if (facing == 1) {
        atk_x1 = bbox_right;
        atk_x2 = bbox_right + attack_w;
    } else {
        atk_x1 = bbox_left - attack_w;
        atk_x2 = bbox_left;
    }
    atk_y1 = _cy - attack_h / 2;
    atk_y2 = _cy + attack_h / 2;
}

// --- Daño a enemigos ---
if (attack_timer > 0) {
    with (obj_enemy_parent) {
        if (hit_timer <= 0
            && rectangle_in_rectangle(bbox_left, bbox_top, bbox_right, bbox_bottom,
                                      other.atk_x1, other.atk_y1, other.atk_x2, other.atk_y2) != 0) {
            hp -= other.attack_damage;
            hit_timer = hit_time;
        }
    }
}