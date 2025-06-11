import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { useAuth } from '@/contexts/AuthContext';
import { ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Events", href: "/events" },
    { name: "Blog", href: "/blog" },
    { name: "Members", href: "/members" },
    { name: "Contact", href: "/contact" },
  ];

  const adminItems = [
    { name: "Blog Admin", href: "/blog-admin" },
    { name: "Events Admin", href: "/events-admin" },
    { name: "Feedbacks", href: "/feedbacks" },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <img 
                src="/WarP Icon.png" 
                alt="WarP Logo" 
                className="h-10 w-10 transition-transform group-hover:scale-110"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-orbitron font-bold text-lg text-primary group-hover:text-primary/80 transition-colors">
                WarP
              </span>
              <span className="font-fira text-xs text-muted-foreground -mt-1">
                Computer Club
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="font-fira text-sm text-foreground/80 hover:text-primary transition-colors duration-200 hover:scale-105 transform"
              >
                {item.name}
              </Link>
            ))}
            
            {user && isAdmin() && (
              <div className="relative group">
                <button className="font-fira text-sm text-foreground/80 hover:text-primary transition-colors duration-200 flex items-center">
                  Admin
                  <ChevronDown className="ml-1 h-3 w-3" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-background/95 backdrop-blur-md border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {adminItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="block px-4 py-2 font-fira text-sm text-foreground/80 hover:text-primary hover:bg-primary/10 transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {user ? (
              <div className="flex items-center space-x-4">
                <span className="font-fira text-sm text-muted-foreground">
                  {user.email}
                </span>
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  size="sm"
                  className="font-fira"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => navigate('/auth')}
                className="font-fira bg-primary hover:bg-primary/80"
                size="sm"
              >
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background/90 backdrop-blur-md border-b border-border">
          <div className="container mx-auto px-4 py-6 flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="font-fira text-sm text-foreground/80 hover:text-primary transition-colors duration-200 block py-2"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {user && isAdmin() && (
              <div className="border-t border-border pt-4">
                <span className="font-fira text-xs text-muted-foreground block mb-2">
                  Admin Panel
                </span>
                {adminItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="font-fira text-sm text-foreground/80 hover:text-primary transition-colors duration-200 block py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}

            <div className="border-t border-border pt-4">
              {user ? (
                <div className="flex flex-col space-y-2">
                  <span className="font-fira text-sm text-muted-foreground">
                    {user.email}
                  </span>
                  <Button
                    onClick={handleSignOut}
                    variant="outline"
                    size="sm"
                    className="font-fira w-full"
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => {
                    navigate('/auth');
                    setIsOpen(false);
                  }}
                  className="font-fira bg-primary hover:bg-primary/80 w-full"
                  size="sm"
                >
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
