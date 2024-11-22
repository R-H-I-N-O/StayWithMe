const HomeFooter = ()=>{
    return(
        <div className="px-12 py-8">
            <div className="flex justify-between items-center">
                <span className="text-3xl text-black font-bold tracking-tight">
                    StayWithMe.com
                </span>
                <span className="text-black font-bold tracking-tight flex gap-4">
                    <p className="cursor-pointer">Privacy Policy</p>
                    <p className="cursor-pointer">Terms of Service</p>
                </span>
            </div>
        </div>
    );
}

export default HomeFooter;