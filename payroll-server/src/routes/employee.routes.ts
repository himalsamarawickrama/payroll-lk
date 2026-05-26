import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// 📥 1. CREATE ENDPOINT
router.post("/", async (req, res) => { // Fixed: Kept async handler inside the post arguments
    try {
        const { employeeId, fullName, nicNumber, epfNumber, department, basicSalary, fixedAllowance } = req.body;
        
        // Fixed: Placed validation inside the try block scope where it belongs
        if (!employeeId || !fullName || !basicSalary) {
            return res.status(400).json({ error: "Required fields missing!" }); // Fixed: Removed trailing parenthesis error
        }

        const newEmployee = await prisma.employee.create({
            data: { 
                employeeId,
                fullName,
                nicNumber,
                epfNumber,
                department,
                basicSalary: Number(basicSalary),
                fixedAllowance: Number(fixedAllowance) || 0, // Fixed: Changed semicolon to a comma
            } // Fixed: Removed trailing semicolon here
        });

        return res.status(201).json(newEmployee);

    } catch (error: any) { // Fixed: This catch now perfectly links to the matching try block
        console.error("Database Save Error", error);
        return res.status(500).json({ error: "Failed to write employee to the cloud database registry." });
    }
}); // Fixed: Cleanly closed the POST route block completely



// 📤 2. FETCH ALL ENDPOINT
router.get("/", async (req, res) => {
    try {
        const allEmployees = await prisma.employee.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });
        return res.status(200).json(allEmployees);
    } catch (error) { 
        console.error("Database Fetch Error", error);
        return res.status(500).json({ error: "Failed to retrieve employee directory rows from cloud storage" });
    }
});

export default router;