
"use client";

import { useState, useRef } from "react";
import { Upload, MapPin, Package, DollarSign, Leaf, Check, AlertCircle, X, Camera, Star, Users, Zap } from "lucide-react";

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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const wasteCategories = [
    { value: "plastic", label: "♻️ Plastic", color: "bg-blue-100 text-blue-800" },
    { value: "paper", label: "📄 Paper", color: "bg-yellow-100 text-yellow-800" },
    { value: "ewaste", label: "💻 E-waste", color: "bg-purple-100 text-purple-800" },
    { value: "metal", label: "⚙️ Metal", color: "bg-gray-100 text-gray-800" },
    { value: "organic", label: "🌱 Organic", color: "bg-green-100 text-green-800" },
    { value: "glass", label: "🪟 Glass", color: "bg-cyan-100 text-cyan-800" },
    { value: "textile", label: "👕 Textile", color: "bg-pink-100 text-pink-800" },
    { value: "other", label: "📦 Other", color: "bg-orange-100 text-orange-800" }
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

    // Create preview URLs
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
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log("Waste Product Submitted:", formData);
    setShowSuccess(true);
    setIsSubmitting(false);
    
    // Reset form after 3 seconds
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
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-green-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-yellow-400 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 p-6 lg:p-10">
        {/* Success Modal */}
        {showSuccess && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center animate-pulse">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Success! 🎉</h3>
              <p className="text-gray-600">Your waste listing has been submitted and will be reviewed shortly.</p>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Leaf className="w-4 h-4" />
            Eco-Friendly Marketplace
          </div>
          <h1 className="text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 mb-6 leading-tight">
            Turn Waste Into 
            <br />
            <span className="text-5xl lg:text-6xl">💰 Wealth</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Join thousands of eco-warriors who are making money while saving the planet. 
            List your waste materials and connect with verified buyers instantly.
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            {[
              { icon: Users, label: "Active Users", value: "50K+" },
              { icon: Package, label: "Items Sold", value: "2M+" },
              { icon: DollarSign, label: "Earnings Generated", value: "$1M+" }
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="w-12 h-12 bg-white shadow-lg rounded-xl flex items-center justify-center mx-auto mb-2">
                  <stat.icon className="w-6 h-6 text-green-600" />
                </div>
                <div className="font-bold text-2xl text-gray-800">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Form Section */}
        <section className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl border border-white/50 overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-8 text-white">
              <h2 className="text-4xl font-bold mb-2">List Your Waste</h2>
              <p className="text-green-100">Fill out the details below to get started</p>
            </div>
            
            <form className="p-8 space-y-8" onSubmit={handleSubmit}>
              {/* Category Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Waste Category *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {wasteCategories.map((category) => (
                    <button
                      key={category.value}
                      type="button"
                      onClick={() => handleChange({ target: { name: 'category', value: category.value } } as any)}
                      className={`p-4 rounded-xl border-2 text-sm font-medium transition-all ${
                        formData.category === category.value
                          ? 'border-green-500 bg-green-50 text-green-700 scale-105'
                          : 'border-gray-200 bg-white hover:border-green-300 hover:bg-green-50'
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
              </div>

              {/* Product Details */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    placeholder="e.g., Used plastic bottles, Old newspapers"
                    className={`w-full border-2 p-4 rounded-xl focus:outline-none transition-colors ${
                      errors.productName ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                    }`}
                  />
                  {errors.productName && <p className="text-red-500 text-sm mt-1">{errors.productName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Condition
                  </label>
                  <select
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 p-4 rounded-xl focus:outline-none focus:border-green-500"
                  >
                    <option value="">Select condition</option>
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                    <option value="poor">Poor</option>
                  </select>
                </div>
              </div>

              {/* Quantity and Price */}
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Quantity *
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                    step="0.1"
                    className={`w-full border-2 p-4 rounded-xl focus:outline-none transition-colors ${
                      errors.quantity ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                    }`}
                  />
                  {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Unit
                  </label>
                  <select
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 p-4 rounded-xl focus:outline-none focus:border-green-500"
                  >
                    <option value="kg">Kilograms</option>
                    <option value="lbs">Pounds</option>
                    <option value="pieces">Pieces</option>
                    <option value="tons">Tons</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Expected Price ($)
                  </label>
                  <input
                    type="number"
                    name="expectedPrice"
                    value={formData.expectedPrice}
                    onChange={handleChange}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className={`w-full border-2 p-4 rounded-xl focus:outline-none transition-colors ${
                      errors.expectedPrice ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                    }`}
                  />
                  {errors.expectedPrice && <p className="text-red-500 text-sm mt-1">{errors.expectedPrice}</p>}
                </div>
              </div>

              {/* Location and Pickup */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <MapPin className="inline w-4 h-4 mr-1" />
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="City, State or ZIP code"
                    className={`w-full border-2 p-4 rounded-xl focus:outline-none transition-colors ${
                      errors.location ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                    }`}
                  />
                  {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Pickup Preference
                  </label>
                  <select
                    name="pickupPreference"
                    value={formData.pickupPreference}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 p-4 rounded-xl focus:outline-none focus:border-green-500"
                  >
                    <option value="">Select preference</option>
                    <option value="pickup">Buyer picks up</option>
                    <option value="delivery">I can deliver</option>
                    <option value="either">Either option</option>
                  </select>
                </div>
              </div>

              {/* Images Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Camera className="inline w-4 h-4 mr-1" />
                  Product Images (Max 5)
                </label>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-green-400 hover:bg-green-50 transition-colors"
                >
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Click to upload images</p>
                  <p className="text-sm text-gray-500">PNG, JPG up to 10MB each</p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
                
                {/* Image Previews */}
                {previewImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                    {previewImages.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border-2 border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images}</p>}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Additional Details
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe the condition, any special features, or additional information..."
                  className="w-full border-2 border-gray-200 p-4 rounded-xl focus:outline-none focus:border-green-500 resize-none"
                />
              </div>

              {/* Contact and Urgency */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Preferred Contact Method
                  </label>
                  <select
                    name="contactMethod"
                    value={formData.contactMethod}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 p-4 rounded-xl focus:outline-none focus:border-green-500"
                  >
                    <option value="phone">Phone</option>
                    <option value="email">Email</option>
                    <option value="message">In-app Message</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Urgency Level
                  </label>
                  <select
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 p-4 rounded-xl focus:outline-none focus:border-green-500"
                  >
                    <option value="normal">Normal</option>
                    <option value="urgent">Urgent (within a week)</option>
                    <option value="asap">ASAP (within 24 hours)</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 shadow-lg"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    List My Waste Product
                  </>
                )}
              </button>
            </form>
          </div>
        </section>

        {/* Enhanced Benefits Section */}
        <section className="mt-20">
          <div className="text-center mb-16">
            <h3 className="text-5xl font-bold text-gray-800 mb-4">
              Why Choose <span className="text-green-600">Zentara</span>?
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join the revolution of sustainable waste management and earn money while making a difference.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Package,
                title: "Smart Categorization",
                text: "AI-powered category suggestions ensure your waste finds the right buyers quickly.",
                color: "from-blue-500 to-blue-600"
              },
              {
                icon: Users,
                title: "Verified Network",
                text: "Connect with verified buyers, recyclers, and eco-conscious businesses instantly.",
                color: "from-green-500 to-green-600"
              },
              {
                icon: DollarSign,
                title: "Best Prices",
                text: "Competitive bidding system ensures you get the best value for your waste materials.",
                color: "from-purple-500 to-purple-600"
              },
              {
                icon: Leaf,
                title: "Environmental Impact",
                text: "Track your contribution to reducing landfill waste and carbon footprint.",
                color: "from-emerald-500 to-emerald-600"
              },
              {
                icon: Zap,
                title: "Instant Notifications",
                text: "Get real-time alerts when buyers show interest in your listed items.",
                color: "from-yellow-500 to-yellow-600"
              },
              {
                icon: Star,
                title: "Quality Assurance",
                text: "Rating system ensures reliable transactions and builds trust in the community.",
                color: "from-pink-500 to-pink-600"
              }
            ].map((item, idx) => (
              <div
                key={idx}
                className="group p-8 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl border border-white/50 transition-all duration-300 hover:scale-105"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-xl text-gray-800 mb-3">{item.title}</h4>
                <p className="text-gray-600 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-20 text-center">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-12 text-white max-w-4xl mx-auto">
            <h4 className="text-4xl font-bold mb-4">Ready to Make a Difference?</h4>
            <p className="text-xl text-green-100 mb-8">
              Join thousands of users who are already earning money while helping the environment.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-white text-green-600 px-8 py-3 rounded-xl font-bold hover:bg-green-50 transition-colors">
                Browse Waste Categories
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-xl font-bold hover:bg-white hover:text-green-600 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
} 

