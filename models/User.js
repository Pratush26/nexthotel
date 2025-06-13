// models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: {type: String, required: true},
    phone: { type: Number, required: true },
    nid: { type: Number, required: true},
    role: { type: String, default:"employee"}
}, { timestamps: true });


export default mongoose.models.User || mongoose.model("User", UserSchema);
