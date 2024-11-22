import HomeFooter from "../components/HomeFooter";
import HomeHeader from "../components/HomeHeader";
import SearchBar from "../components/SearchBar";


const HomeLayout = (props) => {

    return (
        <div className="flex flex-col min-h-screen border-box">
            <HomeHeader />
            <div className="container mx-auto z-50">
                <SearchBar />
            </div>
            <div className="container mx-auto py-10 flex-1 ">{props.children}</div>
            <HomeFooter />
        </div>
    )
}

export default HomeLayout;