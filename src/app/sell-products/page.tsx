
  "use client";

import React, { useState, useRef, useEffect } from 'react';
import { Upload, Leaf, Users, TrendingUp, Award, Star, ArrowRight, CheckCircle, Globe, Heart, Zap, Target } from 'lucide-react';

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
  };

  const benefits = [
    {
      icon: <Users className="w-8 h-8 text-emerald-600" />,
      title: "Reach Green Consumers",
      desc: "Connect with 50,000+ eco-conscious buyers actively seeking sustainable products and ethical brands.",
      color: "from-emerald-50 to-teal-50"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-green-600" />,
      title: "Accelerate Growth",
      desc: "Join entrepreneurs who've seen 3x faster growth through our targeted marketing and community support.",
      color: "from-green-50 to-emerald-50"
    },
    {
      icon: <Globe className="w-8 h-8 text-teal-600" />,
      title: "Global Impact",
      desc: "Be part of a movement that has prevented 1M+ kg of waste while building profitable businesses.",
      color: "from-teal-50 to-cyan-50"
    }
  ];

  const steps = [
    { label: "Join", icon: <Heart className="w-5 h-5" />, desc: "Create your profile" },
    { label: "List Products", icon: <Upload className="w-5 h-5" />, desc: "Add eco-friendly items" },
    { label: "Get Customers", icon: <Users className="w-5 h-5" />, desc: "Connect with buyers" },
    { label: "Scale Impact", icon: <Zap className="w-5 h-5" />, desc: "Grow sustainably" }
  ];

  const stats = [
    { number: "10K+", label: "Active Entrepreneurs", icon: <Users className="w-6 h-6" /> },
    { number: "500K+", label: "Products Listed", icon: <Target className="w-6 h-6" /> },
    { number: "98%", label: "Satisfaction Rate", icon: <Star className="w-6 h-6" /> },
    { number: "2.5M", label: "Eco-Impact Score", icon: <Leaf className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Floating Elements */}
      <div className="fixed top-20 left-10 w-20 h-20 bg-emerald-100 rounded-full opacity-30 animate-pulse"></div>
      <div className="fixed top-40 right-20 w-32 h-32 bg-green-100 rounded-full opacity-20 animate-bounce" style={{ animationDuration: '3s' }}></div>
      <div className="fixed bottom-40 left-20 w-16 h-16 bg-teal-100 rounded-full opacity-25 animate-pulse" style={{ animationDelay: '1s' }}></div>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 via-transparent to-teal-600/5"></div>
        <div className="relative text-center py-20 px-6">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-pulse">
            <Leaf className="w-4 h-4" />
            Join 10,000+ Eco-Entrepreneurs
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent leading-tight">
            Build Your
            <br />
            <span className="inline-block transform hover:scale-105 transition-transform duration-300">
              Green Empire
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-xl text-gray-600 mb-10 leading-relaxed">
            Transform your sustainable passion into a thriving business. 
            Connect with conscious consumers and create lasting environmental impact.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center gap-2">
                Start Your Journey
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
            <button className="px-8 py-4 border-2 border-emerald-600 text-emerald-600 font-semibold rounded-2xl hover:bg-emerald-600 hover:text-white transition-all duration-300">
              Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, i) => (
              <div key={i} className="group">
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100 hover:border-emerald-200 transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-center justify-center mb-3 text-emerald-600">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 md:px-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
            Why Choose Zentara?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join the platform that's revolutionizing sustainable commerce
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {benefits.map((item, i) => (
            <div key={i} className="group">
              <div className={`relative overflow-hidden bg-gradient-to-br ${item.color} rounded-3xl p-8 border border-white/50 hover:shadow-2xl transition-all duration-500 transform hover:scale-105`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
                <div className="relative">
                  <div className="mb-6 p-3 bg-white/80 rounded-2xl w-fit">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Steps */}
      <section className="bg-gradient-to-r from-emerald-600 to-green-600 py-20 px-6 md:px-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Your Path to Success
          </h2>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
            Four simple steps to transform your eco-vision into reality
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <div key={i} className="group flex flex-col items-center text-center flex-1 relative">
              <div 
                className={`relative w-20 h-20 rounded-full border-4 transition-all duration-300 cursor-pointer mb-4 ${
                  i <= activeStep 
                    ? 'bg-white border-white text-emerald-600 shadow-lg' 
                    : 'bg-emerald-500 border-emerald-300 text-white hover:bg-white hover:text-emerald-600'
                }`}
                onClick={() => setActiveStep(i)}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  {i <= activeStep ? <CheckCircle className="w-8 h-8" /> : step.icon}
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 text-yellow-900 rounded-full flex items-center justify-center text-xs font-bold">
                  {i + 1}
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{step.label}</h3>
              <p className="text-emerald-100 text-sm">{step.desc}</p>
              {i < steps.length - 1 && (
                <ArrowRight className="w-6 h-6 text-emerald-300 mt-4 hidden md:block" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Enhanced Dashboard */}
      <section className="py-20 px-6 md:px-20" ref={formRef}>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
            Entrepreneur Dashboard
          </h2>
          <p className="text-xl text-gray-600">
            Start listing your first eco-friendly product
          </p>
        </div>
        
        <div className={`max-w-3xl mx-auto transition-all duration-1000 transform ${isFormVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 to-green-600 p-6">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <Award className="w-6 h-6" />
                Add Your First Product
              </h3>
              <p className="text-emerald-100 mt-2">Join thousands of successful eco-entrepreneurs</p>
            </div>
            
            <div className="p-8">
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="text-sm font-semibold text-gray-700">Category</div>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300 bg-white/80"
                    >
                      <option value="">Select category...</option>
                      <option value="fashion">Sustainable Fashion</option>
                      <option value="food">Organic Food</option>
                      <option value="home">Eco Home & Garden</option>
                      <option value="beauty">Natural Beauty</option>
                      <option value="tech">Green Technology</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm font-semibold text-gray-700">Product Name</div>
                    <input
                      type="text"
                      name="productName"
                      placeholder="e.g., Bamboo Water Bottle"
                      value={formData.productName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300 bg-white/80"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="text-sm font-semibold text-gray-700">Price ($)</div>
                    <input
                      type="number"
                      name="price"
                      placeholder="29.99"
                      value={formData.price}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300 bg-white/80"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm font-semibold text-gray-700">Quantity</div>
                    <input
                      type="number"
                      name="quantity"
                      placeholder="100"
                      value={formData.quantity}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300 bg-white/80"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-semibold text-gray-700">Description</div>
                  <textarea
                    name="description"
                    placeholder="Describe your eco-friendly product, its sustainability features, and environmental benefits..."
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300 bg-white/80 resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-semibold text-gray-700">Product Image</div>
                  <div className="relative group">
                    <div 
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-emerald-500 transition-all duration-300 bg-gradient-to-br from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100"
                      onClick={() => {
                        const fileInput = document.getElementById('file-input') as HTMLInputElement;
                        fileInput?.click();
                      }}
                    >
                      {imagePreview ? (
                        <div className="relative w-full h-full">
                          <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-2xl" />
                          <div className="absolute inset-0 bg-black/20 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Upload className="w-8 h-8 text-white" />
                          </div>
                        </div>
                      ) : (
                        <div className="text-center">
                          <Upload className="w-12 h-12 text-emerald-600 mb-2 mx-auto group-hover:scale-110 transition-transform duration-300" />
                          <span className="text-emerald-600 font-medium">Upload Product Image</span>
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
                  className="w-full py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold text-lg rounded-2xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <Leaf className="w-6 h-6" />
                  Launch Your Eco-Product
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600"></div>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative text-center py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold text-white mb-6">
              Ready to Change the World?
            </h2>
            <p className="text-2xl text-emerald-100 mb-12 leading-relaxed">
              Join 10,000+ eco-entrepreneurs who've already started their sustainable business journey. 
              <br />
              Your planet-positive impact starts today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="group px-10 py-5 bg-white text-emerald-600 font-bold text-xl rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3">
                <Leaf className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                Start Your Green Business
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </button>
              
              <button className="px-10 py-5 border-2 border-white text-white font-bold text-xl rounded-2xl hover:bg-white hover:text-emerald-600 transition-all duration-300">
                Learn More
              </button>
            </div>
            
            <div className="mt-12 text-emerald-200">
              <p className="flex items-center justify-center gap-2 text-lg">
                <Star className="w-5 h-5 fill-current" />
                4.9/5 from 2,500+ entrepreneurs
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}