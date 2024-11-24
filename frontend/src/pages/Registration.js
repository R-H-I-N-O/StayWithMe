import { useForm } from "react-hook-form"
import { useMutation } from "react-query"
import * as apiClient from "../api-client"
import { useAppContext } from "../contexts/AppContext";
import { useQueryClient } from "react-query"
import { Navigate } from "react-router-dom";
import { useState } from "react";

const Registration = () => {
    const queryClient = useQueryClient();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { showToast } = useAppContext();
    const [redirect, setRedirect] = useState(false);

    const mutation = useMutation(apiClient.register, {
        onSuccess: async () => {
            showToast({ type: "SUCCESS", message: "Registration successful" });
            await queryClient.invalidateQueries("validateToken");
            setRedirect(true);
        },
        onError: (error) => {
            showToast({ type: "ERROR", message: error.message });
        }
    });
    if (redirect) {
        return <Navigate to="/sign-in" replace />;
    }

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    });

    return (
        <div className="flex justify-center items-center">
            <form 
                className="flex flex-col gap-6 w-full max-w-md p-8 bg-[#faf9f9] rounded-lg shadow-lg"
                onSubmit={onSubmit}
            >
                <h2 className="text-2xl font-bold text-center text-gray-800">Create an Account</h2>
                
                {/* First and Last Name */}
                <div className="flex flex-col md:flex-row gap-4">
                    <label className="relative flex-1">
                        <input 
                            type="text"
                            className="w-full border border-gray-300 rounded-lg py-2 pl-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="First Name"
                            {...register("firstName", { required: "This field is required" })}
                        />
                        {errors.firstName && (
                            <span className="text-red-500 text-sm">{errors.firstName.message}</span>
                        )}
                    </label>
                    <label className="relative flex-1">
                        <input 
                            type="text"
                            className="w-full border border-gray-300 rounded-lg py-2 pl-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Last Name"
                            {...register("lastName", { required: "This field is required" })}
                        />
                        {errors.lastName && (
                            <span className="text-red-500 text-sm">{errors.lastName.message}</span>
                        )}
                    </label>
                </div>
        
                {/* Email */}
                <label className="relative">
                    <input 
                        type="email"
                        className="w-full border border-gray-300 rounded-lg py-2 pl-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Email Address"
                        {...register("email", { required: "This field is required" })}
                    />
                    {errors.email && (
                        <span className="text-red-500 text-sm">{errors.email.message}</span>
                    )}
                </label>
        
                {/* Password */}
                <label className="relative">
                    <input 
                        type="password"
                        className="w-full border border-gray-300 rounded-lg py-2 pl-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Password"
                        {...register("password", { 
                            required: "This field is required",
                            minLength: { value: 6, message: "Password must be at least 6 characters long" }
                        })}
                    />
                    {errors.password && (
                        <span className="text-red-500 text-sm">{errors.password.message}</span>
                    )}
                </label>
        
                {/* Confirm Password */}
                <label className="relative">
                    <input 
                        type="password"
                        className="w-full border border-gray-300 rounded-lg py-2 pl-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Confirm Password"
                        {...register("confirmPassword", { 
                            required: "This field is required",
                            validate: (val) => {
                                if (!val) {
                                    return "This field is required";
                                } else if (watch("password") !== val) {
                                    return "Passwords do not match";
                                }
                            }
                        })}
                    />
                    {errors.confirmPassword && (
                        <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>
                    )}
                </label>
        
                {/* Create Account Button */}
                <button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 rounded-lg font-bold hover:opacity-90"
                >
                    Create Account
                </button>
                <div className="text-center mt-4 text-sm text-gray-500">
                    Already have an account? <a href="/sign-in" className="text-blue-500 hover:underline">Sign In</a>
                </div>
            </form>
        </div>
    );
}

export default Registration;