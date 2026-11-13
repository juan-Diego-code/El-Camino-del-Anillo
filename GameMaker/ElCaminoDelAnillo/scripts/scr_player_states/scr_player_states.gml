/// Estados del jugador.
/// Deciden qué animación se muestra (más adelante, un sprite por estado).
enum PlayerState {
    IDLE,    // quieto en el suelo
    RUN,     // caminando en el suelo
    AIR,     // saltando o cayendo
    ATTACK,  // atacando
    HURT     // retrocediendo por un golpe
}