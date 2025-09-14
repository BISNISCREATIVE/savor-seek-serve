import { useState, useEffect } from 'react';
import { ShoppingBag, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { toggleCart } from '@/store/slices/uiSlice';
import { logout, fetchUserProfile } from '@/store/slices/authSlice';
import LoginDialog from '@/components/auth/LoginDialog';
import RegisterDialog from '@/components/auth/RegisterDialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}

export default function Header() {
  const dispatch = useAppDispatch();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showRegisterDialog, setShowRegisterDialog] = useState(false);
  
  const cartItems = useAppSelector((state) => state.cart.items);
  const { user, token } = useAppSelector((state) => state.auth);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Fetch user profile on app load if token exists
    if (token && !user) {
      dispatch(fetchUserProfile());
    }
  }, [token, user, dispatch]);

  const handleCartClick = () => {
    dispatch(toggleCart());
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <header className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled 
          ? "bg-white shadow-elevated" 
          : "bg-transparent"
      )}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                <span className="text-xl">🍽️</span>
              </div>
              <span className={cn(
                "text-2xl font-bold transition-colors",
                isScrolled ? "text-gray-900" : "text-white"
              )}>
                Foody
              </span>
            </div>

            {/* Right Side - Auth & Cart */}
            <div className="flex items-center gap-4">
              {/* Cart */}
              <button 
                onClick={handleCartClick}
                className={cn(
                  "relative p-2 rounded-lg transition-colors duration-200",
                  isScrolled 
                    ? "text-gray-700 hover:bg-gray-100" 
                    : "text-white hover:bg-white/20"
                )}
              >
                <ShoppingBag className="h-6 w-6" />
                {totalItems > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {totalItems}
                  </Badge>
                )}
              </button>

              {/* Authentication */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs bg-orange-500 text-white">
                          {getUserInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className={cn(
                        "text-sm font-semibold",
                        isScrolled ? "text-gray-700" : "text-white"
                      )}>
                        {user.name}
                      </span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem className="cursor-pointer">
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      My Orders
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="cursor-pointer text-red-600 focus:text-red-600"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center gap-3">
                  <Button
                    onClick={() => setShowLoginDialog(true)}
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "font-semibold border-2 transition-all duration-200 rounded-full",
                      isScrolled 
                        ? "text-gray-700 border-gray-300 hover:bg-gray-50"
                        : "text-white border-white/30 hover:bg-white/10"
                    )}
                  >
                    Sign In
                  </Button>
                  <Button
                    onClick={() => setShowRegisterDialog(true)}
                    size="sm"
                    className={cn(
                      "font-semibold transition-all duration-200 rounded-full",
                      isScrolled 
                        ? "bg-primary text-white hover:bg-primary/90"
                        : "bg-white text-gray-800 hover:bg-white/90"
                    )}
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Auth Dialogs */}
      <LoginDialog 
        isOpen={showLoginDialog} 
        onClose={() => setShowLoginDialog(false)}
        onSwitchToRegister={() => {
          setShowLoginDialog(false);
          setShowRegisterDialog(true);
        }}
      />
      <RegisterDialog 
        isOpen={showRegisterDialog} 
        onClose={() => setShowRegisterDialog(false)}
        onSwitchToLogin={() => {
          setShowRegisterDialog(false);
          setShowLoginDialog(true);
        }}
      />
    </>
  );
}