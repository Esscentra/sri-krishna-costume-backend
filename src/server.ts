import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import connectDB from './config/db'; // ✅ Named import

const PORT = process.env.PORT || 5000;

// ✅ Start server after DB connection
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
