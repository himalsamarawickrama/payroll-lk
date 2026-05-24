import { useState } from "react";
// Import your core math calculation function
import { calculatePayroll } from "../utils/epfCalculator";

export default function Dashboard() {
  // ── INPUT STATE FOR THE UI ──
  const [inputSalary, setInputSalary] = useState<string>("100000");
  const [inputAllowance, setInputAllowance] = useState<string>("25000");

  // Run your epfCalculator logic live as values change in the input boxes
  const liveCalculations = calculatePayroll({
    basicSalary: Number(inputSalary) || 0,
    fixedAllowance: Number(inputAllowance) || 0,
  });

  return (
    <main className="flex-1 min-h-screen bg-[#F0F4F8] flex items-center justify-center p-6">
      
      {/* Central Calculator Card */}
      <div className="w-full max-w-md bg-white rounded-2xl p-6 border border-slate-200 shadow-md">
        
        {/* Card Header */}
        <div className="mb-5 border-b border-slate-100 pb-4">
          <h2 className="font-serif text-lg font-bold text-[#0A3D62]">
            🇱🇰 Sri Lankan EPF/ETF Calculator
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            UI testing interface for epfCalculator.ts logic
          </p>
        </div>

        {/* Form Inputs Section */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block mb-1">
              Basic Salary (LKR)
            </label>
            <input 
              type="number" 
              value={inputSalary} 
              onChange={(e) => setInputSalary(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-mono font-bold text-[#0A3D62] focus:outline-none focus:border-[#185FA5] transition-colors"
              placeholder="e.g. 100000"
            />
          </div>
          
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block mb-1">
              Fixed Allowance (LKR)
            </label>
            <input 
              type="number" 
              value={inputAllowance} 
              onChange={(e) => setInputAllowance(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-mono font-bold text-[#0A3D62] focus:outline-none focus:border-[#185FA5] transition-colors"
              placeholder="e.g. 25000"
            />
          </div>
        </div>

        {/* Live Calculation Results Output Table */}
        <div className="bg-slate-50 rounded-xl p-4 space-y-2.5 border border-slate-100">
          
          <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-200/60">
            <span className="text-slate-500 font-medium">Gross Earnings Base</span>
            <span className="font-mono font-bold text-slate-800">
              Rs. {liveCalculations.grossEarnings.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500">Employee EPF (8%) Deduction</span>
            <span className="font-mono font-semibold text-red-600">
              - Rs. {liveCalculations.employeeEPF.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500">Employer EPF (12%) Contribution</span>
            <span className="font-mono font-medium text-slate-600">
              + Rs. {liveCalculations.employerEPF.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between items-center text-xs pb-2">
            <span className="text-slate-500">Employer ETF (3%) Contribution</span>
            <span className="font-mono font-medium text-slate-600">
              + Rs. {liveCalculations.employerETF.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between items-center pt-2.5 border-t-2 border-slate-200">
            <span className="text-xs font-bold text-slate-800">Net Take-Home Salary</span>
            <span className="font-mono text-emerald-600 font-bold text-base">
              Rs. {liveCalculations.netSalary.toLocaleString()}
            </span>
          </div>

        </div>

      </div>
    </main>
  );
}