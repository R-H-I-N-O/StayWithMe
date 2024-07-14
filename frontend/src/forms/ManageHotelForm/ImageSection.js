import { useFormContext } from "react-hook-form";

const ImageSection = () => {
    const { register, formState: { errors } } = useFormContext();
    return (
        <div>
            <h1 className="text-2xl font-bold mb-3">Images</h1>
            <div className="border rounded p-4 flex flex-col gap-4">
                <label className="text-grey-700 text-sm font-bold">
                    Choose Images
                    <input type="file" multiple accept="image/*" min={1}
                        className="w-full text-gray-700 font-normal"
                        {...register("imageFiles", {
                            validate: (imageFiles) => {
                                const totalLength = imageFiles.length;
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