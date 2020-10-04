import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const connectn = await mongoose.connect(process.env.MONGO_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log(`MongoDB: Connected to ${connectn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error('Error connecting to MongoDB!'.red.underline.bold);
  }
};

export default connectDB;
