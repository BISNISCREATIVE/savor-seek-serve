import { useState } from 'react';
import { Star, MapPin, Clock, Plus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAppDispatch } from '@/store/hooks';
import { addToCart } from '@/store/slices/cartSlice';
import { Restaurant } from '@/types';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onViewDetails?: (restaurant: Restaurant) => void;
}

// Mock function to generate a burger image URL
const getBurgerImageUrl = (id: string) => {
  const seeds = ['burger', 'food', 'restaurant', 'delicious', 'tasty'];
  const seed = seeds[parseInt(id, 16) % seeds.length] || 'burger';
  return `https://picsum.photos/seed/${seed}-${id}/300/200`;
};

export default function RestaurantCard({ restaurant, onViewDetails }: RestaurantCardProps) {
  const dispatch = useAppDispatch();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Add a sample menu item to cart (in real app, this would show menu first)
    dispatch(addToCart({
      id: `${restaurant.id}-sample`,
      name: `${restaurant.name} Special`,
      price: 25000,
      restaurantId: restaurant.id,
      imageUrl: restaurant.imageUrl,
    }));
  };

  const handleCardClick = () => {
    if (onViewDetails) {
      onViewDetails(restaurant);
    }
  };

  const imageUrl = restaurant.imageUrl || getBurgerImageUrl(restaurant.id);

  return (
    <Card 
      className="group hover:shadow-elevated transition-all duration-300 cursor-pointer overflow-hidden"
      onClick={handleCardClick}
    >
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Restaurant Image */}
          <div className="relative w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 flex-shrink-0">
            <div 
              className={cn(
                "w-full h-full rounded-xl bg-gray-200 overflow-hidden",
                !imageLoaded && "animate-pulse"
              )}
            >
              {!imageError ? (
                <img
                  src={imageUrl}
                  alt={`${restaurant.name} restaurant`}
                  className={cn(
                    "w-full h-full object-cover transition-all duration-300",
                    imageLoaded ? "opacity-100" : "opacity-0"
                  )}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => {
                    setImageError(true);
                    setImageLoaded(true);
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <span className="text-3xl">🍔</span>
                </div>
              )}
            </div>
            
            {/* Status Badge */}
            <Badge 
              variant={restaurant.isOpen !== false ? "default" : "secondary"}
              className="absolute -top-2 -right-2 text-xs"
            >
              {restaurant.isOpen !== false ? "Open" : "Closed"}
            </Badge>
          </div>

          {/* Restaurant Info */}
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-bold text-lg leading-tight line-clamp-1">
                {restaurant.name}
              </h3>
              <Button
                size="sm"
                variant="outline"
                className="flex-shrink-0 w-8 h-8 rounded-full p-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                onClick={handleAddToCart}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium text-sm">
                {restaurant.rating || 4.5}
              </span>
            </div>

            {/* Location & Distance */}
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span className="line-clamp-1">{restaurant.location}</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-muted-foreground" />
              <span>{restaurant.distance}</span>
            </div>

            {/* Delivery Time */}
            {restaurant.deliveryTime && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{restaurant.deliveryTime}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}