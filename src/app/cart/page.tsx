
"use client";
import React, { useEffect, useMemo, useState } from "react";
import { ShoppingCart, Recycle, Trash2, Heart, Plus, Minus, MapPin, Clock, Gift, Zap, Leaf, Award, Star, Bell, Truck, CreditCard, Wallet, Phone, Package, Shield, CheckCircle, AlertCircle, TrendingUp, Calculator, Eye, EyeOff } from "lucide-react";

// ------------------------------------------------------------
// Zentara Advanced Cart — Enhanced with modern design & features
// ------------------------------------------------------------

// ---------- Types ----------
type ID = string;
type Mode = "sell" | "recycle";

type SellLine = {
  id: ID;
  mode: "sell";
  sku: string;
  name: string;
  category: "Plastic" | "E-waste" | "Metal" | "Paper" | "Glass" | "Organic" | "Other";
  unitPrice: number;
  qty: number;
  thumbnail?: string;
  stock?: number;
  discount?: number; // percentage discount
  rating?: number; // 1-5 stars
  isOrganic?: boolean;
  carbonFootprint?: number; // kg CO2
};

type RecycleLine = {
  id: ID;
  mode: "recycle";
  material: "Plastic" | "E-waste" | "Metal" | "Paper" | "Glass" | "Organic" | "Other";
  name: string;
  rewardPerKg: number;
  estValuePerKg?: number;
  weightKg: number;
  thumbnail?: string;
  condition?: "excellent" | "good" | "poor";
  estimatedPickupTime?: string;
};

type CartLine = SellLine | RecycleLine;

type Address = {
  label: string;
  line1: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  isDefault?: boolean;
};

type PickupSlot = {
  date: string;
  window: "8–10 AM" | "10–12 PM" | "12–2 PM" | "2–4 PM" | "4–6 PM";
  priority?: "standard" | "express";
};

type Notification = {
  id: string;
  type: "success" | "warning" | "info" | "error";
  message: string;
  timestamp: Date;
};

// ---------- Enhanced Mock Data ----------
const MOCK_SELL_ITEMS: SellLine[] = [
  {
    id: cryptoRandomId(),
    mode: "sell",
    sku: "ECO-BIN-20L",
    name: "20L Compostable Trash Bags (roll of 30)",
    category: "Organic",
    unitPrice: 199,
    qty: 1,
    discount: 10,
    rating: 4.5,
    isOrganic: true,
    carbonFootprint: 0.2,
  },
  {
    id: cryptoRandomId(),
    mode: "sell",
    sku: "ECO-BRUSH",
    name: "Bamboo Toothbrush (pack of 4)",
    category: "Other",
    unitPrice: 249,
    qty: 2,
    rating: 4.8,
    isOrganic: true,
    carbonFootprint: 0.1,
  },
];

const MOCK_RECYCLE_ITEMS: RecycleLine[] = [
  {
    id: cryptoRandomId(),
    mode: "recycle",
    material: "Plastic",
    name: "Mixed Plastic (PET/HDPE)",
    rewardPerKg: 25,
    estValuePerKg: 8,
    weightKg: 1.5,
    condition: "good",
    estimatedPickupTime: "2-3 days",
  },
  {
    id: cryptoRandomId(),
    mode: "recycle",
    material: "E-waste",
    name: "Small E-waste (chargers, cables)",
    rewardPerKg: 40,
    estValuePerKg: 20,
    weightKg: 0.8,
    condition: "excellent",
    estimatedPickupTime: "1-2 days",
  },
];

// ---------- Utils ----------
function cryptoRandomId() {
  return Math.random().toString(36).slice(2);
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

// Enhanced Settings
const GST_RATE = 0.18;
const FREE_PICKUP_THRESHOLD_KG = 5;
const EXPRESS_PICKUP_FEE = 99;
const STANDARD_PICKUP_FEE = 49;
const CARBON_OFFSET_RATE = 2; // ₹2 per kg CO2

// Enhanced Coupons
const COUPONS = {
  GREEN10: { 
    kind: "percent" as const, 
    value: 10, 
    appliesTo: "sell" as const,
    description: "10% off on eco-products",
    minOrder: 200,
    maxDiscount: 500
  },
  BONUS50: { 
    kind: "points" as const, 
    value: 50, 
    appliesTo: "any" as const,
    description: "Get 50 bonus points"
  },
  RECYCLE20: { 
    kind: "percent" as const, 
    value: 20, 
    appliesTo: "recycle" as const,
    description: "20% bonus on recycling rewards"
  },
  FIRSTORDER: { 
    kind: "fixed" as const, 
    value: 100, 
    appliesTo: "sell" as const,
    description: "₹100 off on first order",
    minOrder: 500
  }
};

const POINTS_PER_RUPEE = 10;

// ---------- Main Component ----------
export default function ZentaraAdvancedCart() {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [saved, setSaved] = useState<CartLine[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([
    {
      label: "Home",
      line1: "221B Green Street",
      city: "Indore",
      state: "MP",
      pincode: "452001",
      phone: "+91 98XXXXXXXX",
      isDefault: true,
    }
  ]);
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [slot, setSlot] = useState<PickupSlot>({ 
    date: nextDateISO(1), 
    window: "10–12 PM",
    priority: "standard"
  });
  const [coupon, setCoupon] = useState<string>("");
  const [appliedCoupons, setAppliedCoupons] = useState<string[]>([]);
  const [redeemPoints, setRedeemPoints] = useState<number>(0);
  const [walletPoints, setWalletPoints] = useState<number>(1250);
  const [payment, setPayment] = useState<"UPI" | "Wallet" | "COD" | "Points">("UPI");
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showCarbonOffset, setShowCarbonOffset] = useState(true);
  const [activeTab, setActiveTab] = useState<"cart" | "saved" | "history">("cart");
  const [orderHistory] = useState([
    { id: "ORD001", date: "2024-12-15", total: 450, items: 3, status: "delivered" },
    { id: "ORD002", date: "2024-12-10", total: 320, items: 2, status: "processing" },
  ]);

  // Initialize data
  useEffect(() => {
    setCart([...MOCK_SELL_ITEMS, ...MOCK_RECYCLE_ITEMS]);
    addNotification("success", "Welcome back! Your cart has been restored.");
  }, []);

  // Notification system
  const addNotification = (type: Notification['type'], message: string) => {
    const notification: Notification = {
      id: cryptoRandomId(),
      type,
      message,
      timestamp: new Date()
    };
    setNotifications(prev => [notification, ...prev.slice(0, 4)]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 5000);
  };

  // Enhanced derived calculations
  const sellLines = useMemo(() => cart.filter((l): l is SellLine => l.mode === "sell"), [cart]);
  const recycleLines = useMemo(() => cart.filter((l): l is RecycleLine => l.mode === "recycle"), [cart]);

  const sellSubtotal = useMemo(() => {
    return sellLines.reduce((s, l) => {
      const discount = l.discount ? (l.unitPrice * l.discount / 100) : 0;
      return s + (l.unitPrice - discount) * l.qty;
    }, 0);
  }, [sellLines]);

  const sellTax = useMemo(() => Math.round(sellSubtotal * GST_RATE), [sellSubtotal]);

  const recycleWeight = useMemo(() => recycleLines.reduce((s, l) => s + l.weightKg, 0), [recycleLines]);
  const recyclePoints = useMemo(() => {
    let basePoints = Math.round(recycleLines.reduce((s, l) => s + l.rewardPerKg * l.weightKg, 0));
    
    // Apply recycle bonus from coupons
    const recycleBonus = appliedCoupons.reduce((bonus, couponCode) => {
      const coupon = COUPONS[couponCode as keyof typeof COUPONS];
      if (coupon?.kind === "percent" && coupon.appliesTo === "recycle") {
        return bonus + (basePoints * coupon.value / 100);
      }
      return bonus;
    }, 0);
    
    return Math.round(basePoints + recycleBonus);
  }, [recycleLines, appliedCoupons]);

  const totalCarbonFootprint = useMemo(() => {
    return sellLines.reduce((total, l) => total + (l.carbonFootprint || 0) * l.qty, 0);
  }, [sellLines]);

  const carbonOffsetCost = showCarbonOffset ? Math.round(totalCarbonFootprint * CARBON_OFFSET_RATE) : 0;

  const freePickup = recycleWeight >= FREE_PICKUP_THRESHOLD_KG;
  const pickupFee = freePickup || recycleWeight === 0 ? 0 : 
    slot.priority === "express" ? EXPRESS_PICKUP_FEE : STANDARD_PICKUP_FEE;

  // Enhanced coupon calculations
  const { couponDiscount, bonusPointsFromCoupons } = useMemo(() => {
    let discount = 0;
    let bonusPoints = 0;

    appliedCoupons.forEach(couponCode => {
      const coupon = COUPONS[couponCode as keyof typeof COUPONS];
      if (!coupon) return;

      if (coupon.kind === "percent" && coupon.appliesTo === "sell") {
        const maxDiscount = coupon.maxDiscount || Infinity;
        discount += Math.min((coupon.value / 100) * sellSubtotal, maxDiscount);
      } else if (coupon.kind === "fixed" && coupon.appliesTo === "sell") {
        discount += coupon.value;
      } else if (coupon.kind === "points") {
        bonusPoints += coupon.value;
      }
    });

    return { couponDiscount: Math.round(discount), bonusPointsFromCoupons: bonusPoints };
  }, [appliedCoupons, sellSubtotal]);

  const maxRedeemable = useMemo(() => {
    const totalAvailablePoints = walletPoints + recyclePoints + bonusPointsFromCoupons;
    const maxRedeemableAmount = sellSubtotal + sellTax + pickupFee + carbonOffsetCost - couponDiscount;
    return Math.min(totalAvailablePoints, maxRedeemableAmount * POINTS_PER_RUPEE);
  }, [walletPoints, recyclePoints, bonusPointsFromCoupons, sellSubtotal, sellTax, pickupFee, carbonOffsetCost, couponDiscount]);

  const redeemRupees = Math.floor(clamp(redeemPoints, 0, maxRedeemable) / POINTS_PER_RUPEE);
  const grandTotal = Math.max(0, sellSubtotal + sellTax + pickupFee + carbonOffsetCost - couponDiscount - redeemRupees);
  const projectedWalletAfter = walletPoints + recyclePoints + bonusPointsFromCoupons - redeemPoints;

  // Enhanced handlers
  const updateSellQty = (id: ID, qty: number) => {
    setCart(prev => prev.map(l => 
      l.id === id && l.mode === "sell" ? { ...l, qty: clamp(Math.round(qty), 1, 999) } : l
    ));
  };

  const updateRecycleWeight = (id: ID, kg: number) => {
    setCart(prev => prev.map(l => 
      l.id === id && l.mode === "recycle" ? { ...l, weightKg: clamp(Number(kg.toFixed(2)), 0, 999) } : l
    ));
  };

  const removeLine = (id: ID) => {
    setCart(prev => prev.filter(l => l.id !== id));
    addNotification("info", "Item removed from cart");
  };

  const moveToSaved = (id: ID) => {
    setCart(prev => {
      const line = prev.find(l => l.id === id);
      if (!line) return prev;
      setSaved(s => [line, ...s]);
      addNotification("success", "Item saved for later");
      return prev.filter(l => l.id !== id);
    });
  };

  const moveToCart = (id: ID) => {
    setSaved(prev => {
      const line = prev.find(l => l.id === id);
      if (!line) return prev;
      setCart(c => [line, ...c]);
      addNotification("success", "Item moved to cart");
      return prev.filter(l => l.id !== id);
    });
  };

  const applyCoupon = () => {
    if (!coupon) return;
    if (!(coupon in COUPONS)) {
      addNotification("error", "Invalid coupon code");
      return;
    }
    if (appliedCoupons.includes(coupon)) {
      addNotification("warning", "Coupon already applied");
      return;
    }

    const couponData = COUPONS[coupon as keyof typeof COUPONS];
    if (couponData.minOrder && sellSubtotal < couponData.minOrder) {
      addNotification("warning", `Minimum order of ₹${couponData.minOrder} required`);
      return;
    }

    setAppliedCoupons(prev => [...prev, coupon]);
    addNotification("success", `Coupon ${coupon} applied successfully!`);
    setCoupon("");
  };

  const removeCoupon = (couponCode: string) => {
    setAppliedCoupons(prev => prev.filter(c => c !== couponCode));
    addNotification("info", "Coupon removed");
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      addNotification("warning", "Your cart is empty");
      return;
    }

    const orderSummary = {
      orderNumber: `ZTR${Date.now().toString().slice(-6)}`,
      items: cart.length,
      sellTotal: sellSubtotal,
      recycleWeight: recycleWeight,
      recyclePoints: recyclePoints,
      grandTotal: grandTotal,
      address: addresses[selectedAddress],
      slot: slot,
      payment: payment
    };

    addNotification("success", `Order ${orderSummary.orderNumber} placed successfully!`);
    
    // Simulate order completion
    setWalletPoints(projectedWalletAfter);
    setCart([]);
    setAppliedCoupons([]);
    setRedeemPoints(0);
  };

  const baseClasses = darkMode ? "dark bg-gray-900 text-white" : "bg-gray-50 text-gray-900";

  return (
    <div className={`min-h-screen ${baseClasses} transition-colors duration-300`}>
      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map(notification => (
          <NotificationCard key={notification.id} notification={notification} />
        ))}
      </div>

      <div className="mx-auto max-w-7xl p-6">
        {/* Enhanced Header */}
        <header className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                  <Leaf className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    Zentara Cart
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Sustainable shopping & waste management
                  </p>
                </div>
              </div>
              
              {/* Dark mode toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="ml-4 p-2 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all"
              >
                {darkMode ? "🌞" : "🌙"}
              </button>
            </div>

            {/* Enhanced Progress Bar */}
            <div className="flex items-center gap-4">
              <ProgressBar
                label={freePickup ? "Free pickup unlocked!" : `Add ${(Math.max(0, FREE_PICKUP_THRESHOLD_KG - recycleWeight)).toFixed(2)}kg for free pickup`}
                value={Math.min(100, (recycleWeight / FREE_PICKUP_THRESHOLD_KG) * 100)}
                icon={<Truck className="h-4 w-4" />}
              />
              
              {/* Carbon footprint indicator */}
              <div className="flex items-center gap-2 text-sm">
                <Leaf className="h-4 w-4 text-green-600" />
                <span className="text-gray-600 dark:text-gray-400">
                  {totalCarbonFootprint.toFixed(2)}kg CO₂
                </span>
              </div>

              {/* Wallet points */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
                <Award className="h-4 w-4 text-emerald-600" />
                <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                  {walletPoints} pts
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Cart Items Section */}
          <div className="xl:col-span-2 space-y-6">
            {/* Tab Navigation */}
            <div className="flex space-x-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-2xl">
              {[
                { id: "cart", label: "Cart", icon: ShoppingCart, count: cart.length },
                { id: "saved", label: "Saved", icon: Heart, count: saved.length },
                { id: "history", label: "History", icon: Package, count: orderHistory.length }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                  {tab.count > 0 && (
                    <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Cart Content */}
            {activeTab === "cart" && (
              <Section title="Your Items" icon={<ShoppingCart className="h-5 w-5" />}>
                {cart.length === 0 ? (
                  <EmptyState 
                    icon="🛒"
                    title="Your cart is empty"
                    description="Start adding eco-products or waste items for recycling"
                    actionText="Browse Products"
                  />
                ) : (
                  <div className="space-y-4">
                    {cart.map(line => (
                      <CartItemCard
                        key={line.id}
                        line={line}
                        onUpdateQty={updateSellQty}
                        onUpdateWeight={updateRecycleWeight}
                        onRemove={removeLine}
                        onSaveForLater={moveToSaved}
                        darkMode={darkMode}
                      />
                    ))}
                  </div>
                )}
              </Section>
            )}

            {/* Saved Items */}
            {activeTab === "saved" && (
              <Section title="Saved Items" icon={<Heart className="h-5 w-5" />}>
                {saved.length === 0 ? (
                  <EmptyState 
                    icon="💝"
                    title="No saved items"
                    description="Items you save for later will appear here"
                  />
                ) : (
                  <div className="space-y-3">
                    {saved.map(line => (
                      <SavedItemCard
                        key={line.id}
                        line={line}
                        onMoveToCart={moveToCart}
                        darkMode={darkMode}
                      />
                    ))}
                  </div>
                )}
              </Section>
            )}

            {/* Order History */}
            {activeTab === "history" && (
              <Section title="Order History" icon={<Package className="h-5 w-5" />}>
                <div className="space-y-3">
                  {orderHistory.map(order => (
                    <OrderHistoryCard key={order.id} order={order} darkMode={darkMode} />
                  ))}
                </div>
              </Section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pickup & Delivery */}
            <Section title="Pickup & Delivery" icon={<Truck className="h-5 w-5" />}>
              <div className="space-y-4">
                <Field label="Pickup Date">
                  <input
                    type="date"
                    className="w-full rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800"
                    value={slot.date}
                    onChange={(e) => setSlot(s => ({ ...s, date: e.target.value }))}
                  />
                </Field>
                
                <Field label="Time Window">
                  <select 
                    className="w-full rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800" 
                    value={slot.window} 
                    onChange={(e) => setSlot(s => ({ ...s, window: e.target.value as PickupSlot["window"] }))}
                  >
                    {["8–10 AM", "10–12 PM", "12–2 PM", "2–4 PM", "4–6 PM"].map(w => (
                      <option key={w} value={w}>{w}</option>
                    ))}
                  </select>
                </Field>

                <Field label="Priority">
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: "standard", label: "Standard", desc: `₹${STANDARD_PICKUP_FEE}` },
                      { value: "express", label: "Express", desc: `₹${EXPRESS_PICKUP_FEE}` }
                    ].map(option => (
                      <button
                        key={option.value}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          slot.priority === option.value
                            ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                            : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                        }`}
                        onClick={() => setSlot(s => ({ ...s, priority: option.value as "standard" | "express" }))}
                      >
                        <div className="font-medium">{option.label}</div>
                        <div className="text-xs text-gray-500">{option.desc}</div>
                      </button>
                    ))}
                  </div>
                </Field>

                <Field label="Address">
                  <select 
                    className="w-full rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800 mb-2"
                    value={selectedAddress}
                    onChange={(e) => setSelectedAddress(Number(e.target.value))}
                  >
                    {addresses.map((addr, idx) => (
                      <option key={idx} value={idx}>
                        {addr.label} - {addr.city}, {addr.state}
                      </option>
                    ))}
                  </select>
                  <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800 text-sm">
                    <div className="font-medium">{addresses[selectedAddress]?.label}</div>
                    <div>{addresses[selectedAddress]?.line1}</div>
                    <div>{addresses[selectedAddress]?.city}, {addresses[selectedAddress]?.state} {addresses[selectedAddress]?.pincode}</div>
                    <div className="flex items-center gap-1 mt-1">
                      <Phone className="h-3 w-3" />
                      {addresses[selectedAddress]?.phone}
                    </div>
                  </div>
                </Field>

                <div className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-2">
                  {freePickup ? (
                    <>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Free pickup unlocked
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-4 w-4 text-amber-500" />
                      Pickup fee ₹{pickupFee} (free over {FREE_PICKUP_THRESHOLD_KG}kg)
                    </>
                  )}
                </div>
              </div>
            </Section>

            {/* Coupons & Rewards */}
            <Section title="Coupons & Rewards" icon={<Gift className="h-5 w-5" />}>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    className="flex-1 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800"
                    placeholder="Enter coupon code"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                  />
                  <button className="btn-primary" onClick={applyCoupon}>Apply</button>
                </div>

                {/* Applied Coupons */}
                {appliedCoupons.length > 0 && (
                  <div className="space-y-2">
                    {appliedCoupons.map(couponCode => {
                      const couponData = COUPONS[couponCode as keyof typeof COUPONS];
                      return (
                        <div key={couponCode} className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
                          <div>
                            <div className="font-medium text-emerald-700 dark:text-emerald-400">{couponCode}</div>
                            <div className="text-xs text-emerald-600 dark:text-emerald-500">{couponData.description}</div>
                          </div>
                          <button
                            onClick={() => removeCoupon(couponCode)}
                            className="text-emerald-600 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-200"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Points Wallet */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border border-emerald-200 dark:border-emerald-800">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-4 w-4 text-emerald-600" />
                    <div className="font-medium text-emerald-900 dark:text-emerald-100">Points Wallet</div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Current balance:</span>
                      <span className="font-semibold">{walletPoints} pts</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>This order will add:</span>
                      <span className="font-semibold">+{recyclePoints + bonusPointsFromCoupons} pts</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Max redeemable:</span>
                      <span className="font-semibold">{maxRedeemable} pts (₹{Math.floor(maxRedeemable / POINTS_PER_RUPEE)})</span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span>Redeem points:</span>
                      <span className="font-medium">{redeemPoints} pts = ₹{redeemRupees}</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={maxRedeemable}
                      value={redeemPoints}
                      onChange={(e) => setRedeemPoints(Number(e.target.value))}
                      className="w-full accent-emerald-600"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>0</span>
                      <span>{maxRedeemable}</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-emerald-200 dark:border-emerald-800">
                    <div className="flex justify-between text-sm">
                      <span>Balance after order:</span>
                      <span className="font-semibold text-emerald-600">{projectedWalletAfter} pts</span>
                    </div>
                  </div>
                </div>

                {/* Available Coupons */}
                <details className="group">
                  <summary className="flex items-center justify-between cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                    <span>Available Coupons</span>
                    <Gift className="h-4 w-4 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="mt-3 space-y-2">
                    {Object.entries(COUPONS)
                      .filter(([code]) => !appliedCoupons.includes(code))
                      .map(([code, coupon]) => (
                        <div key={code} className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-sm">{code}</div>
                              <div className="text-xs text-gray-500">{coupon.description}</div>
                              {coupon.minOrder && (
                                <div className="text-xs text-amber-600">Min order: ₹{coupon.minOrder}</div>
                              )}
                            </div>
                            <button
                              onClick={() => {
                                setCoupon(code);
                                applyCoupon();
                              }}
                              className="text-xs px-2 py-1 rounded-lg bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900 dark:text-emerald-300"
                            >
                              Apply
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </details>
              </div>
            </Section>

            {/* Order Summary */}
            <Section title="Order Summary" icon={<Calculator className="h-5 w-5" />}>
              <div className="space-y-3">
                {/* Quick stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-2">
                      <ShoppingCart className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium">Sell Items</span>
                    </div>
                    <div className="text-lg font-bold text-blue-700 dark:text-blue-400">₹{sellSubtotal}</div>
                  </div>
                  
                  <div className="p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-2">
                      <Recycle className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium">Recycle</span>
                    </div>
                    <div className="text-lg font-bold text-green-700 dark:text-green-400">{recycleWeight.toFixed(1)}kg</div>
                  </div>
                </div>

                {/* Detailed breakdown */}
                <div className="space-y-2 text-sm">
                  {sellSubtotal > 0 && <Row label="Subtotal (sell)" value={`₹${sellSubtotal}`} />}
                  {sellTax > 0 && <Row label="GST (18%)" value={`₹${sellTax}`} />}
                  {pickupFee > 0 && <Row label={`Pickup (${slot.priority})`} value={`₹${pickupFee}`} />}
                  {carbonOffsetCost > 0 && (
                    <Row 
                      label={
                        <div className="flex items-center gap-1">
                          <span>Carbon Offset</span>
                          <button
                            onClick={() => setShowCarbonOffset(!showCarbonOffset)}
                            className="text-xs text-gray-500 hover:text-gray-700"
                          >
                            {showCarbonOffset ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                          </button>
                        </div>
                      } 
                      value={`₹${carbonOffsetCost}`}
                      className="text-green-600"
                    />
                  )}
                  {couponDiscount > 0 && (
                    <Row 
                      label="Coupon Discount" 
                      value={`−₹${couponDiscount}`} 
                      className="text-emerald-600 font-medium"
                    />
                  )}
                  {redeemRupees > 0 && (
                    <Row 
                      label={`Points Redeemed (${redeemPoints} pts)`} 
                      value={`−₹${redeemRupees}`}
                      className="text-emerald-600 font-medium"
                    />
                  )}
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                  <Row 
                    label="Grand Total" 
                    value={`₹${grandTotal}`} 
                    className="text-lg font-bold"
                  />
                  {recyclePoints > 0 && (
                    <div className="mt-2 text-sm text-green-600 dark:text-green-400">
                      + {recyclePoints} reward points
                    </div>
                  )}
                </div>

                {/* Price breakdown toggle */}
                <button
                  onClick={() => setShowPriceBreakdown(!showPriceBreakdown)}
                  className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  <TrendingUp className="h-4 w-4" />
                  {showPriceBreakdown ? "Hide" : "Show"} detailed breakdown
                </button>

                {showPriceBreakdown && (
                  <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800 text-xs space-y-1">
                    <div>Base price calculation includes product discounts</div>
                    <div>GST applies only to sell items, not recycling</div>
                    <div>Carbon offset is optional and helps fund green projects</div>
                    <div>Points: {POINTS_PER_RUPEE} points = ₹1</div>
                  </div>
                )}

                {/* Payment Method */}
                <div className="mt-4 space-y-3">
                  <Field label="Payment Method">
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { value: "UPI", icon: "📱", desc: "PhonePe, GPay" },
                        { value: "Wallet", icon: "💳", desc: "Digital wallet" },
                        { value: "COD", icon: "💵", desc: "Cash on delivery" },
                        { value: "Points", icon: "⭐", desc: "Use points only" }
                      ].map(method => (
                        <button
                          key={method.value}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            payment === method.value
                              ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                              : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                          }`}
                          onClick={() => setPayment(method.value as any)}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{method.icon}</span>
                            <div>
                              <div className="font-medium text-sm">{method.value}</div>
                              <div className="text-xs text-gray-500">{method.desc}</div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </Field>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <button 
                      className="btn-primary w-full py-3 flex items-center justify-center gap-2 text-base font-semibold" 
                      onClick={handleCheckout}
                      disabled={cart.length === 0}
                    >
                      <Shield className="h-5 w-5" />
                      Place Order
                      {grandTotal > 0 && <span className="ml-2">₹{grandTotal}</span>}
                    </button>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <button className="btn-secondary flex items-center justify-center gap-2">
                        <Package className="h-4 w-4" />
                        Save Cart
                      </button>
                      <button 
                        className="btn-secondary flex items-center justify-center gap-2"
                        onClick={() => window.print()}
                      >
                        📄 Print
                      </button>
                    </div>
                  </div>

                  {/* Security & Trust Indicators */}
                  <div className="flex items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-400 mt-4">
                    <div className="flex items-center gap-1">
                      <Shield className="h-3 w-3" />
                      <span>Secure</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Leaf className="h-3 w-3" />
                      <span>Eco-friendly</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      <span>Verified</span>
                    </div>
                  </div>
                </div>
              </div>
            </Section>

            {/* Environmental Impact */}
            <Section title="Environmental Impact" icon={<Leaf className="h-5 w-5 text-green-600" />}>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 rounded-xl bg-green-50 dark:bg-green-900/20">
                    <div className="text-2xl font-bold text-green-600">{recycleWeight.toFixed(1)}</div>
                    <div className="text-xs text-green-700 dark:text-green-400">kg recycled</div>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20">
                    <div className="text-2xl font-bold text-blue-600">{totalCarbonFootprint.toFixed(1)}</div>
                    <div className="text-xs text-blue-700 dark:text-blue-400">kg CO₂ footprint</div>
                  </div>
                </div>
                
                <div className="p-3 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800">
                  <div className="text-sm font-medium text-green-800 dark:text-green-200">Impact Summary</div>
                  <div className="text-xs text-green-700 dark:text-green-300 mt-1">
                    Your order saves {(recycleWeight * 2.5).toFixed(1)}kg CO₂ through recycling and supports sustainable products.
                  </div>
                </div>
              </div>
            </Section>
          </div>
        </div>

        {/* Enhanced Footer */}
        <footer className="mt-12 py-8 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-lg font-semibold mb-2">
              <Leaf className="h-5 w-5 text-green-600" />
              <span>Zentara</span>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Building a sustainable future through conscious consumption
            </div>
            <div className="flex items-center justify-center gap-6 text-xs text-gray-500">
              <span>© {new Date().getFullYear()} Zentara</span>
              <span>•</span>
              <span>Privacy Policy</span>
              <span>•</span>
              <span>Terms of Service</span>
              <span>•</span>
              <span>Support</span>
            </div>
          </div>
        </footer>
      </div>

      {/* Enhanced Styles */}
      <style jsx>{`
        .btn-primary { 
          @apply bg-gradient-to-r from-emerald-600 to-green-600 text-white px-4 py-2 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100; 
        }
        .btn-secondary { 
          @apply bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 rounded-2xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hover:shadow-md transition-all duration-200; 
        }
        .btn-danger { 
          @apply bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 px-4 py-2 rounded-2xl border border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/40 transition-all duration-200; 
        }
        .card { 
          @apply bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow duration-200; 
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(34, 197, 94, 0.5);
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 197, 94, 0.7);
        }
        
        /* Animations */
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        .animate-slide-in {
          animation: slideInRight 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

// ---------- Enhanced Components ----------

function NotificationCard({ notification }: { notification: Notification }) {
  const icons = {
    success: <CheckCircle className="h-4 w-4 text-green-500" />,
    warning: <AlertCircle className="h-4 w-4 text-amber-500" />,
    error: <AlertCircle className="h-4 w-4 text-red-500" />,
    info: <Bell className="h-4 w-4 text-blue-500" />
  };

  const bgColors = {
    success: "bg-green-50 border-green-200 text-green-800",
    warning: "bg-amber-50 border-amber-200 text-amber-800", 
    error: "bg-red-50 border-red-200 text-red-800",
    info: "bg-blue-50 border-blue-200 text-blue-800"
  };

  return (
    <div className={`animate-slide-in p-4 rounded-xl border shadow-lg max-w-sm ${bgColors[notification.type]}`}>
      <div className="flex items-start gap-3">
        {icons[notification.type]}
        <div className="flex-1">
          <div className="text-sm font-medium">{notification.message}</div>
          <div className="text-xs opacity-70 mt-1">
            {notification.timestamp.toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
}

function CartItemCard({ 
  line, 
  onUpdateQty, 
  onUpdateWeight, 
  onRemove, 
  onSaveForLater,
  darkMode 
}: {
  line: CartLine;
  onUpdateQty: (id: ID, qty: number) => void;
  onUpdateWeight: (id: ID, weight: number) => void;
  onRemove: (id: ID) => void;
  onSaveForLater: (id: ID) => void;
  darkMode: boolean;
}) {
  const isSell = line.mode === "sell";
  const cardBg = darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100";

  return (
    <div className={`${cardBg} rounded-2xl p-5 shadow-sm border hover:shadow-md transition-all duration-200`}>
      <div className="flex items-start gap-4">
        {/* Item Icon/Thumbnail */}
        <div className={`h-16 w-16 rounded-xl flex items-center justify-center text-2xl ${
          isSell ? "bg-blue-100 dark:bg-blue-900/20" : "bg-green-100 dark:bg-green-900/20"
        }`}>
          {isSell ? "🛍️" : "♻️"}
        </div>

        <div className="flex-1">
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
            <div>
              <h3 className="font-semibold text-lg mb-1">{line.name}</h3>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-xs px-2 py-1 rounded-full border ${
                  isSell ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800" : 
                  "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800"
                }`}>
                  {isSell ? line.category : line.material}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  isSell ? "bg-indigo-100 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400" : 
                  "bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400"
                }`}>
                  {line.mode.toUpperCase()}
                </span>
                {isSell && line.discount && (
                  <span className="text-xs px-2 py-1 rounded-full bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800">
                    {line.discount}% OFF
                  </span>
                )}
                {isSell && line.isOrganic && (
                  <span className="text-xs px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800">
                    🌱 Organic
                  </span>
                )}
              </div>
              {isSell && line.rating && (
                <div className="flex items-center gap-1 mt-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i < Math.floor(line.rating!) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">({line.rating})</span>
                </div>
              )}
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => onSaveForLater(line.id)}
                className="p-2 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                title="Save for later"
              >
                <Heart className="h-4 w-4" />
              </button>
              <button
                onClick={() => onRemove(line.id)}
                className="p-2 rounded-xl bg-red-100 dark:bg-red-900/20 hover:bg-red-200 dark:hover:bg-red-900/40 text-red-600 transition-colors"
                title="Remove item"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Item Details */}
          {isSell ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 items-end">
              <Field label="Unit Price">
                <div className="space-y-1">
                  {line.discount ? (
                    <>
                      <div className="text-lg font-bold text-green-600">
                        ₹{line.unitPrice - (line.unitPrice * line.discount / 100)}
                      </div>
                      <div className="text-sm text-gray-500 line-through">₹{line.unitPrice}</div>
                    </>
                  ) : (
                    <div className="text-lg font-bold">₹{line.unitPrice}</div>
                  )}
                </div>
              </Field>

              <Field label="Quantity">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onUpdateQty(line.id, line.qty - 1)}
                    className="p-1 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                    disabled={line.qty <= 1}
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <input
                    type="number"
                    className="w-16 text-center rounded-lg border-gray-200 dark:border-gray-600 dark:bg-gray-700"
                    min={1}
                    max={999}
                    value={line.qty}
                    onChange={(e) => onUpdateQty(line.id, Number(e.target.value))}
                  />
                  <button
                    onClick={() => onUpdateQty(line.id, line.qty + 1)}
                    className="p-1 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              </Field>

              <Field label="Line Total">
                <div className="text-xl font-bold text-blue-600">
                  ₹{((line.unitPrice - (line.discount ? line.unitPrice * line.discount / 100 : 0)) * line.qty)}
                </div>
              </Field>

              {line.carbonFootprint && (
                <Field label="Carbon Impact">
                  <div className="text-sm text-green-600 flex items-center gap-1">
                    <Leaf className="h-3 w-3" />
                    {(line.carbonFootprint * line.qty).toFixed(2)}kg CO₂
                  </div>
                </Field>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 items-end">
              <Field label="Reward Rate">
                <div className="flex items-center gap-1">
                  <Award className="h-4 w-4 text-emerald-600" />
                  <span className="font-medium">{line.rewardPerKg} pts/kg</span>
                </div>
              </Field>

              <Field label="Est. Value">
                <div className="font-medium text-green-600">
                  ₹{line.estValuePerKg}/kg
                </div>
              </Field>

              <Field label="Weight (kg)">
                <input
                  type="number"
                  step="0.1"
                  min={0}
                  max={999}
                  className="w-full rounded-xl border-gray-200 dark:border-gray-600 dark:bg-gray-700"
                  value={line.weightKg}
                  onChange={(e) => onUpdateWeight(line.id, Number(e.target.value))}
                />
              </Field>

              <Field label="Total Points">
                <div className="text-xl font-bold text-emerald-600">
                  {Math.round(line.rewardPerKg * line.weightKg)}
                </div>
              </Field>

              <Field label="Condition">
                <div className={`text-sm px-2 py-1 rounded-lg ${
                  line.condition === "excellent" ? "bg-green-100 text-green-700" :
                  line.condition === "good" ? "bg-yellow-100 text-yellow-700" :
                  "bg-red-100 text-red-700"
                }`}>
                  {line.condition}
                </div>
              </Field>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SavedItemCard({ line, onMoveToCart, darkMode }: {
  line: CartLine;
  onMoveToCart: (id: ID) => void;
  darkMode: boolean;
}) {
  const cardBg = darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100";
  
  return (
    <div className={`${cardBg} rounded-2xl p-4 shadow-sm border flex items-center justify-between hover:shadow-md transition-all`}>
      <div className="flex items-center gap-3">
        <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${
          line.mode === "sell" ? "bg-blue-100 dark:bg-blue-900/20" : "bg-green-100 dark:bg-green-900/20"
        }`}>
          {line.mode === "sell" ? "🛍️" : "♻️"}
        </div>
        <div>
          <div className="font-medium">{line.name}</div>
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <span>{line.mode === "sell" ? line.category : line.material}</span>
            {line.mode === "sell" && line.unitPrice && (
              <span className="font-medium">₹{line.unitPrice}</span>
            )}
            {line.mode === "recycle" && (
              <span className="text-green-600">{line.rewardPerKg} pts/kg</span>
            )}
          </div>
        </div>
      </div>
      <button 
        className="btn-primary px-3 py-2 text-sm" 
        onClick={() => onMoveToCart(line.id)}
      >
        Move to Cart
      </button>
    </div>
  );
}

function OrderHistoryCard({ order, darkMode }: {
  order: { id: string; date: string; total: number; items: number; status: string };
  darkMode: boolean;
}) {
  const cardBg = darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100";
  const statusColors = {
    delivered: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
    processing: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
    cancelled: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
  };

  return (
    <div className={`${cardBg} rounded-2xl p-4 shadow-sm border hover:shadow-md transition-all`}>
      <div className="flex items-center justify-between mb-2">
        <div className="font-medium">Order {order.id}</div>
        <span className={`px-2 py-1 rounded-full text-xs ${statusColors[order.status as keyof typeof statusColors]}`}>
          {order.status}
        </span>
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
        <div>Date: {new Date(order.date).toLocaleDateString()}</div>
        <div>{order.items} items • ₹{order.total}</div>
      </div>
      <div className="mt-3 flex gap-2">
        <button className="btn-secondary text-xs px-3 py-1">View Details</button>
        <button className="btn-secondary text-xs px-3 py-1">Reorder</button>
      </div>
    </div>
  );
}

function Section({ title, icon, children }: { 
  title: string; 
  icon?: React.ReactNode; 
  children: React.ReactNode; 
}) {
  return (
    <section className="card">
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
        {label}
      </label>
      {children}
    </div>
  );
}

function Row({ 
  label, 
  value, 
  className = ""
}: { 
  label: React.ReactNode; 
  value: string | number; 
  className?: string; 
}) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div>{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  );
}

function ProgressBar({ 
  value, 
  label, 
  icon 
}: { 
  value: number; 
  label?: string; 
  icon?: React.ReactNode; 
}) {
  return (
    <div className="min-w-[300px]">
      <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-2">
        <div className="flex items-center gap-1">
          {icon}
          <span>Free Pickup Progress</span>
        </div>
        <div className="font-medium">{Math.round(value)}%</div>
      </div>
      <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
      {label && (
        <div className="text-xs text-gray-700 dark:text-gray-300 mt-2 font-medium">
          {label}
        </div>
      )}
    </div>
  );
}

function EmptyState({ 
  icon, 
  title, 
  description, 
  actionText 
}: {
  icon: string;
  title: string;
  description: string;
  actionText?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
        {description}
      </p>
      {actionText && (
        <button className="btn-primary flex items-center gap-2">
          <Plus className="h-4 w-4" />
          {actionText}
        </button>
      )}
    </div>
  );
}

// ---------- Utility Functions ----------
function nextDateISO(offsetDays = 1) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}