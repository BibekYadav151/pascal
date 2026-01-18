const branchModel = require('../models/branchModel');

class BranchController {
  // Get all branches
  async getAllBranches(req, res) {
    try {
      const branches = await branchModel.findAll();
      res.json(branches);
    } catch (error) {
      console.error('Error fetching branches:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Get active branches
  async getActiveBranches(req, res) {
    try {
      const branches = await branchModel.findActiveBranches();
      res.json(branches);
    } catch (error) {
      console.error('Error fetching active branches:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Get branch by ID
  async getBranchById(req, res) {
    try {
      const { id } = req.params;
      const branch = await branchModel.findById(id);
      
      if (!branch) {
        return res.status(404).json({ message: 'Branch not found' });
      }
      
      res.json(branch);
    } catch (error) {
      console.error('Error fetching branch:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Create new branch
  async createBranch(req, res) {
    try {
      const {
        name,
        address,
        phone,
        email,
        coordinates,
        workingHours,
        status = 'active'
      } = req.body;

      const branchData = {
        name,
        address,
        phone,
        email,
        coordinates: coordinates || {},
        workingHours: workingHours || {},
        status
      };

      const branch = await branchModel.create(branchData);
      res.status(201).json(branch);
    } catch (error) {
      console.error('Error creating branch:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Update branch
  async updateBranch(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      const branch = await branchModel.update(id, updates);
      if (!branch) {
        return res.status(404).json({ message: 'Branch not found' });
      }
      
      res.json(branch);
    } catch (error) {
      console.error('Error updating branch:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Delete branch
  async deleteBranch(req, res) {
    try {
      const { id } = req.params;
      
      const deleted = await branchModel.delete(id);
      if (!deleted) {
        return res.status(404).json({ message: 'Branch not found' });
      }
      
      res.json({ message: 'Branch deleted successfully' });
    } catch (error) {
      console.error('Error deleting branch:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = new BranchController();