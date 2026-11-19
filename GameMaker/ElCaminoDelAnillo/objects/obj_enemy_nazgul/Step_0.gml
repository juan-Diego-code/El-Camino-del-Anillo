/// Step Event de obj_enemy_nazgul

// La muerte del padre es inmediata; reproducir Death antes de heredar ese Step.
if (hp <= 0) {
    // El Step heredado no corre durante Death, así que conservar sus contadores.
    if (hit_timer > 0) hit_timer--;
    if (knockback_timer > 0) knockback_timer--;

    if (sprite_index != spr_nazgul_death) {
        sprite_index = spr_nazgul_death;
        image_index = 0;
        image_speed = 1;
        hsp = 0;
        vsp = 0;
        is_chasing = false;
        is_attacking = false;
        death_last_frame_seen = false;
        exit;
    }

    // Esperar al menos un Step después de mostrar el último cuadro.
    if (image_number <= 1 || death_last_frame_seen) {
        instance_destroy();
        exit;
    }
    if (image_index >= image_number - 1) {
        death_last_frame_seen = true;
    }
    exit;
}

// Conserva los temporizadores y el comportamiento común mientras sigue vivo.
event_inherited();
if (attack_cooldown > 0) attack_cooldown--;

var _player = instance_find(obj_player, 0);
var _target_sprite = spr_nazgul_idle;

// Muerte y daño interrumpen cualquier comportamiento de la IA.
if (hit_timer > 0 || knockback_timer > 0) {
    if (is_chasing) patrol_recover_pending = true;
    is_chasing = false;

    if (is_attacking) {
        is_attacking = false;
        attack_hit_applied = false;
        attack_last_frame_seen = false;
        attack_cooldown = max(attack_cooldown, attack_cooldown_time);
    }

    if (knockback_timer > 0) {
        hsp = knockback_dir * knockback_speed;
    } else {
        hsp = 0;
    }
    _target_sprite = spr_nazgul_hurt;
} else {
    var _was_chasing = is_chasing;
    var _can_see_player = false;
    var _inside_attack_range = false;
    var _player_dir = 0;
    var _enemy_cx = (bbox_left + bbox_right) / 2;
    var _enemy_cy = (bbox_top + bbox_bottom) / 2;
    var _player_cx = 0;
    var _player_cy = 0;
    var _attack_enemy_x = x + sprite_get_width(spr_nazgul_idle) * 0.5;
    var _attack_enemy_y = y + sprite_get_height(spr_nazgul_idle) * 0.5;
    var _attack_player_x = 0;
    var _attack_player_y = 0;
    var _attack_has_line_of_sight = false;
    is_chasing = false;

    if (_player != noone && _player.hp > 0) {
        _player_cx = (_player.bbox_left + _player.bbox_right) / 2;
        _player_cy = (_player.bbox_top + _player.bbox_bottom) / 2;

        // Referencias estables: el origen del jugador está abajo y centrado.
        _attack_player_x = _player.x;
        _attack_player_y = _player.y - sprite_get_height(spr_player_idle) * 0.5;

        var _center_distance = point_distance(_enemy_cx, _enemy_cy, _player_cx, _player_cy);

        _can_see_player = collision_line(_enemy_cx, _enemy_cy, _player_cx, _player_cy,
                                         obj_solid, true, true) == noone;
        _attack_has_line_of_sight = collision_line(_attack_enemy_x, _attack_enemy_y,
                                                   _attack_player_x, _attack_player_y,
                                                   obj_solid, true, true) == noone;
        is_chasing = _center_distance <= detection_range && _can_see_player;
        _inside_attack_range = point_distance(_attack_enemy_x, _attack_enemy_y,
                                              _attack_player_x, _attack_player_y)
                               <= attack_range && _attack_has_line_of_sight;
        _player_dir = sign(_attack_player_x - _attack_enemy_x);
    }

    // Al perder al jugador, orientar la patrulla hacia el centro de su zona.
    if (is_chasing) {
        patrol_recover_pending = false;
    } else if (_was_chasing || patrol_recover_pending) {
        var _return_dir = sign(start_x - x);
        if (_return_dir != 0) dir = _return_dir;
        patrol_returning = abs(x - start_x) > patrol_range;
        patrol_recover_pending = false;
    }

    if (is_attacking) {
        if (attack_last_frame_seen) {
            // El último cuadro ya se mostró; iniciar la espera entre ataques.
            is_attacking = false;
            attack_hit_applied = false;
            attack_last_frame_seen = false;
            attack_cooldown = attack_cooldown_time;
        } else {
            hsp = 0;
            if (_player_dir != 0) image_xscale = _player_dir;
            _target_sprite = spr_nazgul_attack;

            // Aplicar el golpe una sola vez durante la animación.
            if (!attack_hit_applied
                && sprite_index == spr_nazgul_attack
                && image_index >= attack_hit_frame) {
                attack_hit_applied = true;

                if (_inside_attack_range
                    && _player != noone && _player.hp > 0
                    && _player.invuln_timer <= 0) {
                    _player.hp -= attack_damage;
                    _player.invuln_timer = _player.invuln_time;

                    var _damage_dir = sign(_player_cx - _enemy_cx);
                    if (_damage_dir == 0) _damage_dir = -image_xscale;
                    _player.hsp = _damage_dir * _player.knockback_hsp;
                    _player.vsp = -_player.knockback_vsp;
                    _player.hurt_timer = _player.hurt_time;
                    _player.attack_timer = 0;
                }
            }

            if (image_index >= image_number - 1) {
                attack_last_frame_seen = true;
            }
        }
    }

    if (!is_attacking) {
        if (_inside_attack_range && attack_cooldown <= 0) {
            is_attacking = true;
            attack_hit_applied = false;
            attack_last_frame_seen = false;
            hsp = 0;
            if (_player_dir != 0) image_xscale = _player_dir;
            _target_sprite = spr_nazgul_attack;
        } else if (_inside_attack_range) {
            // Esperar quieto y mirando al jugador antes del siguiente ataque.
            hsp = 0;
            if (_player_dir != 0) image_xscale = _player_dir;
            _target_sprite = spr_nazgul_idle;
        } else if (is_chasing) {
            hsp = sign(_player.x - x) * chase_speed;
            _target_sprite = (hsp != 0) ? spr_nazgul_run : spr_nazgul_idle;
        } else {
            // Fuera del rango de detección, patrullar alrededor del origen.
            if (patrol_returning) {
                if (x >= start_x - patrol_range && x <= start_x + patrol_range) {
                    patrol_returning = false;
                } else {
                    dir = sign(start_x - x);
                }
            }
            if (!patrol_returning) {
                if (x - start_x > patrol_range) dir = -1;
                if (x - start_x < -patrol_range) dir = 1;
            }
            hsp = dir * move_speed;
            _target_sprite = (hsp != 0) ? spr_nazgul_walk : spr_nazgul_idle;
        }
    }
}

vsp = min(vsp + grav, max_fall_speed);

// Colisión horizontal, siguiendo el sistema de obj_enemy_walker.
var _max_collision_steps = 256;
var _horizontal_started_inside = place_meeting(x, y, obj_solid);
if (hsp != 0 && (_horizontal_started_inside || place_meeting(x + hsp, y, obj_solid))) {
    var _horizontal_steps = 0;
    var _horizontal_start_x = x;
    while (!_horizontal_started_inside
           && !place_meeting(x + sign(hsp), y, obj_solid)
           && _horizontal_steps < _max_collision_steps) {
        x += sign(hsp);
        _horizontal_steps++;
    }

    if (_horizontal_steps >= _max_collision_steps) x = _horizontal_start_x;
    if (!_horizontal_started_inside
        && _horizontal_steps < _max_collision_steps
        && knockback_timer <= 0 && !is_chasing) {
        dir *= -1;
    }
    hsp = 0;
}
x += hsp;

// Colisión vertical, siguiendo el sistema de obj_enemy_walker.
var _vertical_started_inside = place_meeting(x, y, obj_solid);
if (vsp != 0 && (_vertical_started_inside || place_meeting(x, y + vsp, obj_solid))) {
    var _vertical_steps = 0;
    var _vertical_start_y = y;
    while (!_vertical_started_inside
           && !place_meeting(x, y + sign(vsp), obj_solid)
           && _vertical_steps < _max_collision_steps) {
        y += sign(vsp);
        _vertical_steps++;
    }
    if (_vertical_steps >= _max_collision_steps) y = _vertical_start_y;
    vsp = 0;
}
y += vsp;

// Reflejar el sprite según el movimiento sin alterar la dirección de patrulla.
if (hsp != 0) {
    image_xscale = sign(hsp);
}

// Reiniciar la animación solo cuando cambia el estado.
if (sprite_index != _target_sprite) {
    sprite_index = _target_sprite;
    image_index = 0;
    image_speed = 1;
}
