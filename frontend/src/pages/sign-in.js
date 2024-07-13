import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query"
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { showToast } = useAppContext();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const mutation = useMutation(apiClient.signIn, {
        onSuccess: async () => {
            showToast({ type: "SUCCESS", message: "Logged in successfully" });
            await queryClient.invalidateQueries("validateToken");
            navigate("/");
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
            <h2 className="text-3xl font-bold text-center">Sign In</h2>
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
                    })} />
                {errors.password && (
                    <span className="text-red-500">{errors.password.message}</span>
                )}
            </label>
            <span>
                <button type="submit" className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl">
                    Sign In
                </button>
            </span>
        </form>
    );
}

export default SignIn;