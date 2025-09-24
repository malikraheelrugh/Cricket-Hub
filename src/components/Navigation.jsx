import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Trophy, Home, Calendar, Users, Newspaper } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/matches', label: 'Matches', icon: Calendar },
    { path: '/asia-cup', label: 'Asia Cup', icon: Trophy },
    { path: '/players-teams', label: 'Players & Teams', icon: Users },
    { path: '/news', label: 'News', icon: Newspaper },
  ];

  return (
    <nav className=" shadow-lg sticky top-0 z-50" style={{ background: "linear-gradient(45deg, #16a34a, #2563eb, #cb8282)" }}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2 text-white">
            <Trophy className="h-8 w-8 " />
            <span className="text-xl font-bold ">CricketHub</span>
          </div>

          <div className="hidden md:flex space-x-8">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-1  px-3 py-2 rounded-lg transition-colors ${location.pathname === path
                  ? 'text-green-600 bg-green-50'
                  : 'text-white hover:text-green-600 hover:bg-green-50'
                  }`}
              >
                <Icon className="h-4 w-4" />
                <span  >{label}</span>
              </Link>
            ))}
          </div>

          <div className="md:hidden flex space-x-4">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`p-2 rounded-lg transition-colors ${location.pathname === path
                  ? 'text-green-600 bg-green-50'
                  : 'text-white hover:text-green-600 hover:bg-green-50'
                  }`}
                title={label}
              >
                <Icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;