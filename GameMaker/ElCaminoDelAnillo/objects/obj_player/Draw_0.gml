/// Draw Event de obj_player
// Parpadea mientras es invulnerable tras recibir daño
if (!(invuln_timer > 0 && (invuln_timer mod 4) < 2)) {
    draw_self(); // dibuja el sprite del jugador
}

// Zona de golpe provisional (se reemplazará por la animación de la espada)
if (attack_timer > 0) {
    draw_set_alpha(0.5);
    draw_set_color(c_white);
    draw_rectangle(atk_x1, atk_y1, atk_x2, atk_y2, false);
    draw_set_alpha(1);
}