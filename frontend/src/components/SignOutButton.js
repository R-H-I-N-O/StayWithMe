import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

const SignOutButton = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { showToast } = useAppContext();
    const mutation = useMutation(apiClient.signOut, {
        onSuccess: async () => {
            showToast({ type: "SUCCESS", message: " Logged out" });
            await queryClient.invalidateQueries("validateToken");
            navigate("/");
        },
        onError: (error) => {
            showToast({ type: "ERROR", message: error.message });
        }
    });
    const handleClick = (() => {
        mutation.mutate();
    });

    return (
        <button onClick={handleClick} className="text-blue-600 px-3 font-bold bg-white hover:gray-100">
            Sign Out
        </button>
    );
}
export default SignOutButton;