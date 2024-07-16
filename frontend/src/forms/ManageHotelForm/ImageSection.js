import { useFormContext } from "react-hook-form";

const ImageSection = () => {
    const { register, formState: { errors }, watch, setValue } = useFormContext();
    const existingImageUrls = watch("imageUrls");

    const handleDelete = (event, imageUrl)=>{
        event.preventDefault();
        setValue("imageUrls", existingImageUrls.filter((url)=> url !== imageUrl));
    }
    return (
        <div>
            <h1 className="text-2xl font-bold mb-3">Images</h1>
            <div className="border rounded p-4 flex flex-col gap-4">
                {existingImageUrls &&
                    <div className="grid grid-cols-6 gap-4">
                        {existingImageUrls.map((url, index) => (
                            <div key={index} className="relative group">
                                <img src={url} alt={`view ${index}`} className="min-h-full object-cover" />
                                <button onClick={(event)=>handleDelete(event, url)}
                                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white">
                                    Delete</button>
                            </div>
                        ))}
                    </div>}
                <label className="text-grey-700 text-sm font-bold">
                    Choose Images
                    <input type="file" multiple accept="image/*" min={1}
                        className="w-full text-gray-700 font-normal"
                        {...register("imageFiles", {
                            validate: (imageFiles) => {
                                const totalLength = imageFiles.length + (existingImageUrls?.length || 0);
                                if (totalLength === 0) {
                                    return "atleast one image required";
                                }
                                if (totalLength > 6) {
                                    return "total number of images cannot be more than 6";
                                }
                            }
                        })} />

                </label>
            </div>
            {errors.imageFiles && (
                <span className="text-red-500 font-bold">{errors.imageFiles.message}</span>
            )}
        </div>
    );
}

export default ImageSection;