import { Phone, MapPin, Facebook, Mail } from "lucide-react";
import FeedbackForm from "@/components/FeedbackForm";

export default function Contact() {
  const data = [
    { title: "01717171717", href: "tel:01717171717", icon: Phone },
    { title: "meghlokh@gmail.com", href: "mailto:meghlokh@gmail.com", icon: Mail },
    { title: "www.facebook/meghlokh", href: "www.facebook/meghlokh", icon: Facebook },
    { title: "123, Main Street, Anytown, USA", href: "https://maps.app.goo.gl/7KFxpVYMHNQngJFfA", icon: MapPin },
  ];
  return (
    <main className="w-full lg:w-11/12 xl:w-3/4 mx-auto">
      <h1 className="text-5xl font-bold text-center text-white m-8">Contact Us</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-0 gap-8 justify-items-center items-center w-full">
        {/* Contact Information */}
        <div className="bg-emerald-800/30 p-10 rounded-2xl shadow-xl lg:w-5/6 md:w-2/3 w-11/12 h-full">
          <h2 className="text-2xl font-semibold text-white mb-6">Get in Touch</h2>
          <ul className="space-y-6">
            {data.map((item, index) => {
            const Icon = item.icon;
            return(
              <li key={index}>
                <a href={item.href} className="hover:text-emerald-300 transition-colors flex items-center gap-4 text-white" target="_blank">
                  <Icon className="w-6 h-6" />
                  {item.title}
                </a>
              </li>
            )})}
          </ul>
        </div>
        {/* Feedback Form */}
        <FeedbackForm />
      </div>
    </main>
  );
}
