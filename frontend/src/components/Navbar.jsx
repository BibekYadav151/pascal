import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Menu, X } from "lucide-react";
import { Button } from "./ui";
import pascalLogo from "../assets/pascal-logo.jpg";

const Navbar = ({ onBookAppointment }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
      { name: "Offers", path: "/offers" },
      { name: "Blogs", path: "/blogs" },
      { name: "Gallery", path: "/gallery" },
      { name: "Contact", path: "/contact" },
    ],
    []
  );

  const isActive = (path) => location.pathname === path;

  const navShellClassName = `backdrop-blur-md border transition-all duration-300 ${
    scrolled
      ? "bg-white/90 border-gray-200/70 shadow-lg"
      : "bg-white/95 border-gray-200/50 shadow-md"
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
            scrolled ? "px-4 py-2" : "px-6 py-2"
          } ${navShellClassName}`}
        >
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-lg hover:opacity-70 transition-opacity shrink-0"
          >
            <img
              src={pascalLogo}
              alt="Pascal Education Consultancy Logo"
              className="
    w-9 h-9 md:w-10 md:h-10
     rounded-lg
    transition-all  
    hover:scale-125 hover:drop-lg
  "
            />

            {/* Large screens */}
            <span className="hidden lg:inline">
              <span className="text-orange-600">Pascal</span>{" "}
              <span className="text-blue-600">Edu. Consultancy</span>
            </span>

            {/* Medium screens */}
            <span className="hidden md:inline lg:hidden">
              <span className="text-orange-600">Pascal</span>
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
                className={`text-gray-600 hover:text-black transition-colors ${
                  isActive(link.path) ? "text-black" : ""
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center shrink-0">
            <Button
              onClick={onBookAppointment}
              className={`rounded-full bg-orange-500 hover:bg-orange-600 text-white font-medium transition-all hover:scale-[1.03] flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                scrolled ? "px-4 h-8 text-sm" : "px-6 h-8 text-sm"
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
              <span className="text-black">Pascal</span>
            </Link>

            <div className="flex items-center gap-2">
              <button
                className="p-2 text-black hover:bg-gray-900/5 rounded-full transition-colors"
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
          <div className="rounded-2xl border border-gray-200/70 bg-white backdrop-blur-md shadow-xl">
            <nav className="flex flex-col gap-2 p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-xl font-medium transition-colors ${
                    isActive(link.path)
                      ? "bg-gray-900/5 text-black"
                      : "text-gray-700 hover:bg-gray-900/5"
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
