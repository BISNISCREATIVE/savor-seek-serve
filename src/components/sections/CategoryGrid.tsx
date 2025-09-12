import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setCategory } from '@/store/slices/filtersSlice';
import { cn } from '@/lib/utils';

const categories = [
  { id: 'all', name: 'All Restaurant', icon: '🍽️' },
  { id: 'nearby', name: 'Nearby', icon: '📍' },
  { id: 'discount', name: 'Discount', icon: '🏷️' },
  { id: 'bestseller', name: 'Best Seller', icon: '🏆' },
  { id: 'delivery', name: 'Delivery', icon: '🚚' },
  { id: 'lunch', name: 'Lunch', icon: '🍽️' },
];

export default function CategoryGrid() {
  const dispatch = useAppDispatch();
  const { category: activeCategory } = useAppSelector((state) => state.filters);

  const handleCategoryClick = (categoryId: string) => {
    dispatch(setCategory(categoryId));
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant="ghost"
              className={cn(
                "h-auto p-0 hover:bg-transparent",
                activeCategory === cat.id && "ring-2 ring-primary"
              )}
              onClick={() => handleCategoryClick(cat.id)}
            >
              <Card 
                className={cn(
                  "w-full flex flex-col items-center justify-center gap-3 p-6 hover:shadow-md transition-all duration-200 cursor-pointer",
                  activeCategory === cat.id 
                    ? "border-primary bg-primary/5 shadow-card" 
                    : "hover:border-primary/50"
                )}
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-orange-50">
                  <span className="text-2xl">{cat.icon}</span>
                </div>
                <span className="text-sm font-semibold text-center leading-tight">
                  {cat.name}
                </span>
              </Card>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}