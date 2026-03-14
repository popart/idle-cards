import { ENEMY_TYPES } from './enemy-types.js';

const enemyPrototype = {
  greet() {
    console.log(`hello, my name is ${this.name}!`);
  },
};

export function Enemy(type) {
    const def = ENEMY_TYPES[type];
    if (!def) throw new Error(`Unknown enemy type: ${type}`);
    this.type = type;
    this.name = def.name;
    this.level = 1;
    this.max_hp = def.max_hp;
    this.hp = def.max_hp;
    this.gold = def.gold;
}

Object.assign(Enemy.prototype, enemyPrototype);
