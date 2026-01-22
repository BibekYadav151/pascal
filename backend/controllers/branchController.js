const BranchModel = require('../models/branchModel');

const branchController = {
  // Get all branches
  getAllBranches: async (req, res) => {
    try {
      const branches = await BranchModel.findAll();
      
      // Sort: main branch first, then others by name
      branches.sort((a, b) => {
        if (a.isMain && !b.isMain) return -1;
        if (!a.isMain && b.isMain) return 1;
        return a.name.localeCompare(b.name);
      });

      res.json({
        success: true,
        data: branches
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching branches',
        error: error.message
      });
    }
  },

  // Get single branch by ID
  getBranchById: async (req, res) => {
    try {
      const branch = await BranchModel.findById(req.params.id);
      if (!branch) {
        return res.status(404).json({
          success: false,
          message: 'Branch not found'
        });
      }
      res.json({
        success: true,
        data: branch
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching branch',
        error: error.message
      });
    }
  },

  // Create new branch
  createBranch: async (req, res) => {
    try {
      const { name, location, address, phone, email, hours, mapUrl, isMain } = req.body;

      // Validate required fields
      if (!name || !location || !address || !phone || !email) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields'
        });
      }

      // If setting as main branch, unset other main branches
      if (isMain) {
        const allBranches = await BranchModel.findAll();
        for (const branch of allBranches) {
          if (branch.isMain) {
            await BranchModel.update(branch.id, { isMain: false });
          }
        }
      }

      const branchData = {
        name,
        location,
        address,
        phone,
        email,
        hours: hours || 'Sun-Fri: 9:00 AM - 6:00 PM',
        mapUrl: mapUrl || '#',
        isMain: isMain || false
      };

      const newBranch = await BranchModel.create(branchData);

      res.status(201).json({
        success: true,
        message: 'Branch created successfully',
        data: newBranch
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error creating branch',
        error: error.message
      });
    }
  },

  // Update branch
  updateBranch: async (req, res) => {
    try {
      const branch = await BranchModel.findById(req.params.id);
      if (!branch) {
        return res.status(404).json({
          success: false,
          message: 'Branch not found'
        });
      }

      // If setting as main branch, unset other main branches
      if (req.body.isMain) {
        const allBranches = await BranchModel.findAll();
        for (const b of allBranches) {
          if (b.isMain && b.id !== parseInt(req.params.id)) {
            await BranchModel.update(b.id, { isMain: false });
          }
        }
      }

      const updatedBranch = await BranchModel.update(req.params.id, req.body);

      res.json({
        success: true,
        message: 'Branch updated successfully',
        data: updatedBranch
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error updating branch',
        error: error.message
      });
    }
  },

  // Delete branch
  deleteBranch: async (req, res) => {
    try {
      const branch = await BranchModel.findById(req.params.id);
      if (!branch) {
        return res.status(404).json({
          success: false,
          message: 'Branch not found'
        });
      }

      await BranchModel.delete(req.params.id);

      res.json({
        success: true,
        message: 'Branch deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error deleting branch',
        error: error.message
      });
    }
  }
};

module.exports = branchController;
