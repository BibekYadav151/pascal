const BaseModel = require('./baseModel');

class HeroModel extends BaseModel {
  constructor() {
    super('hero');
  }

  async getActiveHero() {
    const heroes = await this.findAll();
    return heroes.find(hero => hero.isActive) || null;
  }

  async updateActiveHero(data) {
    // First, deactivate all heroes
    const allHeroes = await this.findAll();
    for (const hero of allHeroes) {
      await this.update(hero.id, { isActive: false });
    }
    
    // Create new active hero
    return await this.create({ ...data, isActive: true });
  }
}

module.exports = new HeroModel();