import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query"
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Navigate, useLocation } from "react-router-dom";
import { useState } from "react";

const SignIn = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();
    const { showToast } = useAppContext();
    const queryClient = useQueryClient();
    const location = useLocation();
    const [redirect, setRedirect] = useState(false);
    const mutation = useMutation(apiClient.signIn, {
        onSuccess: async () => {
            showToast({ type: "SUCCESS", message: "Logged in successfully" });
            await queryClient.invalidateQueries("validateToken");
            setRedirect(true); 
        },
        onError: (error) => {
            showToast({ type: "ERROR", message: error.message });
        }
    });

    if (redirect) {
        return <Navigate to={location.state?.from?.pathname || "/"} replace />;
    }

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    })

    return (
<div className="flex justify-center items-center">
    <form 
        className="flex flex-col gap-5 w-full max-w-sm p-8 bg-[#faf9f9] rounded-lg shadow-lg "
        onSubmit={onSubmit}
    >
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        
        {/* Username Input */}
        <label className="relative">
            <span className="text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2">
                <i className="fas fa-user"></i>
            </span>
            <input 
                type="email" 
                className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your username"
                {...register("email", { required: "This field is required" })}
            />
            {errors.email && (
                <span className="text-red-500 text-sm">{errors.email.message}</span>
            )}
        </label>

        {/* Password Input */}
        <label className="relative">
            <span className="text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2">
                <i className="fas fa-lock"></i>
            </span>
            <input 
                type="password" 
                className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your password"
                {...register("password", { required: "This field is required" })}
            />
            {errors.password && (
                <span className="text-red-500 text-sm">{errors.password.message}</span>
            )}
        </label>

        {/* Login Button */}
        <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 rounded-lg font-bold hover:opacity-90"
        >
            LOGIN
        </button>
        {/* Sign Up */}
        <div className="text-center mt-4 text-sm text-gray-500">
            Or Sign Up Using <a href="/registration" className="text-blue-500 hover:underline">Sign Up</a>
        </div>
    </form>
</div>

    );
}

export default SignIn;