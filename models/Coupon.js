// models/Coupon.js
import mongoose from "mongoose";

const CouponSchema = new mongoose.Schema({
  coupon: String,
  discount: String,
}, { timestamps: true });

export default mongoose.models.Coupon || mongoose.model("Coupon", CouponSchema);
