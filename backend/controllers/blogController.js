const Blog = require('../models/blogModel');

const blogController = {
  // Get all blogs with optional filtering
  getAllBlogs: async (req, res) => {
    try {
      const { category, featured, status, search, tag } = req.query;

      // Build query object
      let query = {};

      // Filter by status (default to 'Published' if not specified)
      query.status = status || 'Published';

      // Filter by featured
      if (featured === 'true') {
        query.featured = true;
      }

      // Filter by category
      if (category) {
        query.category = category;
      }

      // Filter by tag
      if (tag) {
        query.tags = tag;
      }

      // Search in title and excerpt
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { excerpt: { $regex: search, $options: 'i' } }
        ];
      }

      // Execute query and sort by createdAt (newest first)
      const blogs = await Blog.find(query).sort({ createdAt: -1 });

      res.json({
        success: true,
        data: blogs
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching blogs',
        error: error.message
      });
    }
  },

  // Get single blog by ID
  getBlogById: async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      if (!blog) {
        return res.status(404).json({
          success: false,
          message: 'Blog not found'
        });
      }
      res.json({
        success: true,
        data: blog
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching blog',
        error: error.message
      });
    }
  },

  // Get blog by slug
  getBlogBySlug: async (req, res) => {
    try {
      const blog = await Blog.findOne({ slug: req.params.slug });
      if (!blog) {
        return res.status(404).json({
          success: false,
          message: 'Blog not found'
        });
      }
      res.json({
        success: true,
        data: blog
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching blog',
        error: error.message
      });
    }
  },

  // Create new blog
  createBlog: async (req, res) => {
    try {
      const { title, slug, excerpt, content, tableOfContents, author, category, tags, imageUrl, readTime, featured, status } = req.body;

      // Validate required fields
      if (!title || !slug || !excerpt || !content || !author) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields'
        });
      }

      // Check if slug already exists
      const existingBlog = await Blog.findOne({ slug });
      if (existingBlog) {
        return res.status(400).json({
          success: false,
          message: 'Blog with this slug already exists'
        });
      }

      const blogData = {
        title,
        slug,
        excerpt,
        content,
        tableOfContents: tableOfContents || '',
        author,
        category: category || 'General',
        tags: tags || [],
        imageUrl: imageUrl || 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800',
        readTime: readTime || '5 min',
        featured: featured || false,
        status: status || 'Draft'
      };

      const newBlog = await Blog.create(blogData);

      res.status(201).json({
        success: true,
        message: 'Blog created successfully',
        data: newBlog
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error creating blog',
        error: error.message
      });
    }
  },

  // Update blog
  updateBlog: async (req, res) => {
    try {
      const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );

      if (!updatedBlog) {
        return res.status(404).json({
          success: false,
          message: 'Blog not found'
        });
      }

      res.json({
        success: true,
        message: 'Blog updated successfully',
        data: updatedBlog
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error updating blog',
        error: error.message
      });
    }
  },

  // Delete blog
  deleteBlog: async (req, res) => {
    try {
      const blog = await Blog.findByIdAndDelete(req.params.id);

      if (!blog) {
        return res.status(404).json({
          success: false,
          message: 'Blog not found'
        });
      }

      res.json({
        success: true,
        message: 'Blog deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error deleting blog',
        error: error.message
      });
    }
  },

  // Get all categories
  getCategories: async (req, res) => {
    try {
      const categories = await Blog.distinct('category');

      res.json({
        success: true,
        data: categories
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching categories',
        error: error.message
      });
    }
  },

  // Get all tags
  getTags: async (req, res) => {
    try {
      const tags = await Blog.distinct('tags');

      res.json({
        success: true,
        data: tags
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching tags',
        error: error.message
      });
    }
  },

  // Get related blogs
  getRelatedBlogs: async (req, res) => {
    try {
      const { id, category } = req.params;
      const limit = parseInt(req.params.limit) || 3;

      // Get blogs excluding current one and only published
      let relatedBlogs = await Blog.find({
        _id: { $ne: id },
        status: 'Published'
      }).limit(limit * 2); // Get more to filter

      // Prioritize same category
      if (category) {
        const sameCategory = relatedBlogs.filter(blog => blog.category === category);
        const otherCategory = relatedBlogs.filter(blog => blog.category !== category);
        relatedBlogs = [...sameCategory, ...otherCategory];
      }

      // Limit results
      relatedBlogs = relatedBlogs.slice(0, limit);

      res.json({
        success: true,
        data: relatedBlogs
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching related blogs',
        error: error.message
      });
    }
  }
};

module.exports = blogController;
