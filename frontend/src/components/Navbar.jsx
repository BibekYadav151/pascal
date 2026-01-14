import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui";
import { ArrowRight, Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "../lib/theme-context";

const Navbar = ({ onBookAppointment }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme, mounted } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: "About", path: "/about" },
    { name: "Classes", path: "/classes" },
    { name: "Courses", path: "/courses" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all ${
          scrolled ? "w-[95%] max-w-2xl" : "w-[98%] max-w-4xl"
        }`}
      >
        <nav
          className={`flex items-center justify-between px-6 py-4 rounded-full backdrop-blur-md border transition-all duration-300 ${
            scrolled
              ? "bg-white/50 border-gray-200/50 shadow-lg dark:bg-gray-900/50 dark:border-gray-700/50"
              : "bg-white/30 border-gray-200/30 shadow-md dark:bg-gray-900/30 dark:border-gray-700/30"
          }`}
        >
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-lg hover:opacity-70 transition-opacity"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-blue-500 flex items-center justify-center text-white text-sm font-black">
              PI
            </div>
            <span className="hidden sm:inline text-gray-900 dark:text-white">Pascal Institute</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors ${
                  isActive(link.path) ? "text-gray-900 dark:text-white" : ""
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Theme Switcher and Book Appointment Button */}
          <div className="hidden md:flex items-center gap-3">
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-900/10 dark:hover:bg-white/10 transition-colors text-gray-900 dark:text-white"
                aria-label="Toggle theme"
              >
                {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </button>
            )}
            <Button
              onClick={onBookAppointment}
              className="rounded-full px-6 h-10 bg-orange-500 hover:bg-orange-600 text-white font-medium transition-all hover:scale-105 flex items-center gap-2 cursor-pointer"
            >
              Book Appointment <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-900/10 dark:hover:bg-white/10 transition-colors text-gray-900 dark:text-white"
                aria-label="Toggle theme"
              >
                {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </button>
            )}
            <button
              className="p-2 text-gray-900 hover:bg-gray-900/5 dark:text-white dark:hover:bg-white/5 rounded-full transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 top-24 z-40 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 animate-slide-down">
          <nav className="flex flex-col gap-4 p-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Button
              onClick={onBookAppointment}
              className="w-full mt-4 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-medium"
            >
              Book Appointment
            </Button>
          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar;
