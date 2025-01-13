import  Navbar  from "../../components/navbar"
import { Footer } from "../../components/footer"
import { CiMail } from "react-icons/ci"
import { FaPhone } from "react-icons/fa6"

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-12">
          <a href="/" className="hover:text-gray-700">Home</a>
          <span>/</span>
          <span>Contact</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Column Contact Info */}
          <div className="space-y-12 mt-20 mb-20">
            {/* Call To Us Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#DB4444] flex items-center justify-center">
                  <FaPhone className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-medium">Call To Us</h2>
              </div>
              <div className="space-y-2">
                <p className="text-gray-600">We are available 24/7, 7 days a week.</p>
                <p className="text-gray-600">Phone: +8801611112222</p>
              </div>
            </div>
            <hr className="border-t-2 border-gray-300 my-4" />
            {/* Write To Us Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#DB4444] flex items-center justify-center">
                  <CiMail className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-medium">Write To Us</h2>
              </div>
              <div className="space-y-2">
                <p className="text-gray-600">Fill out our form and we will contact you within 24 hours.</p>
                <p className="text-gray-600">Email: customer@exclusive.com</p>
                <p className="text-gray-600">Email: support@exclusive.com</p>
              </div>
            </div>
          </div>

          {/* Right Column Contact Form */}
          <div>
            <form className="space-y-4 mt-20 mb-20">
              <div className="grid md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Your Name *"
                  className="w-full px-4 py-3 rounded bg-[#F5F5F5] text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#DB4444]"
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email *"
                  className="w-full px-4 py-3 rounded bg-[#F5F5F5] text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#DB4444]"
                  required
                />
                <input
                  type="tel"
                  placeholder="Your Phone *"
                  className="w-full px-4 py-3 rounded bg-[#F5F5F5] text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#DB4444]"
                  required
                />
              </div>
              <textarea
                placeholder="Your Message"
                rows={8}
                className="w-full px-4 py-3 rounded bg-[#F5F5F5] text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#DB4444]"
              />
              <button
                type="submit"
                className="px-12 py-4 bg-[#DB4444] text-white rounded hover:bg-[#DB4444]/90 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}



