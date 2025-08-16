"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, MapPin, Package, DollarSign, Leaf, Check, AlertCircle, X, Camera, Star, Users, Zap, TrendingUp, Shield, Clock, Award } from "lucide-react";

export default function SellWastePage() {
  const [formData, setFormData] = useState({
    category: "",
    productName: "",
    quantity: "",
    unit: "kg",
    location: "",
    description: "",
    expectedPrice: "",
    images: [] as File[],
    condition: "",
    pickupPreference: "",
    contactMethod: "phone",
    urgency: "normal"
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentStats, setCurrentStats] = useState({ users: 0, items: 0, earnings: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Animated counter effect
  useEffect(() => {
    const finalStats = { users: 127, items: 2847, earnings: 1450000 };
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      setCurrentStats({
        users: Math.floor(finalStats.users * easeOut),
        items: Math.floor(finalStats.items * easeOut),
        earnings: Math.floor(finalStats.earnings * easeOut)
      });
      
      if (step >= steps) clearInterval(timer);
    }, stepDuration);
    
    return () => clearInterval(timer);
  }, []);

  const wasteCategories = [
    { 
      value: "plastic", 
      label: "♻️ Plastic Bottles", 
      color: "bg-blue-100 text-blue-800 border-blue-200",
      price: "$0.50/kg",
      demand: "High"
    },
    { 
      value: "paper", 
      label: "📄 Paper & Cardboard", 
      color: "bg-amber-100 text-amber-800 border-amber-200",
      price: "$0.30/kg",
      demand: "Very High"
    },
    { 
      value: "ewaste", 
      label: "💻 Electronics", 
      color: "bg-purple-100 text-purple-800 border-purple-200",
      price: "$15/kg",
      demand: "Medium"
    },
    { 
      value: "metal", 
      label: "⚙️ Scrap Metal", 
      color: "bg-gray-100 text-gray-800 border-gray-200",
      price: "$2.50/kg",
      demand: "High"
    },
    { 
      value: "organic", 
      label: "🌱 Organic Waste", 
      color: "bg-green-100 text-green-800 border-green-200",
      price: "$0.10/kg",
      demand: "Medium"
    },
    { 
      value: "glass", 
      label: "🪟 Glass Bottles", 
      color: "bg-cyan-100 text-cyan-800 border-cyan-200",
      price: "$0.40/kg",
      demand: "Medium"
    },
    { 
      value: "textile", 
      label: "👕 Used Clothing", 
      color: "bg-pink-100 text-pink-800 border-pink-200",
      price: "$1.20/kg",
      demand: "Low"
    },
    { 
      value: "other", 
      label: "📦 Other Materials", 
      color: "bg-orange-100 text-orange-800 border-orange-200",
      price: "Varies",
      demand: "Variable"
    }
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.category) newErrors.category = "Please select a waste category";
    if (!formData.productName.trim()) newErrors.productName = "Product name is required";
    if (!formData.quantity || Number(formData.quantity) <= 0) newErrors.quantity = "Valid quantity is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (formData.expectedPrice && Number(formData.expectedPrice) < 0) newErrors.expectedPrice = "Price cannot be negative";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + formData.images.length > 5) {
      setErrors({ ...errors, images: "Maximum 5 images allowed" });
      return;
    }

    const newImages = [...formData.images, ...files];
    setFormData({ ...formData, images: newImages });

    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviewImages([...previewImages, ...newPreviews]);
    
    if (errors.images) {
      setErrors({ ...errors, images: "" });
    }
  };

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    const newPreviews = previewImages.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
    setPreviewImages(newPreviews);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log("Waste Product Submitted:", formData);
    setShowSuccess(true);
    setIsSubmitting(false);
    
    setTimeout(() => {
      setShowSuccess(false);
      setFormData({
        category: "",
        productName: "",
        quantity: "",
        unit: "kg",
        location: "",
        description: "",
        expectedPrice: "",
        images: [],
        condition: "",
        pickupPreference: "",
        contactMethod: "phone",
        urgency: "normal"
      });
      setPreviewImages([]);
      setErrors({});
    }, 3000);
  };

  const selectedCategory = wasteCategories.find(cat => cat.value === formData.category);

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full blur-3xl opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full blur-2xl opacity-15 animate-pulse delay-500"></div>
        
        {/* Floating elements */}
        <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-green-400 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-700"></div>
        <div className="absolute top-3/4 right-1/3 w-2 h-2 bg-yellow-400 rounded-full animate-bounce delay-1000"></div>
      </div>

      <div className="relative z-10 p-6 lg:p-10">
        {/* Enhanced Success Modal */}
        {showSuccess && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 text-center shadow-2xl animate-bounce">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Check className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-3">Listing Created! 🎉</h3>
              <p className="text-gray-600 mb-4">Your waste listing has been submitted successfully. Buyers will contact you soon!</p>
              <div className="flex items-center justify-center gap-2 text-sm text-green-600 bg-green-50 px-4 py-2 rounded-full">
                <Clock className="w-4 h-4" />
                <span>Expected response within 2 hours</span>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Hero Section */}
        <section className="text-center mb-20">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-6 py-3 rounded-full text-sm font-semibold mb-8 shadow-lg">
            <Leaf className="w-5 h-5" />
            <span>🌍 #1 Eco-Marketplace in India</span>
            <Award className="w-5 h-5" />
          </div>
          
          <h1 className="text-6xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 mb-8 leading-tight">
            Transform Waste
            <br />
            Into <span className="text-yellow-500">💰 Wealth</span>
          </h1>
          
          <p className="text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-8">
            Join India's largest waste-to-wealth platform. Connect with verified buyers, 
            get instant quotes, and earn money while saving the planet! 🌱
          </p>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
              <Shield className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-gray-700">100% Secure</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">4.8/5 Rating</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Fast Growing</span>
            </div>
          </div>
          
          {/* Enhanced Stats with animations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Users, label: "Active Users", value: `${currentStats.users}K+`, color: "from-blue-500 to-blue-600" },
              { icon: Package, label: "Items Sold", value: `${(currentStats.items / 1000).toFixed(1)}K+`, color: "from-green-500 to-emerald-600" },
              { icon: DollarSign, label: "Total Earnings", value: `₹${(currentStats.earnings / 100000).toFixed(1)}L+`, color: "from-purple-500 to-purple-600" }
            ].map((stat, idx) => (
              <div key={idx} className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="font-bold text-3xl text-gray-800 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Form Section */}
        <section className="max-w-5xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-3xl border border-white/50 overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-10 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-transparent"></div>
              <div className="relative z-10">
                <h2 className="text-5xl font-bold mb-4">List Your Waste Material</h2>
                <p className="text-xl text-green-100 mb-6">Get instant quotes from verified buyers across India</p>
                <div className="flex items-center gap-4 text-green-100">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">Quick Response</span>
                  </div>
                  <div className="w-1 h-1 bg-green-200 rounded-full"></div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    <span className="text-sm">Verified Buyers</span>
                  </div>
                  <div className="w-1 h-1 bg-green-200 rounded-full"></div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm">Best Prices</span>
                  </div>
                </div>
              </div>
            </div>
            
            <form className="p-10 space-y-10" onSubmit={handleSubmit}>
              {/* Enhanced Category Selection */}
              <div>
                <label className="block text-lg font-bold text-gray-800 mb-4">
                  Select Waste Category *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {wasteCategories.map((category) => (
                    <button
                      key={category.value}
                      type="button"
                      onClick={() => handleChange({ target: { name: 'category', value: category.value } } as any)}
                      className={`relative p-6 rounded-2xl border-2 text-left transition-all duration-300 group ${
                        formData.category === category.value
                          ? 'border-green-500 bg-green-50 text-green-700 scale-105 shadow-lg'
                          : 'border-gray-200 bg-white hover:border-green-300 hover:bg-green-50 hover:shadow-md'
                      }`}
                    >
                      <div className="flex flex-col">
                        <div className="text-lg font-semibold mb-2">{category.label}</div>
                        <div className="text-sm text-gray-600 mb-1">Avg Price: {category.price}</div>
                        <div className={`inline-flex items-center text-xs px-2 py-1 rounded-full w-fit ${
                          category.demand === 'Very High' ? 'bg-red-100 text-red-700' :
                          category.demand === 'High' ? 'bg-orange-100 text-orange-700' :
                          category.demand === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          Demand: {category.demand}
                        </div>
                      </div>
                      {formData.category === category.value && (
                        <div className="absolute top-3 right-3 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                {errors.category && <p className="text-red-500 text-sm mt-2">{errors.category}</p>}
              </div>

              {/* Product Details */}
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-lg font-bold text-gray-800 mb-3">
                    Product/Material Name *
                  </label>
                  <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    placeholder="e.g., PET Bottles (500ml), Old Newspapers, Copper Wire"
                    className={`w-full border-2 p-5 rounded-xl focus:outline-none transition-all text-lg ${
                      errors.productName ? 'border-red-300 focus:border-red-500 bg-red-50' : 'border-gray-200 focus:border-green-500 focus:shadow-lg'
                    }`}
                  />
                  {errors.productName && <p className="text-red-500 text-sm mt-2">{errors.productName}</p>}
                </div>

                <div>
                  <label className="block text-lg font-bold text-gray-800 mb-3">
                    Condition Assessment
                  </label>
                  <select
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 p-5 rounded-xl focus:outline-none focus:border-green-500 focus:shadow-lg text-lg"
                  >
                    <option value="">Select condition</option>
                    <option value="excellent">Excellent - Like new</option>
                    <option value="good">Good - Minor wear</option>
                    <option value="fair">Fair - Some damage</option>
                    <option value="poor">Poor - Heavily used</option>
                  </select>
                </div>
              </div>

              {/* Quantity and Price */}
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <label className="block text-lg font-bold text-gray-800 mb-3">
                    Quantity Available *
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="Enter amount"
                    min="0"
                    step="0.1"
                    className={`w-full border-2 p-5 rounded-xl focus:outline-none transition-all text-lg ${
                      errors.quantity ? 'border-red-300 focus:border-red-500 bg-red-50' : 'border-gray-200 focus:border-green-500 focus:shadow-lg'
                    }`}
                  />
                  {errors.quantity && <p className="text-red-500 text-sm mt-2">{errors.quantity}</p>}
                </div>

                <div>
                  <label className="block text-lg font-bold text-gray-800 mb-3">
                    Unit of Measurement
                  </label>
                  <select
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 p-5 rounded-xl focus:outline-none focus:border-green-500 focus:shadow-lg text-lg"
                  >
                    <option value="kg">Kilograms (kg)</option>
                    <option value="tons">Metric Tons</option>
                    <option value="pieces">Individual Pieces</option>
                    <option value="lbs">Pounds (lbs)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-lg font-bold text-gray-800 mb-3">
                    Expected Price (₹)
                  </label>
                  <input
                    type="number"
                    name="expectedPrice"
                    value={formData.expectedPrice}
                    onChange={handleChange}
                    placeholder="Your asking price"
                    min="0"
                    step="0.01"
                    className={`w-full border-2 p-5 rounded-xl focus:outline-none transition-all text-lg ${
                      errors.expectedPrice ? 'border-red-300 focus:border-red-500 bg-red-50' : 'border-gray-200 focus:border-green-500 focus:shadow-lg'
                    }`}
                  />
                  {errors.expectedPrice && <p className="text-red-500 text-sm mt-2">{errors.expectedPrice}</p>}
                  {selectedCategory && (
                    <p className="text-sm text-gray-600 mt-2">
                      Market rate: {selectedCategory.price}
                    </p>
                  )}
                </div>
              </div>

              {/* Location and Pickup */}
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-lg font-bold text-gray-800 mb-3">
                    <MapPin className="inline w-5 h-5 mr-2" />
                    Location Details *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g., Sector 18, Noida, UP or Pin: 201301"
                    className={`w-full border-2 p-5 rounded-xl focus:outline-none transition-all text-lg ${
                      errors.location ? 'border-red-300 focus:border-red-500 bg-red-50' : 'border-gray-200 focus:border-green-500 focus:shadow-lg'
                    }`}
                  />
                  {errors.location && <p className="text-red-500 text-sm mt-2">{errors.location}</p>}
                </div>

                <div>
                  <label className="block text-lg font-bold text-gray-800 mb-3">
                    Pickup/Delivery Options
                  </label>
                  <select
                    name="pickupPreference"
                    value={formData.pickupPreference}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 p-5 rounded-xl focus:outline-none focus:border-green-500 focus:shadow-lg text-lg"
                  >
                    <option value="">Choose preference</option>
                    <option value="pickup">Buyer arranges pickup</option>
                    <option value="delivery">I can deliver (within 5km)</option>
                    <option value="either">Flexible - Either option</option>
                  </select>
                </div>
              </div>

              {/* Enhanced Images Upload */}
              <div>
                <label className="block text-lg font-bold text-gray-800 mb-3">
                  <Camera className="inline w-5 h-5 mr-2" />
                  Upload Photos (Up to 5 images)
                </label>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center cursor-pointer hover:border-green-400 hover:bg-green-50 transition-all duration-300 group"
                >
                  <div className="group-hover:scale-110 transition-transform duration-300">
                    <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-xl text-gray-600 mb-2 font-medium">Drop images here or click to browse</p>
                    <p className="text-sm text-gray-500">PNG, JPG, WEBP up to 10MB each</p>
                  </div>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
                
                {previewImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-6">
                    {previewImages.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded-xl border-2 border-gray-200 shadow-md"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {errors.images && <p className="text-red-500 text-sm mt-2">{errors.images}</p>}
              </div>

              {/* Description */}
              <div>
                <label className="block text-lg font-bold text-gray-800 mb-3">
                  Additional Information
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Provide detailed description: How was it used? Any special features? Storage conditions? Why are you selling?"
                  className="w-full border-2 border-gray-200 p-5 rounded-xl focus:outline-none focus:border-green-500 focus:shadow-lg resize-none text-lg"
                />
              </div>

              {/* Contact and Urgency */}
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-lg font-bold text-gray-800 mb-3">
                    Preferred Contact Method
                  </label>
                  <select
                    name="contactMethod"
                    value={formData.contactMethod}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 p-5 rounded-xl focus:outline-none focus:border-green-500 focus:shadow-lg text-lg"
                  >
                    <option value="phone">Phone Call</option>
                    <option value="whatsapp">WhatsApp Message</option>
                    <option value="email">Email</option>
                    <option value="message">Platform Message</option>
                  </select>
                </div>

                <div>
                  <label className="block text-lg font-bold text-gray-800 mb-3">
                    How Urgent is This Sale?
                  </label>
                  <select
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 p-5 rounded-xl focus:outline-none focus:border-green-500 focus:shadow-lg text-lg"
                  >
                    <option value="normal">Normal - Within 1 month</option>
                    <option value="urgent">Urgent - Within 1 week</option>
                    <option value="asap">ASAP - Within 2 days</option>
                  </select>
                </div>
              </div>

              {/* Enhanced Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white py-6 px-8 rounded-2xl font-bold text-xl hover:from-green-700 hover:via-emerald-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 shadow-2xl relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
                  {isSubmitting ? (
                    <>
                      <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Creating Your Listing...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-6 h-6" />
                      <span>🚀 List My Waste & Start Earning</span>
                    </>
                  )}
                </button>
                
                <p className="text-center text-gray-600 mt-4 text-sm">
                  By listing, you agree to our terms. Your listing will be reviewed within 30 minutes.
                </p>
              </div>
            </form>
          </div>
        </section>

        {/* Enhanced Benefits Section */}
        <section className="mt-24">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 px-6 py-3 rounded-full text-sm font-semibold mb-6">
              <Star className="w-4 h-4" />
              India's Most Trusted Platform
            </div>
            <h3 className="text-6xl font-bold text-gray-800 mb-6">
              Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">WasteToWealth</span>?
            </h3>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Join the sustainable revolution with India's #1 waste marketplace
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {[
              {
                icon: Package,
                title: "AI-Powered Matching",
                text: "Our smart algorithms connect you with the most relevant buyers for your specific waste materials, ensuring maximum value.",
                color: "from-blue-500 to-blue-600",
                features: ["Smart categorization", "Price optimization", "Quality assessment"]
              },
              {
                icon: Users,
                title: "Verified Buyer Network",
                text: "Connect with 5000+ verified recyclers, manufacturers, and eco-businesses across India. All buyers are KYC verified.",
                color: "from-green-500 to-green-600",
                features: ["KYC verified buyers", "Real-time chat", "Secure transactions"]
              },
              {
                icon: DollarSign,
                title: "Guaranteed Best Prices",
                text: "Our competitive bidding system and market insights ensure you get premium rates for your waste materials.",
                color: "from-purple-500 to-purple-600",
                features: ["Live price tracking", "Bidding system", "Price alerts"]
              },
              {
                icon: Leaf,
                title: "Environmental Impact Tracking",
                text: "Track your contribution to carbon footprint reduction and get certificates for your environmental impact.",
                color: "from-emerald-500 to-emerald-600",
                features: ["Carbon credits", "Impact certificates", "Sustainability reports"]
              },
              {
                icon: Zap,
                title: "Lightning Fast Process",
                text: "Get quotes within 2 hours, complete transactions in 24 hours. Our streamlined process saves you time and effort.",
                color: "from-yellow-500 to-orange-600",
                features: ["2-hour response", "Same-day pickup", "Instant payments"]
              },
              {
                icon: Shield,
                title: "100% Safe & Secure",
                text: "End-to-end encryption, secure payments through escrow, and comprehensive insurance coverage for all transactions.",
                color: "from-pink-500 to-red-600",
                features: ["Escrow protection", "Transaction insurance", "24/7 support"]
              }
            ].map((item, idx) => (
              <div
                key={idx}
                className="group relative p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl border border-white/50 transition-all duration-500 hover:scale-105 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <item.icon className="w-10 h-10 text-white" />
                  </div>
                  
                  <h4 className="font-bold text-2xl text-gray-800 mb-4">{item.title}</h4>
                  <p className="text-gray-600 leading-relaxed mb-6">{item.text}</p>
                  
                  <div className="space-y-2">
                    {item.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${item.color}`}></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Enhanced Call to Action */}
        <section className="mt-24">
          <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-12 text-white max-w-6xl mx-auto relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/5 to-transparent rounded-full transform translate-x-32 -translate-y-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-br from-white/5 to-transparent rounded-full transform -translate-x-24 translate-y-24"></div>
            
            <div className="relative z-10 text-center">
              <h4 className="text-5xl font-bold mb-6">Ready to Transform Your Waste? 🌟</h4>
              <p className="text-2xl text-green-100 mb-8 leading-relaxed">
                Join 127,000+ users who are already earning money while saving the planet.<br />
                Start your sustainable journey today!
              </p>
              
              <div className="flex flex-wrap justify-center gap-6 mb-8">
                <button className="bg-white text-green-600 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-green-50 transition-all duration-300 shadow-lg hover:scale-105 flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Browse Categories
                </button>
                <button className="border-3 border-white text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-green-600 transition-all duration-300 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Join Community
                </button>
              </div>
              
              <div className="flex flex-wrap justify-center gap-8 text-green-100">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  <span>100% Safe & Secure</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>Quick 2-Hour Response</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  <span>4.8★ User Rating</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="mt-24">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-800 mb-4">What Our Users Say 💬</h3>
            <p className="text-xl text-gray-600">Real stories from real people making a difference</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Rajesh Kumar",
                location: "Delhi",
                image: "👨‍💼",
                text: "Sold 200kg of plastic waste and earned ₹15,000! The process was so smooth and buyers contacted me within hours.",
                earning: "₹15,000 earned"
              },
              {
                name: "Priya Sharma", 
                location: "Mumbai",
                image: "👩‍🏫",
                text: "As a teacher, I love how this platform helps me teach kids about recycling while earning money from school waste.",
                earning: "₹8,500 earned"
              },
              {
                name: "Amit Patel",
                location: "Bangalore", 
                image: "👨‍💻",
                text: "Perfect for our office e-waste disposal. Got better prices than local dealers and helped environment too!",
                earning: "₹25,000 earned"
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-4xl">{testimonial.image}</div>
                  <div>
                    <div className="font-bold text-lg text-gray-800">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.location}</div>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center justify-between">
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <div className="text-sm font-semibold text-green-600">{testimonial.earning}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
