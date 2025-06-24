import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
  name: String,
  image: String,
  type: String,
  price: Number,
  bookedDate: [Date], // Or Date, depending on your design
  description: String,
  icons: [String], // or you can skip this field if not needed
  offprice: Number,
}, { timestamps: true });

// Avoid model overwrite error in dev
export default mongoose.models.Room || mongoose.model("Room", RoomSchema);
