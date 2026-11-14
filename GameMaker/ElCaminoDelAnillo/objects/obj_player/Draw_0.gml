/// Draw Event de obj_player
// Parpadea mientras es invulnerable tras recibir daño
if (!(invuln_timer > 0 && (invuln_timer mod 4) < 2)) {
    // Los dibujos miran a la derecha: facing = -1 los voltea hacia la izquierda
    draw_sprite_ext(sprite_index, image_index, x, y, facing, 1, 0, c_white, 1);
}

// Zona de golpe (solo para depuración): quita las // para verla mientras ajustamos el ataque
// if (attack_timer > 0) {
//     draw_set_alpha(0.5);
//     draw_set_color(c_white);
//     draw_rectangle(atk_x1, atk_y1, atk_x2, atk_y2, false);
//     draw_set_alpha(1);
// }