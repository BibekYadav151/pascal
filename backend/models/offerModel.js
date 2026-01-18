const BaseModel = require('./baseModel');

class OfferModel extends BaseModel {
  constructor() {
    super('offers');
  }

  async findActiveOffers() {
    const allOffers = await this.findAll();
    return allOffers.filter(offer => offer.status === 'active');
  }

  async findUpcomingOffers() {
    const allOffers = await this.findAll();
    const now = new Date();
    return allOffers.filter(offer => 
      offer.status === 'upcoming' && 
      new Date(offer.validUntil) > now
    );
  }
}

module.exports = new OfferModel();