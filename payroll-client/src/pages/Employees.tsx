import { useState } from "react"; // Fixed: Removed unused 'use' import
import { calculatePayroll } from "../utils/epfCalculator"; // Fixed: Matched utility name

interface EmployeeProfile {
    id: string;
    fullName: string;
    basicSalary: number;
    department: string;
}

export default function Employees() {
    // Storage for our list of registered workers
    const [employees, setEmployees] = useState<EmployeeProfile[]>([
        { id: "1", fullName: "Jayasanka", basicSalary: 100000, department: "Engineering" }
    ]);

    // Storage for what the user is currently typing inside the form input fields
    const [formName, setFormName] = useState("");
    const [formSalary, setFormSalary] = useState("");
    const [formDept, setFormDept] = useState("Engineering"); // Fixed: Set default value matching first dropdown choice

    // Fixed: Moved inside the component function scope block so it can access states
    const handleAddEmployee = (e: React.FormEvent) => {
        e.preventDefault(); // Prevent page reload on form submit

        // Safety guard
        if (!formName || !formSalary) {
            alert("Please fill out both the Name and Salary fields!");
            return;
        }

        // Pack the form inputs neatly into an Employee card object
        const newEmployee: EmployeeProfile = {
            id: crypto.randomUUID(), 
            fullName: formName,
            department: formDept,
            basicSalary: Number(formSalary) || 0, 
        };

        // Fixed: Corrected 'Employees' capitalization to lowercase 'employees'
        setEmployees([...employees, newEmployee]);

        // Wipe the form inputs clean
        setFormName("");
        setFormSalary("");
    };

    // Fixed: Moved inside the component function scope block
    return (
        <div className="p-8 max-w-5xl mx-auto space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-[#0A3D62]">Staff Directory Workspace</h1>
            <p className="text-xs text-slate-500 mt-1">Type records to trigger instant Sri Lankan statutory deductions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            
            {/* ── TYPE INPUT FORM ── */}
            <form onSubmit={handleAddEmployee} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-[#0A3D62] uppercase tracking-wider border-b border-slate-100 pb-2">Add New Profile</h3>
              
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block mb-1">Full Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Priyantha Perera"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-medium focus:outline-none focus:border-[#185FA5]"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block mb-1">Basic Salary (LKR)</label>
                <input 
                  type="number" 
                  placeholder="e.g. 95000"
                  value={formSalary}
                  onChange={(e) => setFormSalary(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-mono font-bold focus:outline-none focus:border-[#185FA5]"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block mb-1">Department</label>
                <select value={formDept} onChange={(e) => setFormDept(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold text-slate-600 focus:outline-none focus:border-[#185FA5]">
                  <option>Engineering</option>
                  <option>Finance</option>
                  <option>HR & Admin</option>
                </select>
              </div>

              <button type="submit" className="w-full bg-[#0A3D62] text-white text-xs font-bold p-3 rounded-xl hover:opacity-95 shadow-sm cursor-pointer transition-all">
                + Save Employee
              </button>
            </form>

            {/* ── WORKFORCE PROFILE DIRECTORY VIEW ── */}
            <div className="md:col-span-2 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
              <h3 className="text-xs font-bold text-[#0A3D62] uppercase tracking-wider mb-4">Active Registry ({employees.length})</h3>
              
              <div className="space-y-2.5">
                {employees.map((emp) => {
                  const salaryMetrics = calculatePayroll({
                    basicSalary: emp.basicSalary,
                    fixedAllowance: 0
                  });

                  return (
                    <div key={emp.id} className="flex justify-between items-center p-3.5 bg-slate-50 rounded-xl border border-slate-100 hover:border-slate-200 transition-all">
                      <div>
                        <div className="text-xs font-bold text-slate-800">{emp.fullName}</div>
                        <div className="text-[10px] font-mono font-medium text-slate-400 mt-0.5">{emp.department} · Base: Rs. {emp.basicSalary.toLocaleString()}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-bold text-emerald-600">Rs. {salaryMetrics.netSalary.toLocaleString()}</div>
                        <div className="text-[10px] font-mono text-red-500 font-medium mt-0.5">EPF (8%): -Rs. {salaryMetrics.employeeEPF.toLocaleString()}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
    );
} // ✅ Fixed: The function now safely wraps all logic down to the very last line.