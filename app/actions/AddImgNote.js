'use server'

import { connectDB } from "@/lib/mongoose"
import Img from '@/models/Img';
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

export async function createImg(data) {
  try {
    await connectDB();

    if (data.type === "main") {
      await Img.findOneAndUpdate(
        { type: "main" },
        { link: data.link },
        { upsert: true, new: true }
      );
      return { success: true, message: "Main image saved successfully." };
    }

    // For other types, check for duplicates before creating
    const existing = await Img.findOne({ link: data.link, type: data.type });
    if (existing) {
      return {
        success: false,
        message: `Image with the same link already exists in the '${data.type}' section.`,
      };
    }

    await Img.create(data);
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

//delete functions

export async function deleteItem(id, type) {
  const models = {
    coupon: Coupon,
    image: Img,
    announcement: Announcement,
  };

  const Model = models[type];
  if (!Model) throw new Error("Invalid model type");

  await connectDB();
  await Model.deleteOne({ _id: id });
}


