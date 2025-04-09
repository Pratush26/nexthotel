import Link from "next/link";

export default function Contact() {
  return (
    <main >
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-center text-white mb-12">Contact Us</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="bg-emerald-800/30 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
              <h2 className="text-2xl font-semibold text-white mb-6">Get in Touch</h2>
              <ul className="space-y-6">
                <li className="flex items-center gap-4 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  <Link href="tel:01717171717" className="hover:text-emerald-300 transition-colors">01717171717</Link>
                </li>
                <li className="flex items-center gap-4 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  <Link href="mailto:bananibash@gmail.com" className="hover:text-emerald-300 transition-colors">bananibash@gmail.com</Link>
                </li>
                <li className="flex items-center gap-4 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                  <Link href="https://www.facebook.com/profile.php?id=10008800000000000" target="_blank" className="hover:text-emerald-300 transition-colors">www.facebook/bananibash</Link>
                </li>
                <li className="flex items-center gap-4 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <Link href="https://maps.app.goo.gl/7KFxpVYMHNQngJFfA" target="_blank" className="hover:text-emerald-300 transition-colors">123, Main Street, Anytown, USA</Link>
                </li>
              </ul>
            </div>

            {/* Feedback Form */}
            <div className="bg-emerald-800/30 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
              <h2 className="text-2xl font-semibold text-white mb-6">Share Your Feedback</h2>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 rounded-lg bg-emerald-900/50 border border-emerald-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="rating" className="block text-sm font-medium text-white mb-1">Rating</label>
                  <select
                    id="rating"
                    className="w-full px-4 py-2 rounded-lg bg-emerald-900/50 border border-emerald-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">Select your rating</option>
                    <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
                    <option value="4">⭐⭐⭐⭐ Very Good</option>
                    <option value="3">⭐⭐⭐ Good</option>
                    <option value="2">⭐⭐ Fair</option>
                    <option value="1">⭐ Poor</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="feedback" className="block text-sm font-medium text-white mb-1">Your Feedback</label>
                  <textarea
                    id="feedback"
                    rows="4"
                    className="w-full px-4 py-2 rounded-lg bg-emerald-900/50 border border-emerald-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Share your experience with us..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Submit Feedback
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
