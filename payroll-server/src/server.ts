import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Base check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Sri Lanka Payroll System API is live!' });
});

app.listen(PORT, () => {
  console.log(`Server is actively running and listening on port ${PORT}`);
});
