import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../config/hotelTypes";

const TypesSection = () => {
    const { register, watch, formState: { errors } } = useFormContext();
    const typeWatch = watch("type");
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold mb-3">Types</h1>
            <div className="grid grid-cols-5 gap-2">
                {hotelTypes.map((type, index) => (
                    <label key={index} className={
                        typeWatch === type ? "cursor-pointer bg-blue-300 text-sm rounded-full px-4 py-2 font-semi-bold"
                            : "cursor-pointer bg-gray-300 text-sm rounded-full px-4 py-2 font-semi-bold"
                    }>
                        <input type="radio" value={type} className="hidden"
                            {...register("type", { required: "Select a type" })} >
                        </input>
                        <span>{type}</span>
                    </label>
                ))
                }
            </div>
            {errors.type && (
                <span className="text-red-500 text-sm font-bold">{errors.type.message}</span>
            )}
        </div>
    );
}

export default TypesSection;