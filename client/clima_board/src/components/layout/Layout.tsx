import { Outlet } from "react-router"
import Header from "../header/Header"
import Footer from "../footer/Footer"
import "./layout.css"


export default function Layout() {
    return (
        <div className="layoutClass">
            <Header />
            <main className="layoutMain">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}
