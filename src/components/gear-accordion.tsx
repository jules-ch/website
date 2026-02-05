"use client"

import { useState } from "react"

export function GearAccordion() {
  const [isGearOpen, setIsGearOpen] = useState(false)

  const gearList = [
    { name: "Fuji X-T2", category: "Camera Body" },
    { name: "XF10-24mm f/4 R OIS", category: "Wide Angle Lens" },
    { name: "XF35mm f/1.4 R", category: "Prime Lens" },
    // { name: "XF55-200mm f/3.5-4.8 R LM OIS", category: "Telephoto Lens" },
    // { name: "Peak Design Slide Lite", category: "Camera Strap" },
    // { name: "SanDisk Extreme Pro", category: "Memory Cards" },
  ]

  return (
    <div className="lg:sticky lg:top-24">
      <button
        onClick={() => setIsGearOpen(!isGearOpen)}
        className="flex justify-between items-center w-full p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-200"
      >
        <span className="text-white font-medium text-sm">My Photography Gear</span>
        <span className="text-accent text-lg transition-transform duration-200">
          {isGearOpen ? "−" : "+"}
        </span>
      </button>

      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isGearOpen ? "max-h-[500px] opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"}`}>
        <div className="space-y-2">
          {gearList.map((item, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-gray-800 rounded-md hover:bg-gray-700 transition-colors">
              <div>
                <div className="text-gray-400 text-xs">{item.category}</div>
                <div className="text-white text-sm">{item.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
