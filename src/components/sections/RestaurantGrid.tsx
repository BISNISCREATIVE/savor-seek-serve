import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useAppSelector } from '@/store/hooks';
import RestaurantCard from '@/components/cards/RestaurantCard';
import { Restaurant } from '@/types';
import { restaurantService } from '@/services/restaurants';

// Mock data for demonstration (fallback)
const mockRestaurants: Restaurant[] = Array.from({ length: 12 }, (_, i) => ({
  id: `restaurant-${i + 1}`,
  name: 'Burger King',
  rating: 4.9,
  location: 'Jakarta Selatan',
  distance: '2.4 km',
  isOpen: true,
  deliveryTime: '25-30 min',
  categoryId: i % 2 === 0 ? 'burger' : 'fastfood',
}));

interface RestaurantGridProps {
  title?: string;
  showSeeAll?: boolean;
  limit?: number;
}

export default function RestaurantGrid({ 
  title = "Recommended", 
  showSeeAll = true,
  limit = 12 
}: RestaurantGridProps) {
  const { category, searchQuery, sortBy, sortOrder } = useAppSelector((state) => state.filters);
  const [showAll, setShowAll] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch restaurants from API
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        let result;
        if (title === "Recommended") {
          result = await restaurantService.getRecommendedRestaurants();
          setRestaurants(result);
        } else {
          const filters = {
            search: searchQuery || undefined,
            category: category !== 'all' ? category : undefined,
            sortBy: sortBy || undefined,
            limit: showAll ? undefined : limit,
          };
          const response = await restaurantService.getRestaurants(filters);
          setRestaurants(response.restaurants);
        }
      } catch (err) {
        console.error('Failed to fetch restaurants:', err);
        setError('Failed to load restaurants. Using demo data.');
        // Fallback to mock data if API fails
        setRestaurants(mockRestaurants);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRestaurants();
  }, [category, searchQuery, sortBy, sortOrder, showAll, limit, title]);

  // Filter and sort restaurants (client-side backup if needed)
  let filteredRestaurants = restaurants;

  // Apply search filter (client-side backup)
  if (searchQuery && restaurants.length > 0) {
    filteredRestaurants = filteredRestaurants.filter(restaurant =>
      restaurant.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.location?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Apply sorting (client-side backup)
  if (sortBy && filteredRestaurants.length > 0) {
    filteredRestaurants.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'rating':
          comparison = (b.rating || 0) - (a.rating || 0);
          break;
        case 'name':
          comparison = (a.name || '').localeCompare(b.name || '');
          break;
        case 'distance':
          comparison = parseFloat(a.distance || '0') - parseFloat(b.distance || '0');
          break;
        default:
          comparison = 0;
      }
      return sortOrder === 'desc' ? comparison : -comparison;
    });
  }

  // Apply limit
  const displayedRestaurants = showAll ? filteredRestaurants : filteredRestaurants.slice(0, limit);

  const handleViewDetails = (restaurant: Restaurant) => {
    console.log('View restaurant details:', restaurant);
    // In a real app, this would navigate to restaurant detail page
  };

  if (isLoading) {
    return (
      <section className="py-12" id="restaurants">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-10 w-24" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="w-full h-32 rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-background" id="restaurants">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-foreground">{title}</h2>
          {showSeeAll && filteredRestaurants.length > limit && (
            <Button 
              variant="link" 
              className="text-red-500 hover:text-red-600 font-bold text-lg"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? 'Show Less' : 'See All'}
            </Button>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
            <p className="text-yellow-800 text-sm">{error}</p>
          </div>
        )}

        {/* Results Count */}
        {(searchQuery || category !== 'all') && (
          <div className="mb-6">
            <p className="text-muted-foreground">
              Found {filteredRestaurants.length} restaurants
              {searchQuery && ` for "${searchQuery}"`}
              {category !== 'all' && ` in ${category}`}
            </p>
          </div>
        )}

        {/* Restaurant Grid */}
        {filteredRestaurants.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No restaurants found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or browse different categories
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedRestaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>

            {/* Show More Button */}
            {!showAll && filteredRestaurants.length > limit && (
              <div className="text-center mt-12">
                <Button 
                  variant="outline" 
                  className="rounded-full px-8"
                  onClick={() => setShowAll(true)}
                >
                  Show More
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}