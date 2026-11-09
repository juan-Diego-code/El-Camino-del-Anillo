/// Create Event de obj_enemy_walker
event_inherited(); // ejecuta el Create del padre

move_speed = 1;
grav = 0.4;
max_fall_speed = 10;

dir = choose(-1, 1);  // dirección inicial: -1 izquierda, 1 derecha
hsp = 0;
vsp = 0;

start_x = x;          // punto de origen de la patrulla
patrol_range = 120;   // cuánto se aleja del origen