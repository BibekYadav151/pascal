class BaseController {
  constructor(model) {
    this.model = model;
  }

  // Basic CRUD operations
  async getAll(req, res) {
    try {
      const items = await this.model.findAll();
      res.json({ success: true, data: items });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const item = await this.model.findById(id);

      if (!item) {
        return res.status(404).json({ success: false, message: 'Item not found' });
      }

      res.json({ success: true, data: item });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async create(req, res) {
    try {
      const item = await this.model.create(req.body);
      res.status(201).json({ success: true, data: item });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const item = await this.model.update(id, req.body);

      if (!item) {
        return res.status(404).json({ success: false, message: 'Item not found' });
      }

      res.json({ success: true, data: item });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await this.model.delete(id);

      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Item not found' });
      }

      res.json({ success: true, message: 'Item deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = BaseController;