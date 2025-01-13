import Hero from "../components/hero"
import Navbar from "../components/navbar"
import Flashsales from "../components/flashsales"
import Categories from "../components/categories"
import SellingProducts from "../components/best-selling-products"
import MusicExperience from "../components/music-experience"
import NewArrival from "../components/new-arrival"
import Delivery from "../components/Delivery"
import { Footer } from "../components/footer"
import Exploreproducts from "../components/explore-products"

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Flashsales />
      <Categories />
      <SellingProducts />
      <MusicExperience />
      <Exploreproducts />
      <NewArrival />
      <Delivery />
      <Footer />
    </div>
  )
}

