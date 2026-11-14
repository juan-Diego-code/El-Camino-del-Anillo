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
if (hurt_timer > 0) {
    // Retrocediendo por un golpe: se conserva hsp y se ignoran las teclas
    hurt_timer--;
    _jump = false;
    _attack = false;
} else {
    hsp = (_right - _left) * move_speed;
    if (hsp != 0) {
        facing = sign(hsp);
    }
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
// El origen está en los pies, al centro: se usa la caja de colisión para no salirse
x = clamp(x, x - bbox_left, room_width - (bbox_right - x));

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

            // Retroceso: lejos del jugador
            knockback_dir = sign((bbox_left + bbox_right) / 2 - (other.bbox_left + other.bbox_right) / 2);
            if (knockback_dir == 0) knockback_dir = other.facing;
            knockback_timer = knockback_time;
        }
    }
}

// --- Daño recibido: contacto con enemigos ---
if (invuln_timer > 0) invuln_timer--;

if (invuln_timer <= 0) {
    var _enemy = instance_place(x, y, obj_enemy_parent);
    if (_enemy != noone) {
        hp -= 1;
        invuln_timer = invuln_time;

        // Retroceso: en dirección contraria al enemigo
        var _dir = sign((bbox_left + bbox_right) / 2 - (_enemy.bbox_left + _enemy.bbox_right) / 2);
        if (_dir == 0) _dir = -facing;
        hsp = _dir * knockback_hsp;
        vsp = -knockback_vsp;
        hurt_timer = hurt_time;
        attack_timer = 0; // el golpe interrumpe el ataque
    }
}

// --- Estado actual (decide qué animación se muestra) ---
if (hurt_timer > 0) {
    state = PlayerState.HURT;
} else if (attack_timer > 0) {
    state = PlayerState.ATTACK;
} else if (!place_meeting(x, y + 1, obj_solid)) {
    state = PlayerState.AIR;
} else if (hsp != 0) {
    state = PlayerState.RUN;
} else {
    state = PlayerState.IDLE;
}

// --- Animación según el estado ---
if (state != prev_state) {
    image_index = 0; // al cambiar de estado, la animación empieza desde el primer cuadro
    prev_state = state;
}

switch (state) {
    case PlayerState.IDLE:
        sprite_index = spr_player_idle;
        break;

    case PlayerState.RUN:
        sprite_index = spr_player_run;
        image_index += run_anim_speed;
        if (image_index >= sprite_get_number(spr_player_run)) {
            image_index -= sprite_get_number(spr_player_run);
        }
        break;

    case PlayerState.AIR:
        sprite_index = spr_player_air;
        break;

    case PlayerState.ATTACK:
        // Los cuadros del ataque se reparten a lo largo de attack_duration
        sprite_index = spr_player_attack;
        image_index = floor((attack_duration - attack_timer) * sprite_get_number(spr_player_attack) / attack_duration);
        break;

    case PlayerState.HURT:
        sprite_index = spr_player_hurt;
        break;
}

// --- Muerte: reinicia la sala ---
if (hp <= 0) {
    room_restart();
}