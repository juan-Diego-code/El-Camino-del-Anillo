/// Create Event de obj_camera
cam_w = 960;    // ancho de lo que se ve
cam_h = 540;    // alto de lo que se ve
cam_smooth = 0.1; // suavidad del seguimiento (más bajo = más suave)

view_enabled = true;
view_visible[0] = true;
view_wport[0] = cam_w;
view_hport[0] = cam_h;

camera = camera_create_view(0, 0, cam_w, cam_h);
view_camera[0] = camera;

window_set_size(cam_w, cam_h);
surface_resize(application_surface, cam_w, cam_h);