/// Create Event de obj_game
show_debug_message("El Camino del Anillo: obj_game iniciado");

// Suelo de prueba: una fila de bloques en la parte baja de la habitación
var _size = sprite_get_width(spr_solid);
var _floor_y = room_height - _size;

for (var _x = 0; _x < room_width; _x += _size) {
    instance_create_layer(_x, _floor_y, "Instances", obj_solid);
}

// Jugador de prueba: aparece un poco por encima del suelo
instance_create_layer(room_width / 2, _floor_y - 100, "Instances", obj_player);

// Enemigo de prueba: a la derecha del jugador, apoyado en el suelo
instance_create_layer(room_width / 2 + 200, _floor_y - sprite_get_height(spr_enemy_walker), "Instances", obj_enemy_walker);

// Cámara (se crea al final, para que ya exista el jugador)
instance_create_layer(0, 0, "Instances", obj_camera);

// Interfaz (vida del jugador)
instance_create_layer(0, 0, "Instances", obj_hud);