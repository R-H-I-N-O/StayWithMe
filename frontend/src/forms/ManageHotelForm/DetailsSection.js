import { useFormContext } from "react-hook-form";

const DetailsSection = () => {
    const { register, formState: { errors } } = useFormContext();
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold mb-3">Add Hotel</h1>
            <label className="text-grey-700 text-sm font-bold flex-1">
                Name
                <input className="border rounded w-full py-1 px-2 font-normal"
                    {...register("name", { required: "This field is required" })} />
                {errors.name && (
                    <span className="text-red-500 font-bold">{errors.name.message}</span>
                )}
            </label>
            <div className="flex flex-col md:flex-row gap-5">
                <label className="text-grey-700 text-sm font-bold flex-1">
                    City
                    <input className="border rounded w-full py-1 px-2 font-normal"
                        {...register("city", { required: "This field is required" })} />
                    {errors.city && (
                        <span className="text-red-500 font-bold">{errors.city.message}</span>
                    )}
                </label>
                <label className="text-grey-700 text-sm font-bold flex-1">
                    Country
                    <input className="border rounded w-full py-1 px-2 font-normal"
                        {...register("country", { required: "This field is required" })} />
                    {errors.country && (
                        <span className="text-red-500 font-bold">{errors.country.message}</span>
                    )}
                </label>
            </div>
            <label className="text-grey-700 text-sm font-bold flex-1">
                Description
                <textarea rows={10} className="border rounded w-full py-1 px-2 font-normal"
                    {...register("hotelDescription", { required: "This field is required" })} />
                {errors.hotelDescription && (
                    <span className="text-red-500 font-bold">{errors.hotelDescription.message}</span>
                )}
            </label>
            <label className="text-grey-700 text-sm font-bold w-4/12">
                Price Per Night
                <input className="border rounded w-full py-1 px-2 font-normal" type="number" 
                min={1}
                    {...register("pricePerNight", { required: "This field is required" })} />
                {errors.pricePerNight && (
                    <span className="text-red-500 font-bold">{errors.pricePerNight.message}</span>
                )}
            </label>
            <label className="text-grey-700 text-sm font-bold w-4/12">
                Star Rating
                <select className="border rounded w-full py-1 px-2 font-normal"
                    {...register("starRating", { required: "Select a number between 1 and 5" })} >
                        <option value="" className="text-xm font-bold" defaultChecked>Select as rating</option>
                        {[1, 2, 3, 4, 5].map((num,index)=>(
                            <option key={index} value={num}>{num}</option>
                        ))}
                    </select>
                {errors.starRating && (
                    <span className="text-red-500 font-bold">{errors.starRating.message}</span>
                )}
            </label>
        </div>
    );
}

export default DetailsSection;