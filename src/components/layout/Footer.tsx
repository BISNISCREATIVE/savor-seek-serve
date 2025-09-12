import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Footer() {
  const exploreLinks = [
    'All Food',
    'Nearby',
    'Discount', 
    'Best Seller',
    'Delivery',
    'Lunch'
  ];

  const helpLinks = [
    'How to Order',
    'Payment Methods',
    'Track My Order',
    'FAQ',
    'Contact Us'
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-card">
                <span className="text-xl">🍽️</span>
              </div>
              <span className="text-2xl font-bold">Foody</span>
            </div>
            
            <p className="text-gray-300 leading-relaxed">
              Enjoy homemade flavors & chef's signature dishes, freshly prepared every day. 
              Order online or visit our nearest branch.
            </p>

            <div className="space-y-4">
              <h4 className="font-bold">Follow on Social Media</h4>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="icon" className="rounded-full border-gray-600 hover:bg-primary">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full border-gray-600 hover:bg-primary">
                  <Instagram className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full border-gray-600 hover:bg-primary">
                  <Linkedin className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Explore Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold">Explore</h3>
            <ul className="space-y-3">
              {exploreLinks.map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold">Help</h3>
            <ul className="space-y-3">
              {helpLinks.map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2024 Foody. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}