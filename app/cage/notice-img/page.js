import { auth } from "@/lib/auth"; // your NextAuth config
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/mongoose";
import Image from "next/image";
import AddAnnouncementForm from "../components/AddNotice";
import AddImageForm from "../components/ImgForm";
import AddCouponCode from "../components/AddCoupon";
import Coupon from "@/models/Coupon";
import Img from "@/models/Img";
import Announcement from "@/models/Announcement";
import DeleteButton from "../components/ManageDelete";

export default async function FeaturePage() {
  const session = await auth();
  if (session?.user.role !== "admin") {
    redirect("/not-found");
  }
  let coupons = [];
  let images = [];
  let announcements = [];
  try {
    await connectDB();
    const couponsDb = await Coupon.find().sort({ _id: 1 }).lean();
    const imagesDb = await Img.find().sort({ _id: 1 }).lean();
    const announcementsDb = await Announcement.find().sort({ _id: 1 }).lean();

    // Convert _id to string
    coupons = couponsDb.map(coupon => ({
      ...coupon,
      _id: coupon._id.toString(),
      createdAt: coupon.createdAt?.toISOString().split("T")[0].split("-").reverse().join("-"),
      updatedAt: coupon.updatedAt?.toISOString(),
    }));
    images = imagesDb.map(image => ({
      ...image,
      _id: image._id.toString(),
      createdAt: image.createdAt?.toISOString().split("T")[0].split("-").reverse().join("-"),
      updatedAt: image.updatedAt?.toISOString(),
    }));
    announcements = announcementsDb.map(announcement => ({
      ...announcement,
      _id: announcement._id.toString(),
      createdAt: announcement.createdAt?.toISOString().split("T")[0].split("-").reverse().join("-"),
      updatedAt: announcement.updatedAt?.toISOString(),
    }));
  } catch (error) {
    console.log(error);
  }

  return (
    <main>
      <h1 className="text-3xl font-bold my-8 text-center">Manage notice | Images | Coupon-Code</h1>
      <section className="grid grid-cols-1 md:grid-cols-2 items-center justify-items-center gap-4">
        <div>
          {announcements.length > 0 ? (
            announcements.map((announcements) => (
              <span className="bg-emerald-800 px-4 py-2 rounded flex items-center justify-center gap-4 my-2" key={announcements._id}>
                <p>
                  {announcements.title} — {announcements.createdAt}
                </p>
                <DeleteButton id={announcements._id} type="announcement" />
              </span>
            ))
          ) : (
            <p>No announcements found.</p>
          )}
        </div>
        <AddAnnouncementForm />
      </section>
      <h2 className="text-3xl font-bold m-4 text-center">Add images</h2>
      <section className="grid grid-cols-1 md:grid-cols-2 items-center justify-items-center gap-4">
        <AddImageForm />
        <div>
          {images.length > 0 ? (
            images.map((image) => (
              <span className="bg-emerald-800 px-4 py-2 rounded flex items-center justify-center gap-4 my-2" key={image._id}>
                <div>
                  <Image
                    src={image.link}
                    alt={`${image.type} - image`}
                    width={50}
                    height={50}
                    className="rounded"
                  />
                  <p className="text-sm text-gray-300">{image.type}</p>
                </div>
                <p>
                  {image.link}
                </p>
                <DeleteButton id={image._id} type="image" />
              </span>
            ))
          ) : (
            <p>No images found.</p>
          )}
        </div>
      </section>
      <h2 className="text-3xl font-bold m-4 text-center">Add coupon code</h2>
      <section className="grid grid-cols-1 md:grid-cols-2 items-center justify-items-center gap-4">
        <div>
          {coupons.length > 0 ? (
            coupons.map((coupon) => (
              <span className="bg-emerald-800 px-4 py-2 rounded flex items-center justify-center gap-4 my-2" key={coupon._id}>
                <p>
                  {coupon.coupon} — {coupon.discount} — {coupon.createdAt}
                </p>
                <DeleteButton id={coupon._id} type="coupon" />
              </span>
            ))
          ) : (
            <p>No coupons found.</p>
          )}
        </div>
        <AddCouponCode />
      </section>
    </main>
  );
}
