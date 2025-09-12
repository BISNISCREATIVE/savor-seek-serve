import { Minus, Plus, Trash, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { updateQuantity, removeFromCart, clearCart } from '@/store/slices/cartSlice';
import { setCartOpen } from '@/store/slices/uiSlice';

export default function CartDrawer() {
  const dispatch = useAppDispatch();
  const { items, total, itemCount } = useAppSelector((state) => state.cart);
  const { isCartOpen } = useAppSelector((state) => state.ui);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCheckout = () => {
    // In a real app, this would navigate to checkout
    console.log('Proceeding to checkout with items:', items);
    dispatch(setCartOpen(false));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={(open) => dispatch(setCartOpen(open))}>
      <SheetContent side="right" className="w-full sm:w-[400px] p-0">
        <div className="flex h-full flex-col">
          {/* Header */}
          <SheetHeader className="p-6 pb-4">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-xl font-bold">
                Your Order
              </SheetTitle>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="px-2 py-1">
                  {itemCount} items
                </Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => dispatch(setCartOpen(false))}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </SheetHeader>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto px-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-8">
                <div className="text-6xl mb-4">🛒</div>
                <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
                <p className="text-muted-foreground mb-4">
                  Add some delicious items to get started
                </p>
                <Button onClick={() => dispatch(setCartOpen(false))}>
                  Browse Menu
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Clear Cart Button */}
                <div className="flex justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearCart}
                    className="text-red-500 hover:text-red-600"
                  >
                    Clear All
                  </Button>
                </div>

                {/* Cart Items List */}
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                    {/* Item Image */}
                    <div className="w-16 h-16 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-2xl">🍔</span>
                        </div>
                      )}
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium line-clamp-1">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {formatPrice(item.price)}
                      </p>
                      
                      {item.notes && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Note: {item.notes}
                        </p>
                      )}

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500 hover:text-red-600"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <Trash className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer with Total and Checkout */}
          {items.length > 0 && (
            <div className="border-t p-6 space-y-4">
              <Separator />
              
              {/* Order Summary */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Delivery Fee</span>
                  <span>{formatPrice(5000)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Service Fee</span>
                  <span>{formatPrice(2000)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(total + 7000)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Button 
                onClick={handleCheckout}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                size="lg"
              >
                Proceed to Checkout
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}