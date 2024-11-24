import mongoose from 'mongoose';

interface ConnectionOptions {
  mongoUrl: string;
  dbName: string;
}

export class MongoDatabase {
  static async connect(options: ConnectionOptions): Promise<void> {
    const { mongoUrl, dbName } = options;

    try {
      const { connection } = await mongoose.connect(mongoUrl, {
        dbName,
      });
      const url = `${connection.host}:${connection.port}`;
      console.log(`MongoDB connected: ${url}`);
    } catch (error) {
      console.log('MongoDB connection error:', error.message);
      process.exit(1);
    }
  }
}
