import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: "donf2r46b",
  api_key: 641626183626483,
  api_secret: "HCkjz0O1TgztDxPF1Xa5IYcKQEU",
});



export default cloudinary;