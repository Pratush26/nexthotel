'use server'

import { connectDB } from "@/lib/mongoose"
import Announcement from "@/models/Announcement"
import Coupon from "@/models/Coupon";

export async function addCoupon(data) {
  try {
    await connectDB();
    await Coupon.create({
      coupon: data.coupon,
      discount: data.discount, // ✅ include discount field
    });
  } catch (error) {
    console.error("Error creating coupon:", error);
    throw error;
  }
}
export async function createAnnouncement(data) {
  try {
    await connectDB()
    await Announcement.create(data)
  } catch (error) {
    console.error("Error creating announcement:", error)
  }
}

//delete functions

export async function deleteItem(id, type) {
  const models = {
    coupon: Coupon,
    announcement: Announcement,
  };

  const Model = models[type];
  if (!Model) throw new Error("Invalid model type");

  await connectDB();
  await Model.deleteOne({ _id: id });
}


