import dns from 'dns';
import mongoose from 'mongoose';

// ============================================================================
// STEP 1: Fix internet problem for MongoDB Atlas
// ============================================================================
// Sometimes home WiFi (like Jio or Airtel) cannot open MongoDB Atlas links.
// This line uses Google DNS (8.8.8.8) so your laptop can easily find Atlas.
try {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
} catch (e) {
  // If not allowed, just ignore it safely
}

// ============================================================================
// STEP 2: Create a shared memory box for our connection
// ============================================================================
// MongoDB Atlas free version only allows a limited number of connections.
// In Next.js, code runs again and again.
// To stop opening too many connections, we save our connection in 'global.mongoose'.
let cached = global.mongoose;

// If the memory box doesn't exist yet, create an empty one
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

// ============================================================================
// STEP 3: The connectDB function
// ============================================================================
const connectDB = async () => {
  // 3a. Check: Are we already connected to MongoDB?
  // If yes, just reuse it! Do not create a new one.
  if (cached.conn) {
    return cached.conn;
  }

  // 3b. Get your database link from .env.local
  // If not found, use your computer's local MongoDB
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/chai';

  // 3c. If no one is connecting right now, start the connection
  if (!cached.promise) {
    cached.promise = mongoose.connect(uri).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  // 3d. Wait for the connection to finish
  try {
    cached.conn = await cached.promise;
  } catch (error) {
    // If connection fails, clear the memory box so we can try again next time
    cached.promise = null;
    console.error(`MongoDB Connection Error: ${error.message}`);
    // Show the error (do NOT use process.exit, because it crashes the website on Vercel)
    throw error;
  }

  // 3e. Return the working database connection
  return cached.conn;
};

export default connectDB;
