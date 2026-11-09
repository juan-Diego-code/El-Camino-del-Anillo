/// End Step Event de obj_camera
var _p = instance_find(obj_player, 0);

if (_p != noone) {
    // Punto al que debe apuntar la cámara (centrada en el jugador)
    var _tx = (_p.bbox_left + _p.bbox_right) / 2 - cam_w / 2;
    var _ty = (_p.bbox_top + _p.bbox_bottom) / 2 - cam_h / 2;

    // No salir de los límites de la habitación
    _tx = clamp(_tx, 0, room_width - cam_w);
    _ty = clamp(_ty, 0, room_height - cam_h);

    // Movimiento suave hacia ese punto
    var _cx = lerp(camera_get_view_x(camera), _tx, cam_smooth);
    var _cy = lerp(camera_get_view_y(camera), _ty, cam_smooth);
    camera_set_view_pos(camera, _cx, _cy);
}