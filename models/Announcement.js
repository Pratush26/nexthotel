// models/Announcement.js
import mongoose from "mongoose";

const AnnouncementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: [
    {
      text: { type: String, required: true },
      bold: { type: Boolean, default: false }
    }
  ]
}, { timestamps: true });

export default mongoose.models.Announcement || mongoose.model("Announcement", AnnouncementSchema);
