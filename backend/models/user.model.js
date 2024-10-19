import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String, default: "" },
  resetPasswordToken: { type: String },
  bannerImg: { type: String, default: "" },
  headline: { type: String, default: "Linkedin User" },
  location: { type: String, default: "Earth" },
  about: { type: String, default: "" },
  isFreezed: { type: Boolean, default: false },
  skills: [String],
  experience: [{
    title: String,
    company: String,
    startDate: Date,
    endDate: Date,
    description: String,
  }],
  education: [{
    school: String,
    fieldOfStudy: String,
    startYear: Number,
    endYear: Number,
  }],
  phoneNumber: { type: String, required: true }, // New field
gender: { 
  type: String, 
  enum: ["Male", "Female", "Other"], 
  required: true 
}, // New field with enum constraint
country: { type: String, required: true }, // New field

  connections: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;