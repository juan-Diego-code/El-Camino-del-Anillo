/// Create Event de obj_game
show_debug_message("El Camino del Anillo: obj_game iniciado");

// Suelo de prueba: una fila de bloques en la parte baja de la habitación
var _size = sprite_get_width(spr_solid);
var _floor_y = room_height - _size;

for (var _x = 0; _x < room_width; _x += _size) {
    instance_create_layer(_x, _floor_y, "Instances", obj_solid);
}

// Jugador: aparece en el extremo izquierdo del nivel, apoyado sobre el suelo
instance_create_layer(96, _floor_y - 4, "Instances", obj_player);
// Plataformas del nivel (los datos están en scr_level_comarca)
platforms_build(level_comarca_platforms());

// Los enemigos y las plataformas se colocan en el editor de habitaciones (rm_init), no desde el código.

// Cámara (se crea al final, para que ya exista el jugador)
instance_create_layer(0, 0, "Instances", obj_camera);

// Interfaz (vida del jugador)
instance_create_layer(0, 0, "Instances", obj_hud);