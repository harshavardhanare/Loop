import mongoose from "mongoose";

export const connectDB = async () => {
	try {
		const conn = await mongoose.connect("mongodb+srv://sanjayketham2004:eHUeqz4cpunDlOvB@clone.aamrs.mongodb.net/?retryWrites=true&w=majority&appName=Clone");
		console.log(`MongoDB connected: ${conn.connection.host}`);
	} catch (error) {
		console.error(`Error connecting to MongoDB: ${error.message}`);
		process.exit(1);
	}
};
