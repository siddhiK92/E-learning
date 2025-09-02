import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import { clerkWebhooks } from './controllers/webhooks.js'; // make sure this is correctly imported

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
// app.use(express.json());

// Route for Clerk Webhooks
app.get('/', (req, res)=> res. send('API Working'))
app.post('/clerk', express.json(), clerkWebhooks);

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("MongoDB connected");
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
})
.catch((err) => {
  console.error("MongoDB connection error:", err.message);
});
