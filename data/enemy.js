const enemyPrototype = {
  greet() {
    console.log(`hello, my name is ${this.name}!`);
  },
};

export function Enemy(name) {
    this.name = name;
    this.level = 1;
    this.max_hp = 10;
    this.hp = 10;
}

Object.assign(Enemy.prototype, enemyPrototype);
