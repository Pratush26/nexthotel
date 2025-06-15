// models/Img.js
import mongoose from "mongoose";

const ImgSchema = new mongoose.Schema({
  link: {type: String, required: true},
  type: {type: String, default: "caresual"},
}, { timestamps: true });

export default mongoose.models.Img || mongoose.model("Img", ImgSchema);
