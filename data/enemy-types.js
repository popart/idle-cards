export const ENEMY_TYPES = {
    slime:  { name: 'slime',  max_hp: 6,  gold: 1 },
    kobold: { name: 'kobold', max_hp: 12, gold: 3 },
    goblin: { name: 'goblin', max_hp: 20, gold: 5 },
};

const ENEMY_TYPE_KEYS = Object.keys(ENEMY_TYPES);

export function randomEnemyType() {
    return ENEMY_TYPE_KEYS[Math.floor(Math.random() * ENEMY_TYPE_KEYS.length)];
}
