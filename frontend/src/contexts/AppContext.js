import { createContext, useContext, useState } from "react";
import Toast from "../components/Toast";
import { useQuery } from 'react-query'
import * as apiClient from "../api-client"
// import {loadStripe, Stripe} from "@stripe/stripe-js";

// const STRIPE_PUB_KEY = process.env.STRIPE_PUB_KEY;

const AppContext = createContext();

// const stripePromise = loadStripe(STRIPE_PUB_KEY);

const AppContextProvider = ({ children }) => {

    const [toast, setToast] = useState(undefined);
    const { isError } = useQuery("validateToken", apiClient.validateToken, {
        retry: false
    });

    return (
        <AppContext.Provider value={{
            showToast: (toastMessage) => {
                setToast(toastMessage);
            },
            isLoggedIn: !isError,
            // stripePromise
        }} >
            {toast && (<Toast message={toast.message} type={toast.type} onClose={() => setToast(undefined)} />)}
            {children}
        </AppContext.Provider>
    );
}

const useAppContext = () => {
    return useContext(AppContext);
}

export { useAppContext };
export default AppContextProvider;