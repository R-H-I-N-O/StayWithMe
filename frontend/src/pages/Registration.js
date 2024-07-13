import { useForm } from "react-hook-form"
import { useMutation } from "react-query"
import * as apiClient from "../api-client"
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query"

const Registration = () => {
    const queryClient = useQueryClient();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { showToast } = useAppContext();
    const navigate = useNavigate();


    const mutation = useMutation(apiClient.register, {
        onSuccess: async () => {
            showToast({ type: "SUCCESS", message: "Registration successful" });
            await queryClient.invalidateQueries("validateToken");
            navigate('../');
        },
        onError: (error) => {
            showToast({ type: "ERROR", message: error.message });
        }
    });

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    })

    return (
        <form className="flex flex-col gap-5 container" onSubmit={onSubmit}>
            <h2 className="text-3xl font-bold">Create an account</h2>
            <div className="flex flex-col md:flex-row gap-5">
                <label className="text-grey-700 text-sm font-bold flex-1">
                    First Name
                    <input className="border rounded w-full py-1 px-2 font-normal"
                        {...register("firstName", { required: "This field is required" })} />
                    {errors.firstName && (
                        <span className="text-red-500">{errors.firstName.message}</span>
                    )}
                </label>
                <label className="text-grey-700 text-sm font-bold flex-1">
                    Last Name
                    <input className="border rounded w-full py-1 px-2 font-normal"
                        {...register("lastName", { required: "This field is required" })} />
                    {errors.lastName && (
                        <span className="text-red-500">{errors.lastName.message}</span>
                    )}
                </label>
            </div>
            <label className="text-grey-700 text-sm font-bold flex-1">
                Email
                <input type="email" className="border rounded w-full py-1 px-2 font-normal"
                    {...register("email", { required: "This field is required" })} />
                {errors.email && (
                    <span className="text-red-500">{errors.email.message}</span>
                )}
            </label>
            <label className="text-grey-700 text-sm font-bold flex-1">
                Password
                <input type="password" className="border rounded w-full py-1 px-2 font-normal"
                    {...register("password", {
                        required: "This field is required",
                        minLength: { value: 6, message: "Password must be atleast 6 characters long" }
                    })} />
                {errors.password && (
                    <span className="text-red-500">{errors.password.message}</span>
                )}
            </label>
            <label className="text-grey-700 text-sm font-bold flex-1">
                Confirm Password
                <input type="password" className="border rounded w-full py-1 px-2 font-normal"
                    {...register("confirmPassword", {
                        required: "This field is required", validate: (val) => {
                            if (!val) {
                                return "This field is required";
                            } else if (watch("password") !== val) {
                                return "Password doesn't match";
                            }
                        }
                    })} />
                {errors.confirmPassword && (
                    <span className="text-red-500">{errors.confirmPassword.message}</span>
                )}
            </label>
            <span>
                <button type="submit" className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl">
                    Create Account
                </button>
            </span>
        </form>
    );
}

export default Registration;