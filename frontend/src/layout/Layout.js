import Footer from "../components/Footer";
import Header from "../components/Header"
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";


const Layout = (props) => {

    return (
        <div className="flex flex-col min-h-screen border-box">
            <Header />
            <Hero />
            <div className="container mx-auto">
                <SearchBar />
            </div>
            <div className="container mx-auto py-10 flex-1 ">{props.children}</div>
            <Footer />
        </div>
    )
}

export default Layout;