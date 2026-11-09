/// Step Event de obj_enemy_parent
if (hit_timer > 0) hit_timer--;

if (hp <= 0) {
    instance_destroy();
}