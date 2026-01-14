const BlogModel = require('../models/blogModel');

const blogController = {
  // Get all blogs with optional filtering
  getAllBlogs: async (req, res) => {
    try {
      const { category, featured, status, search, tag } = req.query;
      let blogs = await BlogModel.findAll();

      // Filter by status (default to 'Published' if not specified)
      if (status) {
        blogs = blogs.filter(blog => blog.status === status);
      } else {
        blogs = blogs.filter(blog => blog.status === 'Published');
      }

      // Filter by featured
      if (featured === 'true') {
        blogs = blogs.filter(blog => blog.featured === true);
      }

      // Filter by category
      if (category) {
        blogs = blogs.filter(blog => blog.category === category);
      }

      // Filter by tag
      if (tag) {
        blogs = blogs.filter(blog =>
          blog.tags && blog.tags.includes(tag)
        );
      }

      // Search in title and excerpt
      if (search) {
        const searchLower = search.toLowerCase();
        blogs = blogs.filter(blog =>
          blog.title.toLowerCase().includes(searchLower) ||
          blog.excerpt.toLowerCase().includes(searchLower)
        );
      }

      // Sort by createdAt (newest first)
      blogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

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
      const blog = await BlogModel.findById(req.params.id);
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
      const blogs = await BlogModel.findAll();
      const blog = blogs.find(b => b.slug === req.params.slug);
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
      const { title, slug, excerpt, content, author, category, tags, imageUrl, readTime, featured, status } = req.body;

      // Validate required fields
      if (!title || !slug || !excerpt || !content || !author) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields'
        });
      }

      // Check if slug already exists
      const blogs = await BlogModel.findAll();
      const existingBlog = blogs.find(b => b.slug === slug);
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
        author,
        category: category || 'General',
        tags: tags || [],
        imageUrl: imageUrl || 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800',
        readTime: readTime || '5 min',
        featured: featured || false,
        status: status || 'Draft'
      };

      const newBlog = await BlogModel.create(blogData);

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
      const blog = await BlogModel.findById(req.params.id);
      if (!blog) {
        return res.status(404).json({
          success: false,
          message: 'Blog not found'
        });
      }

      const updatedBlog = await BlogModel.update(req.params.id, req.body);

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
      const blog = await BlogModel.findById(req.params.id);
      if (!blog) {
        return res.status(404).json({
          success: false,
          message: 'Blog not found'
        });
      }

      await BlogModel.delete(req.params.id);

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
      const blogs = await BlogModel.findAll();
      const categories = [...new Set(blogs.map(blog => blog.category).filter(Boolean))];

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
      const blogs = await BlogModel.findAll();
      const allTags = blogs.flatMap(blog => blog.tags || []);
      const uniqueTags = [...new Set(allTags)];

      res.json({
        success: true,
        data: uniqueTags
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
      const { id, category, limit = 3 } = req.params;
      const blogs = await BlogModel.findAll();

      // Filter out current blog and get published blogs
      let relatedBlogs = blogs.filter(
        blog => blog.id !== parseInt(id) && blog.status === 'Published'
      );

      // Prioritize same category
      if (category) {
        const sameCategory = relatedBlogs.filter(blog => blog.category === category);
        const otherCategory = relatedBlogs.filter(blog => blog.category !== category);
        relatedBlogs = [...sameCategory, ...otherCategory];
      }

      // Limit results
      relatedBlogs = relatedBlogs.slice(0, parseInt(limit));

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
