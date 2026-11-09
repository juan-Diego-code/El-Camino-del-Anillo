/// Create Event de obj_camera
cam_w = 480;       // lo que se ve (ancho)
cam_h = 270;       // lo que se ve (alto)
zoom = 2;          // ampliación: la ventana mide el doble
cam_smooth = 0.1;  // suavidad del seguimiento

view_enabled = true;
view_visible[0] = true;
view_wport[0] = cam_w * zoom;
view_hport[0] = cam_h * zoom;

camera = camera_create_view(0, 0, cam_w, cam_h);
view_camera[0] = camera;

window_set_size(cam_w * zoom, cam_h * zoom);
surface_resize(application_surface, cam_w * zoom, cam_h * zoom);

// Empieza ya centrada en el jugador, sin deslizarse desde la esquina
var _p = instance_find(obj_player, 0);
if (_p != noone) {
    var _sx = clamp((_p.bbox_left + _p.bbox_right) / 2 - cam_w / 2, 0, room_width - cam_w);
    var _sy = clamp((_p.bbox_top + _p.bbox_bottom) / 2 - cam_h / 2, 0, room_height - cam_h);
    camera_set_view_pos(camera, _sx, _sy);
}