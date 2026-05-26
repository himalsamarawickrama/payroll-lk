import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";

export default function App() {
  const [activeTab, setActiveTab] = useState<"calculator" | "registry">("registry");

  return (
    <div className="w-screen min-h-screen bg-[#F0F4F8] font-sans antialiased flex flex-col">
      
      {/* Unified Tab Navigation Top Banner Header Component */}
      <header className="bg-gradient-to-r from-[#0A3D62] to-[#185FA5] text-white px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="text-xl">🇱🇰</div>
          <div>
            <h1 className="text-sm font-serif font-bold tracking-wide text-[#FFD700]">Payroll LK Workspace</h1>
            <p className="text-[10px] text-white/60">Local Development Environment node</p>
          </div>
        </div>
        
        {/* Dynamic Navigation Switcher Buttons Panel */}
        <div className="flex bg-black/15 rounded-xl p-1 border border-white/5 gap-1">
          <button
            onClick={() => setActiveTab("registry")}
            className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer
              ${activeTab === "registry" ? "bg-white text-[#0A3D62] shadow" : "text-white/70 hover:text-white"}`}
          >
            👥 Employees Registry
          </button>
          <button
            onClick={() => setActiveTab("calculator")}
            className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer
              ${activeTab === "calculator" ? "bg-white text-[#0A3D62] shadow" : "text-white/70 hover:text-white"}`}
          >
            🧮 EPF Simulator
          </button>
        </div>
      </header>

      {/* Render Selected Functional Page Content View Segment */}
      <div className="flex-1 flex flex-col min-h-0">
        {activeTab === "registry" ? <Employees /> : <Dashboard />}
      </div>

    </div>
  );
}