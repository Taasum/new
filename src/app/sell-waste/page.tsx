"use client";

import { useState, useRef } from "react";
import { 
  ShoppingCart, 
  Heart, 
  Star, 
  Filter, 
  Search, 
  Leaf, 
  Award, 
  Truck, 
  Shield, 
  Zap, 
  Recycle, 
  Gift,
  ChevronDown,
  Plus,
  Minus,
  ArrowRight,
  CheckCircle,
  Globe,
  Users,
  Sparkles
} from "lucide-react";

export default function ZentaraEcoMarketplace() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cartItems, setCartItems] = useState(0);
  const [ecoPoints, setEcoPoints] = useState(1250);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", name: "All Products", icon: <Globe className="w-5 h-5" />, count: 2847 },
    { id: "home", name: "Eco Home", icon: <Leaf className="w-5 h-5" />, count: 486 },
    { id: "fashion", name: "Sustainable Fashion", icon: "👕", count: 623 },
    { id: "beauty", name: "Natural Beauty", icon: "🌿", count: 234 },
    { id: "food", name: "Organic Food", icon: "🥬", count: 567 },
    { id: "tech", name: "Green Tech", icon: "💻", count: 189 },
    { id: "garden", name: "Garden & Plant", icon: "🌱", count: 345 },
    { id: "baby", name: "Eco Baby", icon: "👶", count: 156 },
    { id: "office", name: "Green Office", icon: "📋", count: 247 }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "Bamboo Fiber Dinnerware Set",
      price: 2499,
      originalPrice: 3199,
      image: "🍽️",
      rating: 4.8,
      reviews: 234,
      ecoPoints: 125,
      discount: 22,
      category: "home",
      features: ["Biodegradable", "BPA Free", "Dishwasher Safe"],
      inStock: true,
      fastShipping: true
    },
    {
      id: 2,
      name: "Organic Cotton T-Shirt Collection",
      price: 1799,
      originalPrice: 2299,
      image: "👕",
      rating: 4.9,
      reviews: 567,
      ecoPoints: 90,
      discount: 22,
      category: "fashion",
      features: ["GOTS Certified", "Fair Trade", "Carbon Neutral"],
      inStock: true,
      fastShipping: true
    },
    {
      id: 3,
      name: "Solar Power Bank 20000mAh",
      price: 3999,
      originalPrice: 4999,
      image: "🔋",
      rating: 4.7,
      reviews: 189,
      ecoPoints: 200,
      discount: 20,
      category: "tech",
      features: ["Solar Charging", "Wireless Charging", "Waterproof"],
      inStock: true,
      fastShipping: false
    },
    {
      id: 4,
      name: "Natural Skincare Gift Set",
      price: 2799,
      originalPrice: 3599,
      image: "🧴",
      rating: 4.9,
      reviews: 423,
      ecoPoints: 140,
      discount: 22,
      category: "beauty",
      features: ["Cruelty Free", "Organic", "Zero Plastic"],
      inStock: true,
      fastShipping: true
    },
    {
      id: 5,
      name: "Hydroponic Garden Kit",
      price: 5999,
      originalPrice: 7499,
      image: "🌱",
      rating: 4.8,
      reviews: 156,
      ecoPoints: 300,
      discount: 20,
      category: "garden",
      features: ["Soil-Free", "LED Grow Light", "Smart Watering"],
      inStock: true,
      fastShipping: true
    },
    {
      id: 6,
      name: "Recycled Paper Notebook Set",
      price: 899,
      originalPrice: 1199,
      image: "📓",
      rating: 4.6,
      reviews: 89,
      ecoPoints: 45,
      discount: 25,
      category: "office",
      features: ["100% Recycled", "Tree-Free", "Carbon Neutral"],
      inStock: true,
      fastShipping: true
    }
  ];

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const addToCart = () => {
    setCartItems(prev => prev + 1);
  };

  const filteredProducts = selectedCategory === "all" 
    ? featuredProducts 
    : featuredProducts.filter(product => product.category === selectedCategory);

  return (
    <main className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 min-h-screen">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 -left-32 w-64 h-64 bg-emerald-200 rounded-full opacity-15 animate-bounce" style={{ animationDelay: "1s", animationDuration: "4s" }}></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-teal-200 rounded-full opacity-25" style={{ animation: "float 8s ease-in-out infinite" }}></div>
      </div>

      {/* Enhanced Header */}
      <header className="relative bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white py-6 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo & Search */}
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Leaf className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Zentara</h1>
                  <p className="text-xs opacity-80">Eco Marketplace</p>
                </div>
              </div>
              
              <div className="hidden md:flex relative">
                <Search className="absolute left-4 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search eco-friendly products..."
                  className="w-96 pl-12 pr-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/70 focus:outline-none focus:bg-white/20 transition-all"
                />
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-6">
              <div className="hidden md:flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Sparkles className="w-5 h-5 text-yellow-300" />
                <span className="font-semibold">{ecoPoints.toLocaleString()}</span>
                <span className="text-sm opacity-80">Eco Points</span>
              </div>
              
              <div className="relative">
                <Heart className="w-6 h-6 cursor-pointer hover:text-pink-300 transition-colors" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </div>
              
              <div className="relative">
                <ShoppingCart className="w-6 h-6 cursor-pointer hover:text-green-300 transition-colors" />
                {cartItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="relative py-16 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
                <Award className="w-5 h-5 mr-2 text-yellow-300" />
                <span className="text-sm font-medium">India's #1 Eco Marketplace</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
                Shop 🌱 Sustainable
                <span className="block text-transparent bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text">
                  Live Better
                </span>
              </h1>
              
              <p className="text-xl mb-8 opacity-90">
                Discover 2,800+ eco-friendly products. Earn eco points on every purchase and 
                save the planet while saving money!
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-300" />
                  <span className="text-sm">Free Shipping ₹999+</span>
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-300" />
                  <span className="text-sm">Carbon Neutral Delivery</span>
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-300" />
                  <span className="text-sm">30-Day Returns</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all cursor-pointer">
                    <div className="text-4xl mb-3">🌱</div>
                    <h3 className="font-semibold mb-2">Sustainable Living</h3>
                    <p className="text-sm opacity-80">Eco-friendly home products</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all cursor-pointer">
                    <div className="text-4xl mb-3">♻️</div>
                    <h3 className="font-semibold mb-2">Zero Waste</h3>
                    <p className="text-sm opacity-80">Reduce, reuse, recycle</p>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all cursor-pointer">
                    <div className="text-4xl mb-3">🌍</div>
                    <h3 className="font-semibold mb-2">Planet Positive</h3>
                    <p className="text-sm opacity-80">Every purchase helps Earth</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all cursor-pointer">
                    <div className="text-4xl mb-3">💚</div>
                    <h3 className="font-semibold mb-2">Health First</h3>
                    <p className="text-sm opacity-80">Chemical-free living</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Shop by Category</h2>
            <Filter className="w-6 h-6 text-gray-600 cursor-pointer hover:text-green-600 transition-colors" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-9 gap-4">
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`cursor-pointer rounded-xl p-4 text-center transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category.id
                    ? 'bg-green-500 text-white shadow-xl'
                    : 'bg-white/60 backdrop-blur-sm hover:bg-green-100 text-gray-700'
                }`}
              >
                <div className="text-2xl mb-2 flex justify-center">
                  {typeof category.icon === 'string' ? category.icon : category.icon}
                </div>
                <h3 className="text-sm font-semibold mb-1">{category.name}</h3>
                <p className="text-xs opacity-70">{category.count} items</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              {selectedCategory === "all" ? "Featured Products" : categories.find(c => c.id === selectedCategory)?.name}
            </h2>
            <div className="text-sm text-gray-600">
              Showing {filteredProducts.length} products
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white/80 backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/20"
              >
                {/* Product Image & Badges */}
                <div className="relative bg-gradient-to-br from-green-100 to-emerald-100 h-48 flex items-center justify-center">
                  <div className="text-8xl group-hover:scale-110 transition-transform duration-300">
                    {product.image}
                  </div>
                  
                  {/* Discount Badge */}
                  {product.discount > 0 && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                      {product.discount}% OFF
                    </div>
                  )}
                  
                  {/* Fast Shipping Badge */}
                  {product.fastShipping && (
                    <div className="absolute top-4 right-4 bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center">
                      <Zap className="w-3 h-3 mr-1" />
                      Fast
                    </div>
                  )}
                  
                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`absolute bottom-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      wishlist.includes(product.id)
                        ? 'bg-pink-500 text-white scale-110'
                        : 'bg-white/80 text-gray-600 hover:bg-pink-100 hover:text-pink-500'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${wishlist.includes(product.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-700">{product.rating}</span>
                      <span className="text-sm text-gray-500">({product.reviews})</span>
                    </div>
                    <div className="flex items-center text-green-600 text-sm font-medium">
                      <Gift className="w-4 h-4 mr-1" />
                      {product.ecoPoints} Points
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-green-600 transition-colors">
                    {product.name}
                  </h3>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {product.features.slice(0, 2).map((feature, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                    {product.features.length > 2 && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        +{product.features.length - 2} more
                      </span>
                    )}
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-gray-800">
                        ₹{product.price.toLocaleString()}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-lg text-gray-400 line-through">
                          ₹{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Stock Status */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`flex items-center text-sm ${
                      product.inStock ? 'text-green-600' : 'text-red-500'
                    }`}>
                      <CheckCircle className="w-4 h-4 mr-1" />
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </div>
                    {product.fastShipping && (
                      <div className="flex items-center text-sm text-blue-600">
                        <Truck className="w-4 h-4 mr-1" />
                        Fast Delivery
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <button
                      onClick={addToCart}
                      disabled={!product.inStock}
                      className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-300 ${
                        product.inStock
                          ? 'bg-green-500 hover:bg-green-600 text-white transform hover:scale-105'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                    <button className="px-4 py-3 border-2 border-green-500 text-green-500 rounded-xl hover:bg-green-50 transition-all duration-300">
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eco Points & Benefits */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Earn More, Save More! 🌟</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Every eco-friendly purchase earns you points. Use them for discounts on future orders!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Earn Points</h3>
              <p className="opacity-90 mb-4">Get 1 eco point for every ₹10 spent on sustainable products</p>
              <div className="bg-white/20 rounded-xl p-4">
                <span className="text-3xl font-bold">1,250</span>
                <p className="text-sm opacity-80">Your Current Points</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <Gift className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Redeem Rewards</h3>
              <p className="opacity-90 mb-4">Use 100 points = ₹10 discount on your next purchase</p>
              <div className="bg-white/20 rounded-xl p-4">
                <span className="text-3xl font-bold">₹125</span>
                <p className="text-sm opacity-80">Available Discount</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Refer Friends</h3>
              <p className="opacity-90 mb-4">Get 500 bonus points for each friend who makes their first purchase</p>
              <div className="bg-white/20 rounded-xl p-4">
                <span className="text-3xl font-bold">3</span>
                <p className="text-sm opacity-80">Friends Referred</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recently Viewed & Recommendations */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          {/* Recently Viewed Products */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-800">Recently Viewed</h2>
              <button className="text-green-600 hover:text-green-700 font-medium flex items-center">
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: "Bamboo Toothbrush Set", price: "₹299", image: "🪥", rating: 4.8 },
                { name: "Organic Cotton Bag", price: "₹449", image: "🛍️", rating: 4.9 },
                { name: "Solar LED Lantern", price: "₹899", image: "🏮", rating: 4.7 },
                { name: "Natural Face Wash", price: "₹349", image: "🧴", rating: 4.6 }
              ].map((item, i) => (
                <div key={i} className="bg-white/80 backdrop-blur-sm rounded-xl p-4 hover:shadow-lg transition-all cursor-pointer group">
                  <div className="text-4xl text-center mb-3 group-hover:scale-110 transition-transform">{item.image}</div>
                  <h4 className="font-semibold text-sm mb-2 text-center">{item.name}</h4>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-green-600">{item.price}</span>
                    <div className="flex items-center text-xs text-gray-600">
                      <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                      {item.rating}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Special Offers & Deals */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Limited Time Offers 🔥</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Flash Sale */}
              <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-white text-red-500 px-3 py-1 rounded-full text-sm font-bold">
                  FLASH SALE
                </div>
                <h3 className="text-3xl font-bold mb-4">Up to 50% OFF</h3>
                <p className="text-lg mb-6 opacity-90">Organic Beauty Products</p>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
                    <div className="text-2xl font-bold">2</div>
                    <div className="text-xs">Days</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
                    <div className="text-2xl font-bold">14</div>
                    <div className="text-xs">Hours</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
                    <div className="text-2xl font-bold">32</div>
                    <div className="text-xs">Mins</div>
                  </div>
                </div>
                <button className="bg-white text-red-500 font-bold px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors">
                  Shop Now
                </button>
              </div>

              {/* Bundle Offer */}
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-white text-green-500 px-3 py-1 rounded-full text-sm font-bold">
                  BUNDLE
                </div>
                <h3 className="text-3xl font-bold mb-4">Buy 2 Get 1 FREE</h3>
                <p className="text-lg mb-6 opacity-90">Eco Home Essentials</p>
                <div className="flex items-center space-x-2 mb-6">
                  <div className="text-4xl">🏠</div>
                  <div className="text-2xl">+</div>
                  <div className="text-4xl">🌱</div>
                  <div className="text-2xl">=</div>
                  <div className="text-4xl">💚</div>
                </div>
                <button className="bg-white text-green-500 font-bold px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors">
                  Explore Bundles
                </button>
              </div>
            </div>
          </div>

          {/* Customer Reviews Section */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">What Our Customers Say 💬</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Priya Sharma",
                  location: "Mumbai",
                  rating: 5,
                  review: "Amazing quality bamboo products! My family loves the eco-friendly dinnerware set. Fast delivery and great packaging too.",
                  product: "Bamboo Dinnerware Set",
                  avatar: "👩"
                },
                {
                  name: "Rahul Gupta",
                  location: "Delhi",
                  rating: 5,
                  review: "The solar power bank is a game changer! Works perfectly and helps reduce my carbon footprint. Highly recommended!",
                  product: "Solar Power Bank",
                  avatar: "👨"
                },
                {
                  name: "Anjali Patel",
                  location: "Bangalore",
                  rating: 5,
                  review: "Love the organic skincare products. My skin feels so much better since switching to chemical-free options from Zentara.",
                  product: "Natural Skincare Set",
                  avatar: "👩‍💼"
                }
              ].map((review, i) => (
                <div key={i} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 hover:shadow-lg transition-all">
                  <div className="flex items-center mb-4">
                    <div className="text-3xl mr-3">{review.avatar}</div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{review.name}</h4>
                      <p className="text-sm text-gray-600">{review.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-gray-700 mb-4 leading-relaxed">"{review.review}"</p>
                  
                  <div className="bg-green-50 rounded-lg p-3">
                    <p className="text-sm text-green-700 font-medium">
                      Purchased: {review.product}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
        }
      `}</style>
    </main>
  );
}