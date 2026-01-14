import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tableOfContents, setTableOfContents] = useState([]);

  useEffect(() => {
    fetchBlog();
  }, [slug]);

  useEffect(() => {
    if (blog) {
      generateTableOfContents();
      fetchRelatedBlogs();
    }
  }, [blog]);

  const fetchBlog = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/blogs/slug/${slug}`);
      const data = await response.json();
      if (data.success) {
        setBlog(data.data);
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedBlogs = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/blogs/related/${blog.id}/${blog.category}`);
      const data = await response.json();
      if (data.success) {
        setRelatedBlogs(data.data);
      }
    } catch (error) {
      console.error('Error fetching related blogs:', error);
    }
  };

  const generateTableOfContents = () => {
    if (!blog) return;

    // Parse markdown-style headers from content
    const headerRegex = /^(#{2,3})\s+(.+)$/gm;
    const headers = [];
    let match;

    while ((match = headerRegex.exec(blog.content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');

      headers.push({
        level,
        text,
        id
      });
    }

    setTableOfContents(headers);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderContent = (content) => {
    if (!content) return '';

    // Simple markdown parser
    let html = content
      // Headers
      .replace(/^### (.*$)/gim, '<h3 className="text-title-lg text-gray-900 mt-8 mb-4 font-semibold">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 className="text-title-md text-gray-900 mt-10 mb-6 font-bold">$1</h2>')
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong className="font-semibold text-gray-900">$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/g, '<em className="italic">$1</em>')
      // Lists
      .replace(/^\* (.*$)/gim, '<li className="ml-6 list-disc text-body text-gray-700 mb-2">$1</li>')
      .replace(/(<li.*<\/li>)/s, '<ul className="mb-6">$1</ul>')
      // Line breaks
      .replace(/\n\n/g, '</p><p className="text-body text-gray-700 mb-4">')
      .replace(/\n/g, '<br />');

    return <div className="prose prose-lg max-w-none">{html}</div>;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-title-lg text-gray-900 mb-2">Article not found</h2>
          <p className="text-body text-gray-600 mb-6">The article you're looking for doesn't exist or has been removed.</p>
          <Link
            to="/blogs"
            className="inline-flex items-center px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Articles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <section className="bg-gray-900">
        <div className="max-w-7xl mx-auto container-spacing py-12">
          <div className="flex items-center gap-2 mb-4">
            <Link to="/blogs" className="text-gray-400 hover:text-white transition-colors">
              Articles
            </Link>
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-400">{blog.category}</span>
          </div>

          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                {blog.category}
              </span>
              {blog.featured && (
                <span className="px-3 py-1 bg-yellow-500 text-white text-xs font-semibold rounded-full">
                  ⭐ Featured
                </span>
              )}
              <span className="text-gray-400 text-sm flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {blog.readTime}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {blog.title}
            </h1>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {blog.excerpt}
            </p>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {blog.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-white font-semibold">{blog.author}</p>
                  <p className="text-gray-400 text-sm">Published on {formatDate(blog.createdAt)}</p>
                </div>
              </div>

              <div className="ml-auto flex items-center gap-3">
                <button className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
                <button className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-50"></div>
      </section>

      {/* Featured Image */}
      <section className="relative -mt-4">
        <div className="max-w-7xl mx-auto container-spacing">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-spacing">
        <div className="max-w-7xl mx-auto container-spacing">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Table of Contents - Sticky Sidebar */}
            {tableOfContents.length > 0 && (
              <aside className="hidden lg:block lg:col-span-1">
                <div className="sticky top-8">
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-title-md text-gray-900 mb-4 font-semibold">
                      Table of Contents
                    </h3>
                    <nav className="space-y-2">
                      {tableOfContents.map((header, index) => (
                        <a
                          key={index}
                          href={`#${header.id}`}
                          className={`block text-sm transition-colors ${
                            header.level === 3
                              ? 'text-gray-600 hover:text-gray-900 pl-4'
                              : 'text-gray-900 font-medium hover:text-blue-600'
                          }`}
                        >
                          {header.text}
                        </a>
                      ))}
                    </nav>
                  </div>

                  {/* Share Card */}
                  <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
                    <h3 className="text-title-md text-gray-900 mb-4 font-semibold">
                      Share this article
                    </h3>
                    <div className="flex gap-2">
                      <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                        Facebook
                      </button>
                      <button className="flex-1 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors text-sm font-medium">
                        Twitter
                      </button>
                      <button className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                        WhatsApp
                      </button>
                    </div>
                  </div>
                </div>
              </aside>
            )}

            {/* Main Content */}
            <article className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                {/* Tags */}
                {blog.tags && blog.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-8 pb-8 border-b border-gray-200">
                    {blog.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Content */}
                <div className="blog-content text-gray-700 leading-relaxed">
                  {renderContent(blog.content)}
                </div>

                {/* Article Footer */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xl">
                          {blog.author.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-gray-900 font-semibold text-lg">Written by {blog.author}</p>
                        <p className="text-gray-500 text-sm">Expert in study abroad consultancy</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <Link to="/blogs" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Back to</p>
                      <p className="font-semibold text-gray-900">All Articles</p>
                    </div>
                  </div>
                </Link>
              </div>
            </article>

            {/* Related Articles Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-8">
                {relatedBlogs.length > 0 && (
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-title-md text-gray-900 mb-6 font-semibold">
                      Related Articles
                    </h3>
                    <div className="space-y-6">
                      {relatedBlogs.map((relatedBlog) => (
                        <Link
                          key={relatedBlog.id}
                          to={`/blogs/${relatedBlog.slug}`}
                          className="group block"
                        >
                          <div className="flex gap-4">
                            <img
                              src={relatedBlog.imageUrl}
                              alt={relatedBlog.title}
                              className="w-20 h-20 object-cover rounded-lg flex-shrink-0 group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="flex-1">
                              <span className="text-xs text-gray-500 mb-1 block">
                                {relatedBlog.category}
                              </span>
                              <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                                {relatedBlog.title}
                              </h4>
                              <span className="text-xs text-gray-500 mt-1 block">
                                {relatedBlog.readTime}
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>

                    <Link
                      to="/blogs"
                      className="block w-full mt-6 text-center py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-lg hover:border-gray-900 hover:text-gray-900 transition-colors"
                    >
                      View All Articles
                    </Link>
                  </div>
                )}

                {/* CTA Card */}
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg p-6 mt-6">
                  <h3 className="text-title-md text-white mb-3 font-semibold">
                        Need Help?
                  </h3>
                  <p className="text-blue-100 text-sm mb-4">
                    Our experts are here to help you with your study abroad journey.
                  </p>
                  <Link
                    to="/contact"
                    className="block w-full text-center py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetail;
