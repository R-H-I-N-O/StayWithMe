import { useFormContext } from "react-hook-form";

const GuestSection = () => {
    const { register, formState: { errors } } = useFormContext();
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold mb-3">Guests</h1>
            <div className="grid grid-cols-2 p-6 gap-5 bg-gray-300">
                <label className="text-grey-700 text-sm font-bold">
                    Adults
                    <input type="number" className="border rounded w-full py-2 px-3 font-normal" min={1}
                        {...register("adultCount", { required: "This field is required" })} />
                    {errors.adultCount && (
                        <span className="text-red-500 font-bold">{errors.adultCount.message}</span>
                    )}
                </label>
                <label className="text-grey-700 text-sm font-bold flex-1">
                    Children
                    <input type="number" className="border rounded w-full py-2 px-3 font-normal" min={0}
                        {...register("childCount", { required: "This field is required" })} />
                    {errors.childCount && (
                        <span className="text-red-500 font-bold">{errors.childCount.message}</span>
                    )}
                </label>
            </div>
        </div>
    );
}

export default GuestSection;