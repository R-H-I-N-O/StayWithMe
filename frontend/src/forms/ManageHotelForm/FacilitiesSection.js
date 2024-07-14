import { useFormContext } from "react-hook-form";
import { hotelFacilities } from "../../config/hotelTypes";

const FacilitiesSection = () => {
    const { register, formState: {errors}} = useFormContext();
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold mb-3">Facilities</h1>
            <div className="grid grid-cols-5 gap-2">
                { hotelFacilities.map((facility, index)=>(
                    <label key={index} className="text-sm flex items-center gap-1 text-gray-700" >
                    <input type="checkbox" value={facility}
                        {...register("facilities", {
                            validate: (facilities)=>{
                                if(facilities && facilities.length > 0){
                                    return true;
                                }else{
                                    return "atleast one facility is required";  
                                }
                            }
                        })} >
                    </input>
                    {facility}
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

export default FacilitiesSection;