const heroPrototype = {
  greet() {
    console.log(`hello, my name is ${this.name}!`);
  },
};

export function Hero(name) {
    this.name = name;
    this.level = 1;
    this.max_hp = 100;
    this.hp = 100;
}

Object.assign(Hero.prototype, heroPrototype);
