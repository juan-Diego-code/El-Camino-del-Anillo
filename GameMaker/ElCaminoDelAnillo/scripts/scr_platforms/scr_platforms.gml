/// Crea plataformas de bloques sólidos a partir de una lista.
/// Cada plataforma: [x, y, ancho_en_bloques, alto_en_bloques]
/// x, y = esquina superior izquierda, en píxeles (múltiplos de 32).
function platforms_build(_list) {
    var _size = sprite_get_width(spr_solid);

    for (var _p = 0; _p < array_length(_list); _p++) {
        var _px = _list[_p][0];
        var _py = _list[_p][1];
        var _w  = _list[_p][2];
        var _h  = _list[_p][3];

        for (var _i = 0; _i < _w; _i++) {
            for (var _j = 0; _j < _h; _j++) {
                instance_create_layer(_px + _i * _size, _py + _j * _size, "Instances", obj_solid);
            }
        }
    }
}