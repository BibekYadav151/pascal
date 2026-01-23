const Branch = require('../models/branchModel');

const branchController = {
  // Get all branches
  getAllBranches: async (req, res) => {
    try {
      // Sort: main branch first, then others by name
      const branches = await Branch.find().sort({ isMain: -1, name: 1 });

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
      const branch = await Branch.findById(req.params.id);
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
        await Branch.updateMany({ isMain: true }, { isMain: false });
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

      const newBranch = await Branch.create(branchData);

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
      // If setting as main branch, unset other main branches
      if (req.body.isMain) {
        await Branch.updateMany(
          { isMain: true, _id: { $ne: req.params.id } },
          { isMain: false }
        );
      }

      const updatedBranch = await Branch.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );

      if (!updatedBranch) {
        return res.status(404).json({
          success: false,
          message: 'Branch not found'
        });
      }

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
      const branch = await Branch.findByIdAndDelete(req.params.id);

      if (!branch) {
        return res.status(404).json({
          success: false,
          message: 'Branch not found'
        });
      }

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
