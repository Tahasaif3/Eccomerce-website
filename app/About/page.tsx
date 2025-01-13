import Navbar from "../../components/navbar"
import { Footer } from "../../components/footer"
import { Twitter, Instagram, Linkedin, Store, DollarSign, Users, BarChart3, Truck, HeadphonesIcon, ShieldCheck } from 'lucide-react'
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <a href="/" className="hover:text-gray-700">Home</a>
            <span>/</span>
            <span>About</span>
          </div>
        </div>

        {/* Our Story Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl font-bold">Our Story</h1>
              <div className="space-y-4 text-gray-600 text-xl">
                <p>
                  Launched in 2015, Exclusive is South Asia`s premier online shopping marketplace with an active presence in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sellers and 300 brands and serves 3 millioons customers across the region.
                </p>
                <p>
                  Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assortment in categories
                  ranging from consumer.

                </p>
              </div>
            </div>
            <div className="relative h-[600px] bg-[#EB7EA8]">
              <Image
                src="/about.png?height=600&width=700"
                alt="About image"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="container mx-auto px-4 py-12 mt-8 ">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              icon={<Store size={24} />}
              number="10.5k"
              label="Sellers active our site"

            />
            <StatsCard
              icon={<DollarSign size={24} />}
              number="33k"
              label="Monthly Produduct Sale"
              highlighted
            />
            <StatsCard
              icon={<Users size={24} />}
              number="45.5k"
              label="Customer active in our site"
            />
            <StatsCard
              icon={<BarChart3 size={24} />}
              number="25k"
              label="Anual gross sale in our site"
            />
          </div>
        </section>

        {/* Team Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TeamCard
              image="/t1.png?height=400&width=300"
              name="Tom Cruise"
              role="Founder & Chairman"
            />
            <TeamCard
              image="/t2.png?height=400&width=300"
              name="Emma Watson"
              role="Managing Director"
            />
            <TeamCard
              image="/t3.png?height=400&width=300"
              name="Will Smith"
              role="Product Designer"
            />
          </div>
          <div className="flex justify-center items-center mt-14">
            <Image
              src="/dots.png"
              alt="dots"
              width={50}
              height={50}
              className="text-3xl"
            />
          </div>
        </section>

        {/* Services Section */}
        <section className="container mx-auto px-4 py-12 mt-8 mb-14">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              icon={<Truck size={24} />}
              title="FREE AND FAST DELIVERY"
              description="Free delivery for all orders over $140"
            />
            <ServiceCard
              icon={<HeadphonesIcon size={24} />}
              title="24/7 CUSTOMER SERVICE"
              description="Friendly 24/7 customer support"
            />
            <ServiceCard
              icon={<ShieldCheck size={24} />}
              title="MONEY BACK GUARANTEE"
              description="We return money within 30 days"
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

interface StatsCardProps {
  icon: React.ReactNode;
  number: string;
  label: string;
  highlighted?: boolean;
}

function StatsCard({ icon, number, label, highlighted = false, }: StatsCardProps) {
  return (
    <div className={`p-8 rounded-md text-center ${highlighted ? 'bg-[#DB4444]' : 'bg-white border'}`}>
      <div className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center ${highlighted ? 'bg-white' : 'bg-black'}`}>
        <div className={highlighted ? 'text-[#DB4444]' : 'text-white'}>
          {icon}
        </div>
      </div>
      <div className={`text-2xl font-bold mb-2 ${highlighted ? 'text-white' : 'text-black'}`}>{number}</div>
      <div className={`text-sm ${highlighted ? 'text-white' : 'text-gray-600'}`}>{label}</div>
    </div>
  )
}

interface TeamCardProps {
  image: string;
  name: string;
  role: string;
}

function TeamCard({ image, name, role }: TeamCardProps) {
  return (
    <div className="text-center">
      <div className="mb-4 relative h-[400px]">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover rounded-md"
        />
      </div>
      <h3 className="text-xl font-semibold mb-1">{name}</h3>
      <p className="text-gray-600 mb-4">{role}</p>
      <div className="flex justify-center gap-4">
        <a href="#" className="text-gray-600 hover:text-[#DB4444]">
          <Twitter className="w-5 h-5" />
        </a>
        <a href="#" className="text-gray-600 hover:text-[#DB4444]">
          <Instagram className="w-5 h-5" />
        </a>
        <a href="#" className="text-gray-600 hover:text-[#DB4444]">
          <Linkedin className="w-5 h-5" />
        </a>
      </div>
    </div>
  )
}

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-black flex items-center justify-center">
        <div className="text-white">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

