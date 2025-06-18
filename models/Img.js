// models/Img.js
import mongoose from "mongoose";

const ImgSchema = new mongoose.Schema({
  link: {type: String, required: true, trim: true},
  type: {type: String, default: "carousel"},
}, { timestamps: true });

export default mongoose.models.Img || mongoose.model("Img", ImgSchema);
