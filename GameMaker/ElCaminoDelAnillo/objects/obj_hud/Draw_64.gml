/// Draw GUI Event de obj_hud
var _p = instance_find(obj_player, 0);
if (_p == noone) exit;

var _margin = 16;  // distancia al borde de la pantalla
var _gap = 4;      // espacio entre corazones
var _w = sprite_get_width(spr_heart_full);

// Un corazón por cada punto de vida máxima: lleno o vacío según la vida actual
for (var _i = 0; _i < _p.max_hp; _i++) {
    var _spr = (_i < _p.hp) ? spr_heart_full : spr_heart_empty;
    draw_sprite(_spr, 0, _margin + _i * (_w + _gap), _margin);
}