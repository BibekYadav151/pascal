const BaseModel = require('./baseModel');

class BranchModel extends BaseModel {
  constructor() {
    super('branches');
  }

  async findActiveBranches() {
    const allBranches = await this.findAll();
    return allBranches.filter(branch => branch.status === 'active');
  }
}

module.exports = new BranchModel();