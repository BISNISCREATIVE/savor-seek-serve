import { useState } from 'react';
import { ShoppingCart, Menu, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { toggleCart, setMenuOpen } from '@/store/slices/uiSlice';
import { setSearchQuery } from '@/store/slices/filtersSlice';

export default function Header() {
  const dispatch = useAppDispatch();
  const { itemCount } = useAppSelector((state) => state.cart);
  const { searchQuery } = useAppSelector((state) => state.filters);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setSearchQuery(localSearch));
  };

  const handleCartClick = () => {
    dispatch(toggleCart());
  };

  const handleMenuClick = () => {
    dispatch(setMenuOpen(true));
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={handleMenuClick}
            >
              <Menu className="h-6 w-6" />
            </Button>
            
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-card">
                <span className="text-xl">🍽️</span>
              </div>
              <span className="text-2xl font-bold text-foreground">Foody</span>
            </div>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <form 
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-md mx-8"
          >
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search restaurants, food and drink"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="pl-10 pr-4 rounded-full bg-secondary"
              />
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Auth Buttons - Hidden on mobile */}
            <div className="hidden lg:flex items-center gap-2">
              <Button variant="outline" className="rounded-full">
                Sign In
              </Button>
              <Button className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
                Sign Up
              </Button>
            </div>

            {/* User Icon - Mobile only */}
            <Button variant="ghost" size="icon" className="lg:hidden">
              <User className="h-5 w-5" />
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={handleCartClick}
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                >
                  {itemCount > 99 ? '99+' : itemCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search restaurants, food and drink"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="pl-10 pr-4 rounded-full bg-secondary"
              />
            </div>
          </form>
        </div>
      </div>
    </header>
  );
}