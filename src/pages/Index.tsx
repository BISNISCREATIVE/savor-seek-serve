import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import CategoryGrid from "@/components/sections/CategoryGrid";
import RestaurantGrid from "@/components/sections/RestaurantGrid";
import CartDrawer from "@/components/cart/CartDrawer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <CategoryGrid />
        <RestaurantGrid />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
};

export default Index;
