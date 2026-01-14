import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "../lib/theme-context";
import { Button } from "./ui";

const Navbar = ({ onBookAppointment }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme, mounted } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = useMemo(
    () => [
      { name: "About", path: "/about" },
      { name: "Classes", path: "/classes" },
      { name: "Courses", path: "/courses" },
      { name: "Contact", path: "/contact" },
    ],
    []
  );

  const isActive = (path) => location.pathname === path;

  const navShellClassName = `backdrop-blur-md border transition-all duration-300 ${
    scrolled
      ? "bg-white/60 border-gray-200/60 shadow-lg dark:bg-gray-900/60 dark:border-gray-700/60"
      : "bg-white/35 border-gray-200/40 shadow-md dark:bg-gray-900/35 dark:border-gray-700/40"
  }`;

  return (
    <>
      {/* Desktop Navbar */}
      <header
        className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-300 hidden md:block ${
          scrolled ? "top-3" : "top-6"
        } ${scrolled ? "w-[96%] max-w-5xl" : "w-[98%] max-w-6xl"}`}
      >
        <nav
          className={`flex items-center justify-between rounded-full ${
            scrolled ? "px-4 py-3" : "px-6 py-4"
          } ${navShellClassName}`}
        >
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-lg hover:opacity-70 transition-opacity shrink-0"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-blue-500 flex items-center justify-center text-white text-sm font-black">
              PI
            </div>
            <span className="hidden lg:inline text-gray-900 dark:text-white">
              Pascal Institute
            </span>
            <span className="hidden md:inline lg:hidden text-gray-900 dark:text-white">
              Pascal
            </span>
          </Link>

          {/* Navigation Links */}
          <div
            className={`hidden md:flex flex-1 items-center justify-center text-sm font-medium whitespace-nowrap ${
              scrolled ? "gap-6" : "gap-8"
            }`}
          >
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

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-900/10 dark:hover:bg-white/10 transition-colors text-gray-900 dark:text-white"
                aria-label="Toggle theme"
                type="button"
              >
                {theme === "light" ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </button>
            )}
            <Button
              onClick={onBookAppointment}
              className={`rounded-full bg-orange-500 hover:bg-orange-600 text-white font-medium transition-all hover:scale-[1.03] flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                scrolled ? "px-4 h-9 text-sm" : "px-6 h-10 text-sm"
              }`}
            >
              <span className="hidden lg:inline">Book Appointment</span>
              <span className="lg:hidden">Book</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </nav>
      </header>

      {/* Mobile Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 md:hidden">
        <div className="px-4 pt-4">
          <nav
            className={`flex items-center justify-between px-4 py-3 rounded-2xl ${navShellClassName}`}
          >
            <Link
              to="/"
              className="flex items-center gap-2 font-bold text-base hover:opacity-70 transition-opacity"
              aria-label="Pascal Institute"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-blue-500 flex items-center justify-center text-white text-sm font-black">
                PI
              </div>
              <span className="text-gray-900 dark:text-white">Pascal</span>
            </Link>

            <div className="flex items-center gap-2">
              {mounted && (
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-gray-900/10 dark:hover:bg-white/10 transition-colors text-gray-900 dark:text-white"
                  aria-label="Toggle theme"
                  type="button"
                >
                  {theme === "light" ? (
                    <Moon className="h-5 w-5" />
                  ) : (
                    <Sun className="h-5 w-5" />
                  )}
                </button>
              )}
              <button
                className="p-2 text-gray-900 hover:bg-gray-900/5 dark:text-white dark:hover:bg-white/5 rounded-full transition-colors"
                onClick={() => setMobileMenuOpen((s) => !s)}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                type="button"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 top-20 z-40 px-4 pb-6 animate-slide-down md:hidden">
          <div className="rounded-2xl border border-gray-200/70 bg-white/95 backdrop-blur-md shadow-xl dark:border-gray-700/70 dark:bg-gray-900/95">
            <nav className="flex flex-col gap-2 p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-xl font-medium transition-colors ${
                    isActive(link.path)
                      ? "bg-gray-900/5 text-gray-900 dark:bg-white/10 dark:text-white"
                      : "text-gray-700 hover:bg-gray-900/5 dark:text-gray-300 dark:hover:bg-white/10"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              <Button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBookAppointment?.();
                }}
                className="w-full mt-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-medium h-11"
              >
                Book Appointment
              </Button>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
