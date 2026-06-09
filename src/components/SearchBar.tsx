import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const router = useRouter();

  useEffect(() => {
    if (debouncedSearchTerm) {
      router.push(`/?search=${encodeURIComponent(debouncedSearchTerm)}`);
    } else {
      router.push('/');
    }
  }, [debouncedSearchTerm, router]);

  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="w-5 h-5 text-zinc-400" />
      </div>
      <input
        type="text"
        className="block w-full p-3 pl-10 text-sm text-white bg-zinc-900 border border-zinc-800 rounded-full focus:ring-red-600 focus:border-red-600 outline-none transition-colors"
        placeholder="Search for movies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
