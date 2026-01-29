import mongoose from "mongoose";

let isConnecting = false;
let connectionPromise = null;

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    throw new Error("MONGO_URI is not defined");
  }

  // Log URI (hide password)
  const hiddenUri = uri.replace(/([^:]*):([^@]*)@/, "$1:****@");
  console.log("🔗 Connecting to MongoDB:", hiddenUri);

  // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  if (mongoose.connection.readyState === 1) {
    // Already connected
    return mongoose;
  }

  if (isConnecting && connectionPromise) {
    // Reuse existing promise if connection is in progress
    return connectionPromise;
  }

  isConnecting = true;

  // Disable buffering so we fail immediately instead of 'buffering timed out'
  mongoose.set("bufferCommands", false);

  connectionPromise = mongoose
    .connect(uri, {
      // ===== CONNECTION POOLING =====
      // Optimized for Vercel (serverless) and Render (containerized)
      maxPoolSize: 50, // Maximum concurrent connections
      minPoolSize: 10, // Minimum warm connections to maintain
      maxIdleTimeMS: 60000, // Close idle connections after 60s

      // ===== TIMEOUT CONFIGURATION =====
      // Fail fast instead of hanging indefinitely
      serverSelectionTimeoutMS: 10000, // 10s to find a server
      socketTimeoutMS: 45000, // 45s socket timeout for long-running ops
      connectTimeoutMS: 10000, // 10s to establish TCP connection
      waitQueueTimeoutMS: 10000, // 10s to wait for available connection in pool

      // ===== RETRY & RELIABILITY =====
      retryWrites: true, // Automatic retry on transient errors
      w: "majority", // Write concern for data consistency
      family: 4, // IPv4 only (more stable in containerized envs)

      // ===== SERVERLESS OPTIMIZATION =====
      // Prevent connection refresh storms in serverless
      heartbeatFrequencyMS: 30000, // Check server health every 30s
    })
    .then((m) => {
      isConnecting = false;
      console.log("✅ MongoDB Connected – Connection Pool Active");
      return m;
    })
    .catch((err) => {
      isConnecting = false;
      connectionPromise = null;
      console.error("❌ MongoDB Connection Failed:", err.message);
      throw err;
    });

  return connectionPromise;
};

export default connectDB;