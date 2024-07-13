import { createContext, useContext, useState } from "react";
import Toast from "../components/Toast";
import { useQuery } from 'react-query'
import * as apiClient from "../api-client"

const AppContext = createContext();

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
            isLoggedIn: !isError
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