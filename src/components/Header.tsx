"use client";

import Link from 'next/link';
import { Film } from 'lucide-react';
import SearchBar from './SearchBar';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled ? "glass shadow-lg" : "bg-transparent bg-gradient-to-b from-black/80 to-transparent"
      )}
    >
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 text-white hover:text-red-500 transition-colors">
          <Film className="w-8 h-8 text-red-600" />
          <span className="text-2xl font-bold tracking-wider">CINE<span className="text-red-600">SEARCH</span></span>
        </Link>
        
        <div className="w-full sm:w-auto flex-1 flex justify-end">
          <SearchBar />
        </div>
      </div>
    </header>
  );
}
