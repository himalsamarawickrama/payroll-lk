import { useState } from 'react'

export default function App() {
  const [basicSalary, setBasicSalary] = useState<number>(100000)

  // Core Sri Lankan Payroll Calculations (Calculated dynamically)
  const employeeEPF = basicSalary * 0.08
  const employerEPF = basicSalary * 0.12
  const employerETF = basicSalary * 0.03
  
  // Simple representation of APIT tax (Progressive bands exist, this is a basic demo threshold)
  const apitTax = basicSalary > 100000 ? (basicSalary - 100000) * 0.06 : 0
  const netTakeHome = basicSalary - employeeEPF - apitTax

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans p-6">
      {/* Sri Lankan Branding Top Strip */}
      <div className="h-2 w-full bg-gradient-to-r from-orange-500 via-maroon-700 to-green-600 rounded-t" />
      
      <header className="max-w-4xl mx-auto my-8 flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
            🇱🇰 Payroll.lk <span className="text-xs bg-emerald-500/10 text-emerald-400 font-medium px-2 py-0.5 rounded border border-emerald-500/20">Live</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">Sri Lanka Compliance Automated (EPF/ETF/APIT)</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Input Card */}
        <div className="bg-slate-800/50 border border-slate-700/50 p-6 rounded-xl shadow-xl backdrop-blur-sm">
          <h2 className="text-xl font-semibold mb-4 text-white">Employee Salary Input</h2>
          <label className="block text-sm font-medium text-slate-400 mb-2">Basic Salary (LKR)</label>
          <input 
            type="number" 
            value={basicSalary}
            onChange={(e) => setBasicSalary(Number(e.target.value))}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-xl font-mono text-emerald-400 focus:outline-none focus:border-emerald-500 transition-colors"
          />
          <p className="text-xs text-slate-500 mt-2">*Based on Inland Revenue Department (IRD) & EPF Act guidelines.</p>
        </div>

        {/* Right Output Card */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-inner space-y-4">
          <h2 className="text-xl font-semibold text-white pb-2 border-b border-slate-800">Payslip Breakdown</h2>
          
          <div className="flex justify-between items-center py-1">
            <span className="text-slate-400">Basic Salary</span>
            <span className="font-mono text-slate-200">Rs. {basicSalary.toLocaleString()}</span>
          </div>

          <div className="flex justify-between items-center text-red-400 py-1 border-b border-slate-800/50 pb-3">
            <span className="text-slate-400">Employee EPF Deduction (8%)</span>
            <span className="font-mono">- Rs. {employeeEPF.toLocaleString()}</span>
          </div>

          <div className="flex justify-between items-center text-red-400 py-1 border-b border-slate-800/50 pb-3">
            <span className="text-slate-400">APIT (Income Tax Estimation)</span>
            <span className="font-mono">- Rs. {apitTax.toLocaleString()}</span>
          </div>

          <div className="flex justify-between items-center pt-2 text-2xl font-bold">
            <span className="text-white">Net Take-Home</span>
            <span className="font-mono text-emerald-400">Rs. {netTakeHome.toLocaleString()}</span>
          </div>

          {/* Statutory Employer Contributions */}
          <div className="bg-slate-950/50 border border-slate-800/80 rounded-lg p-4 mt-6 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Employer Liabilities (Not deducted from worker)</h3>
            <div className="flex justify-between text-xs text-slate-400">
              <span>Employer EPF Contribution (12%)</span>
              <span className="font-mono text-slate-300">Rs. {employerEPF.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs text-slate-400">
              <span>Employer ETF Contribution (3%)</span>
              <span className="font-mono text-slate-300">Rs. {employerETF.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}