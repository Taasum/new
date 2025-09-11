
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Upload, Leaf, Users, TrendingUp, Award, Star, ArrowRight, CheckCircle, Globe, Recycle, Sun, TreePine } from 'lucide-react';

export default function EcoEntrepreneurPage() {
  const [formData, setFormData] = useState({
    category: "",
    productName: "",
    price: "",
    quantity: "",
    description: "",
    image: null as File | null,
  });

  const [activeStep, setActiveStep] = useState(0);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsFormVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (formRef.current) {
      observer.observe(formRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, files } = target;
    
    if (files && files[0]) {
      const file = files[0];
      setFormData(prev => ({ ...prev, [name]: file }));
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Submitted product:", formData);
    alert("Product submitted successfully! We'll review it within 24 hours.");
  };

  const benefits = [
    {
      icon: <TreePine className="w-6 h-6 sm:w-8 sm:h-8 text-green-700" />,
      title: "Earth-First Marketplace",
      desc: "Connect with consumers who prioritize environmental impact in their purchasing decisions.",
    },
    {
      icon: <Sun className="w-6 h-6 sm:w-8 sm:h-8 text-green-700" />,
      title: "Sustainable Growth",
      desc: "Build your business with tools designed for long-term environmental and economic sustainability.",
    },
    {
      icon: <Recycle className="w-6 h-6 sm:w-8 sm:h-8 text-green-700" />,
      title: "Circular Economy",
      desc: "Join a community focused on reducing waste and creating regenerative business models.",
    }
  ];

  const steps = [
    { label: "Join", icon: <Users className="w-4 h-4 sm:w-5 sm:h-5" />, desc: "Create your eco-profile" },
    { label: "Add Products", icon: <Upload className="w-4 h-4 sm:w-5 sm:h-5" />, desc: "List sustainable items" },
    { label: "Connect", icon: <Globe className="w-4 h-4 sm:w-5 sm:h-5" />, desc: "Reach conscious buyers" },
    { label: "Impact", icon: <Leaf className="w-4 h-4 sm:w-5 sm:h-5" />, desc: "Measure your impact" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 sm:px-6 py-12 sm:py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/5 via-transparent to-emerald-600/5"></div>
        <div className="relative text-center max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-2 sm:px-4 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <Leaf className="w-3 h-3 sm:w-4 sm:h-4" />
            Sustainable Business Platform
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-green-700 via-emerald-600 to-teal-600 bg-clip-text text-transparent leading-tight">
            Build Your
            <br />
            Sustainable Future
          </h1>
          
          <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-gray-700 mb-8 sm:mb-10 leading-relaxed px-4">
            Transform your eco-friendly ideas into a thriving business. 
            Connect with conscious consumers and create positive environmental impact.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 px-4">
            <button className="w-full sm:w-auto group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <span className="flex items-center justify-center gap-2">
                Start Your Journey
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
            <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-green-600 text-green-600 font-semibold rounded-xl sm:rounded-2xl hover:bg-green-600 hover:text-white transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Why Choose Sustainable Commerce?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Join the movement towards regenerative business practices
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {benefits.map((item, i) => (
              <div key={i} className="group">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-green-100 hover:border-green-200 transition-all duration-300 hover:shadow-lg transform hover:scale-105">
                  <div className="mb-4 sm:mb-6 p-3 bg-green-50 rounded-xl sm:rounded-2xl w-fit">
                    {item.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Steps */}
      <section className="bg-gradient-to-r from-green-600 to-emerald-600 py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
              Your Sustainable Journey
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-green-100 max-w-2xl mx-auto px-4">
              Four simple steps to make a positive impact
            </p>
          </div>
          
          <div className="flex flex-col sm:grid sm:grid-cols-2 lg:flex lg:flex-row justify-center items-start lg:items-center gap-6 sm:gap-8 max-w-4xl mx-auto">
            {steps.map((step, i) => (
              <div key={i} className="group flex flex-col items-center text-center flex-1 relative">
                <div 
                  className={`relative w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full border-4 transition-all duration-300 cursor-pointer mb-3 sm:mb-4 ${
                    i <= activeStep 
                      ? 'bg-white border-white text-green-600 shadow-lg' 
                      : 'bg-green-500 border-green-300 text-white hover:bg-white hover:text-green-600'
                  }`}
                  onClick={() => setActiveStep(i)}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    {i <= activeStep ? <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" /> : step.icon}
                  </div>
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-1 sm:mb-2">{step.label}</h3>
                <p className="text-green-100 text-xs sm:text-sm">{step.desc}</p>
                {i < steps.length - 1 && (
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-green-300 mt-3 sm:mt-4 hidden lg:block absolute -right-8 xl:-right-12" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Listing Form */}
      <section className="py-12 sm:py-20 px-4 sm:px-6" ref={formRef}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              List Your First Product
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 px-4">
              Share your sustainable solution with the world
            </p>
          </div>
          
          <div className={`transition-all duration-1000 transform ${isFormVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl border border-green-100 overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white flex items-center gap-2 sm:gap-3">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6" />
                  Add Your Sustainable Product
                </h3>
                <p className="text-green-100 mt-1 sm:mt-2 text-sm sm:text-base">Make a positive impact with every sale</p>
              </div>
              
              <div className="p-4 sm:p-6 md:p-8">
                <div className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Category</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-3 py-3 sm:px-4 rounded-xl sm:rounded-2xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 bg-white/80 text-sm sm:text-base"
                      >
                        <option value="">Select category...</option>
                        <option value="fashion">Sustainable Fashion</option>
                        <option value="food">Organic & Local Food</option>
                        <option value="home">Eco Home & Garden</option>
                        <option value="beauty">Natural Beauty & Care</option>
                        <option value="tech">Green Technology</option>
                        <option value="crafts">Handmade & Upcycled</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Product Name</label>
                      <input
                        type="text"
                        name="productName"
                        placeholder="e.g., Organic Cotton T-Shirt"
                        value={formData.productName}
                        onChange={handleChange}
                        className="w-full px-3 py-3 sm:px-4 rounded-xl sm:rounded-2xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 bg-white/80 text-sm sm:text-base"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Price ($)</label>
                      <input
                        type="number"
                        name="price"
                        placeholder="29.99"
                        value={formData.price}
                        onChange={handleChange}
                        step="0.01"
                        min="0"
                        className="w-full px-3 py-3 sm:px-4 rounded-xl sm:rounded-2xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 bg-white/80 text-sm sm:text-base"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Quantity Available</label>
                      <input
                        type="number"
                        name="quantity"
                        placeholder="50"
                        value={formData.quantity}
                        onChange={handleChange}
                        min="1"
                        className="w-full px-3 py-3 sm:px-4 rounded-xl sm:rounded-2xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 bg-white/80 text-sm sm:text-base"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Product Description</label>
                    <textarea
                      name="description"
                      placeholder="Describe your product's sustainable features, materials, and environmental benefits..."
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-3 py-3 sm:px-4 rounded-xl sm:rounded-2xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 bg-white/80 resize-none text-sm sm:text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Product Image</label>
                    <div className="relative group">
                      <div 
                        className="flex flex-col items-center justify-center w-full h-24 sm:h-32 border-2 border-dashed border-gray-300 rounded-xl sm:rounded-2xl cursor-pointer hover:border-green-500 transition-all duration-300 bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100"
                        onClick={() => {
                          const fileInput = document.getElementById('file-input') as HTMLInputElement;
                          fileInput?.click();
                        }}
                      >
                        {imagePreview ? (
                          <div className="relative w-full h-full">
                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-xl sm:rounded-2xl" />
                            <div className="absolute inset-0 bg-black/20 rounded-xl sm:rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                            </div>
                          </div>
                        ) : (
                          <div className="text-center">
                            <Upload className="w-8 h-8 sm:w-12 sm:h-12 text-green-600 mb-1 sm:mb-2 mx-auto group-hover:scale-110 transition-transform duration-300" />
                            <span className="text-green-600 font-medium text-sm sm:text-base">Upload Product Image</span>
                            <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                          </div>
                        )}
                        <input
                          id="file-input"
                          type="file"
                          name="image"
                          onChange={handleChange}
                          accept="image/*"
                          className="hidden"
                        />
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={handleSubmit}
                    className="w-full py-3 sm:py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-base sm:text-lg rounded-xl sm:rounded-2xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3"
                  >
                    <Leaf className="w-5 h-5 sm:w-6 sm:h-6" />
                    List Your Sustainable Product
                    <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative overflow-hidden bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 py-12 sm:py-20 px-4 sm:px-6">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative text-center max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-green-100 mb-8 sm:mb-12 leading-relaxed px-4">
            Join entrepreneurs worldwide who are building sustainable businesses and creating positive environmental impact.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4">
            <button className="w-full sm:w-auto group px-8 sm:px-10 py-4 sm:py-5 bg-white text-green-600 font-bold text-lg sm:text-xl rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3">
              <Leaf className="w-5 h-5 sm:w-6 sm:h-6" />
              Start Your Green Journey
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            
            <button className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 border-2 border-white text-white font-bold text-lg sm:text-xl rounded-xl sm:rounded-2xl hover:bg-white hover:text-green-600 transition-all duration-300">
              Explore Impact Stories
            </button>
          </div>
          
          <div className="mt-8 sm:mt-12 text-green-200">
            <p className="flex items-center justify-center gap-2 text-sm sm:text-base lg:text-lg">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
              Trusted by sustainable entrepreneurs worldwide
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

