import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Package, 
  MapPin, 
  Clock, 
  Truck, 
  CheckCircle2, 
  ArrowRight, 
  Shirt,
  Calendar,
  Building2,
  Phone,
  Sparkles
} from 'lucide-react';

export const ItemDonationModal = () => {
  const { 
    itemModalReq, 
    setItemModalReq, 
    processItemDonation, 
    setTrackerModalDonation,
    user
  } = useApp();

  if (!itemModalReq) return null;

  const [clothType, setClothType] = useState('Thermal Blankets & Winter Jackets');
  const [itemCondition, setItemCondition] = useState('Gently Used / Cleaned');
  const [itemCount, setItemCount] = useState(3);
  const [address, setAddress] = useState('Flat 402, Sunshine Heights, Koramangala, Bengaluru');
  const [pincode, setPincode] = useState('560034');
  const [phone, setPhone] = useState(user.phone || '+91 98765 43210');
  const [slot, setSlot] = useState('Tomorrow, 10:00 AM - 01:00 PM');
  const [isBooked, setIsBooked] = useState(false);
  const [bookedDonation, setBookedDonation] = useState(null);

  const clothCategoryOptions = [
    'Thermal Blankets & Winter Jackets',
    'Sweaters, Hoodies & Shawls',
    'Cotton Shirts, Trousers & Jeans',
    'Sarees, Dhotis & Ethnic Wear',
    'Children & Baby Clothes',
    'School Uniforms & Backpacks',
    'Footwear & Shoes'
  ];

  const slots = [
    'Tomorrow, 10:00 AM - 01:00 PM',
    'Tomorrow, 02:00 PM - 05:00 PM',
    'Day after, 10:00 AM - 01:00 PM',
    'Weekend Slot (Sat/Sun 10 AM - 2 PM)'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullPickupAddress = `${address}, Pincode: ${pincode} | Contact: ${phone} | Item Type: ${clothType} (${itemCondition})`;
    const donation = processItemDonation({
      req: itemModalReq,
      itemCount,
      pickupAddress: fullPickupAddress,
      pickupSlot: slot
    });
    setBookedDonation(donation);
    setIsBooked(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Shirt className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white leading-tight">Doorstep Clothes & Item Pickup</h3>
              <p className="text-[10px] text-indigo-400 font-semibold">100% Free Doorstep Collection Drive</p>
            </div>
          </div>

          <button
            onClick={() => setItemModalReq(null)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isBooked ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto text-xs flex-1">
            
            {/* NGO Requirement Summary */}
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center space-x-3">
              <img 
                src={itemModalReq.image} 
                alt={itemModalReq.title}
                className="w-12 h-12 rounded-xl object-cover" 
              />
              <div className="overflow-hidden">
                <span className="text-[10px] uppercase font-bold text-indigo-400 block">{itemModalReq.ngoName}</span>
                <p className="text-xs font-bold text-white truncate">{itemModalReq.title}</p>
                <p className="text-[11px] text-slate-400">Drive Goal: {itemModalReq.unitName}</p>
              </div>
            </div>

            {/* SECTION 1: CLOTHES & ITEM DETAILS */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center space-x-1.5 text-indigo-400 font-bold text-[11px] uppercase tracking-wider">
                <Shirt className="w-4 h-4" />
                <span>1. Clothes / Item Specifications</span>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Type of Clothes / Items</label>
                <select
                  value={clothType}
                  onChange={(e) => setClothType(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                >
                  {clothCategoryOptions.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Condition</label>
                  <select
                    value={itemCondition}
                    onChange={(e) => setItemCondition(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Brand New">Brand New</option>
                    <option value="Gently Used / Cleaned">Gently Used / Cleaned</option>
                    <option value="Good Condition">Good Condition</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Quantity (Pieces)</label>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => setItemCount(Math.max(1, itemCount - 1))}
                      className="w-8 h-8 rounded-lg bg-slate-800 text-white font-bold hover:bg-slate-700"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={itemCount}
                      onChange={(e) => setItemCount(parseInt(e.target.value) || 1)}
                      className="w-14 text-center py-1.5 bg-slate-950 border border-slate-700 rounded-lg font-bold text-white"
                    />
                    <button
                      type="button"
                      onClick={() => setItemCount(itemCount + 1)}
                      className="w-8 h-8 rounded-lg bg-slate-800 text-white font-bold hover:bg-slate-700"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 2: DOORSTEP PICKUP ADDRESS & CONTACT */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <div className="flex items-center space-x-1.5 text-indigo-400 font-bold text-[11px] uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                <span>2. Pickup Address & Contact Details</span>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Doorstep Street Address</label>
                <textarea
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House No, Building, Street, Landmark..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Pincode</label>
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Contact Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Preferred Time Slot</label>
                <select
                  value={slot}
                  onChange={(e) => setSlot(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                >
                  {slots.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Zero Money Note */}
            <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-[11px] text-indigo-300 flex items-center space-x-2">
              <Truck className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>100% Free Doorstep Pickup by NGO Logistics Agent. Zero monetary payment required!</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white font-extrabold text-xs shadow-lg hover:from-indigo-500 hover:to-purple-500 transition-all flex items-center justify-center space-x-2 cursor-pointer border border-indigo-400/30"
            >
              <Truck className="w-4 h-4 text-white" />
              <span className="text-white font-black">Confirm Doorstep Item Pickup</span>
            </button>

          </form>
        ) : (
          <div className="p-6 text-center space-y-5">
            
            <div className="w-16 h-16 mx-auto rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30 glow-emerald">
              <CheckCircle2 className="w-8 h-8 text-indigo-400" />
            </div>

            <div>
              <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold">
                Doorstep Pickup Scheduled!
              </span>
              <h3 className="text-xl font-black text-white mt-2">{itemCount} Pieces - {clothType}</h3>
              <p className="text-xs text-slate-300 mt-1">Beneficiary NGO: <strong className="text-white">{itemModalReq.ngoName}</strong></p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left text-xs space-y-2 font-mono">
              <div className="flex justify-between">
                <span className="text-slate-400">Tracking Ref:</span>
                <span className="text-white font-bold">{bookedDonation.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Pickup Slot:</span>
                <span className="text-indigo-400 font-bold">{slot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Agent Contact:</span>
                <span className="text-slate-200">{phone}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setItemModalReq(null);
                setTrackerModalDonation(bookedDonation);
              }}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer border border-indigo-400/30"
            >
              <span className="text-white font-black">Track Item Pickup & Delivery</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>

          </div>
        )}

      </div>
    </div>
  );
};
