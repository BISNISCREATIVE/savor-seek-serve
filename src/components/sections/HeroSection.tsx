import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppDispatch } from '@/store/hooks';
import { setSearchQuery } from '@/store/slices/filtersSlice';
import heroImage from '@/assets/hero-burger.jpg';

export default function HeroSection() {
  const dispatch = useAppDispatch();
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setSearchQuery(searchInput));
    // Scroll to results section
    document.getElementById('restaurants')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroImage}
          alt="Delicious gourmet burger with fresh ingredients"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="container mx-auto px-4 text-center text-white">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                Explore Culinary Experiences
              </h1>
              <p className="text-xl md:text-2xl font-semibold text-left max-w-2xl mx-auto opacity-90">
                Search and refine your choice to discover the perfect restaurant.
              </p>
            </div>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="relative bg-white rounded-full p-2 shadow-elevated">
                <div className="flex items-center">
                  <Search className="ml-4 h-5 w-5 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Search restaurants, food and drink"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="flex-1 border-0 bg-transparent px-4 py-3 text-gray-900 placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                  <Button 
                    type="submit"
                    className="rounded-full bg-primary hover:bg-primary/90 px-6 py-3"
                  >
                    Search
                  </Button>
                </div>
              </div>
            </form>

            {/* Quick Actions */}
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button variant="outline" className="rounded-full border-white/30 text-white hover:bg-white/20">
                🍕 Pizza
              </Button>
              <Button variant="outline" className="rounded-full border-white/30 text-white hover:bg-white/20">
                🍔 Burgers
              </Button>
              <Button variant="outline" className="rounded-full border-white/30 text-white hover:bg-white/20">
                🍜 Asian
              </Button>
              <Button variant="outline" className="rounded-full border-white/30 text-white hover:bg-white/20">
                🥗 Healthy
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}