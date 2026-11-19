/// Draw Event de obj_enemy_nazgul

// Mantener el parpadeo definido por el Draw del enemigo padre.
if (hit_timer > 0 && (hit_timer mod 4) < 2) exit;

// Alinear todos los estados dentro de la caja fija de spr_nazgul_idle.
var _reference_width = sprite_get_width(spr_nazgul_idle);
var _reference_height = sprite_get_height(spr_nazgul_idle);
var _sprite_width = sprite_get_width(sprite_index);
var _sprite_height = sprite_get_height(sprite_index);
var _horizontal_padding = (_reference_width - _sprite_width) * 0.5;
var _scale_x = abs(image_xscale);
var _scale_y = abs(image_yscale);
var _draw_x = x + _horizontal_padding * _scale_x;

if (image_xscale < 0) {
    _draw_x += (_reference_width - _horizontal_padding) * _scale_x;
}
var _draw_y = y + (_reference_height - _sprite_height) * _scale_y;

draw_sprite_ext(sprite_index, image_index, _draw_x, _draw_y,
                image_xscale, image_yscale, image_angle,
                image_blend, image_alpha);
