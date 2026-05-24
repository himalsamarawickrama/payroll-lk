interface SalaryIngredients {
    basicSalary: number;
    fixedAllowance: number;
}

interface PayrollCalculations {
    grossEarnings: number;
    employeeEPF: number;  // 8% duduction from employee
    employerEPF: number;  //12% paid by company
    employerETF: number;  // 3% paid by company
    netSalary: number;    // What employee takes home after deductions
    }

export function calculatePayroll({basicSalary, fixedAllowance}: SalaryIngredients): PayrollCalculations {
    // calculate total earnings
    const grossEarnings = basicSalary + fixedAllowance;

    // calculate the deductions and contributions

    const employeeEPF = grossEarnings * 0.08; // 8% from employee  
    const employerEPF = grossEarnings * 0.12; // 12% from employer
    const employerETF = grossEarnings * 0.03; // 3% from employer
    
    // calculate net salary
    const netSalary = grossEarnings - employeeEPF; // Employee takes home after EPF deduction

    return{
        grossEarnings,
        employeeEPF,
        employerEPF,
        employerETF,
        netSalary,
    };

    }