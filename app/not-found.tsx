import Navbar from "../components/navbar"
import { Footer } from "../components/footer"
import Link from "next/link"


function notfound() {
  return (
    <div className='min-h-screen'>
    <Navbar/>
    <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8 ml-8 mt-8">
    <Link href="/cart" className="hover:text-primary">Home</Link>
        <span>/</span>
        <span className="text-primary">404 Error</span> 
    </nav>
    <div className="mt-48 mb-48 flex flex-col justify-center items-center">
    <h1 className="text-7xl mb-8">404 Not Found</h1>
    <p className="mb-4">Your visited page not found. You may go to the home page.</p>
    <button className="bg-red-500 text-white w-72 h-12 flex justify-center items-center mt-14">
        Back to Home Page
    </button>
</div>

    <Footer/>
    </div>
  )
}

export default notfound