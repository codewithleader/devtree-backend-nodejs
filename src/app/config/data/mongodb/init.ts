import mongoose from 'mongoose';
import colors from 'colors';

interface ConnectionOptions {
  mongoUrl: string;
  dbName: string;
}

export class MongoDatabase {
  private static isConnected = false;

  static async connect(options: ConnectionOptions): Promise<void> {
    const { mongoUrl, dbName } = options;

    if (this.isConnected) {
      console.log(colors.yellow.bold('MongoDB is already connected.'));
      return;
    }

    try {
      const { connection } = await mongoose.connect(mongoUrl, { dbName });
      this.isConnected = true;

      const url = `${connection.host}:${connection.port}`;
      console.log(colors.green.bold(`MongoDB connected: ${url}`));
    } catch (error: any) {
      console.error(
        colors.bgRed.white.bold(`MongoDB connection error: ${error.message}`)
      );
      process.exit(1); // Terminar el proceso si la conexión falla
    }
  }

  static async disconnect(): Promise<void> {
    if (!this.isConnected) {
      console.log(colors.yellow.bold('MongoDB is not connected.'));
      return;
    }

    try {
      await mongoose.disconnect();
      this.isConnected = false;
      console.log(colors.green.bold('MongoDB disconnected successfully.'));
    } catch (error: any) {
      console.error(
        colors.bgRed.white.bold(`MongoDB disconnection error: ${error.message}`)
      );
    }
  }
}
