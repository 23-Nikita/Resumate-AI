import { Check, Palette, ChevronDown } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

export default function ColorPicker({ selectedColor, onChange }) {
  const colors = [
    { name: "Emerald", value: "#10B981" },
    { name: "Blue", value: "#3B82F6" },
    { name: "Indigo", value: "#6366F1" },
    { name: "Purple", value: "#8B5CF6" },
    { name: "Rose", value: "#F43F5E" },
    { name: "Amber", value: "#F59E0B" },
    { name: "Cyan", value: "#06B6D4" },
    { name: "Slate", value: "#475569" }
  ];

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button - Optimized for Sidebar Row */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 bg-slate-900 border transition-all rounded-xl shadow-md group ${
          isOpen ? 'border-emerald-500 ring-2 ring-emerald-500/10' : 'border-slate-800'
        }`}
      >
        <div 
          className="size-3.5 rounded-full border border-white/20 shadow-sm" 
          style={{ backgroundColor: selectedColor || "#10B981" }}
        />
        <span className="text-[10px] font-black uppercase tracking-wider text-slate-300">
          Accent
        </span>
        <ChevronDown size={12} className={`text-slate-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu - Changed to top-full and high Z-index */}
      {isOpen && (
        <div className="absolute top-full mt-2 left-0 w-52 p-4 bg-slate-900/98 backdrop-blur-md border border-slate-800 rounded-2xl shadow-2xl z-[999] animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="mb-3 px-1">
            <h4 className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Select Theme</h4>
          </div>
          
          <div className="grid grid-cols-4 gap-3">
            {colors.map((color) => (
              <button
                key={color.value}
                className="relative flex flex-col items-center group outline-none"
                onClick={() => {
                  onChange(color.value);
                  setIsOpen(false);
                }}
              >
                <div
                  className={`size-9 rounded-full border-2 transition-all duration-300 ${
                    selectedColor === color.value 
                    ? 'border-white scale-110' 
                    : 'border-transparent hover:border-white/30'
                  }`}
                  style={{ backgroundColor: color.value }}
                >
                  {selectedColor === color.value && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Check className="size-3.5 text-white stroke-[3]" />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Active Hex Display */}
          <div className="mt-4 pt-3 border-t border-slate-800/50">
             <div className="flex items-center justify-between px-1">
                <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">Hex</span>
                <span className="text-[9px] font-mono text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                   {selectedColor || "#10B981"}
                </span>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}