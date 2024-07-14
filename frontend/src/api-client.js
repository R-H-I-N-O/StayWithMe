const API_BASE_URL = process.env.REACT_APP_API_KEY || "";

const register = async (formData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/users/register`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        const responseBody = await response.json();

        if (!response.ok) {
            throw new Error(responseBody.message);
        }
        return responseBody;
    } catch (error) {
        console.error("Error in registering user",error);
        throw error;
    }
}

const signIn = async (formData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/users/login`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });
        const responseBody = await response.json();
        if (!response.ok) {
            throw new Error(responseBody.message);
        }
        return responseBody;
    } catch (error) {
        console.error("Error in sign in",error);
        throw error;
    }
}

const validateToken = async () => {

    try {
        const response = await fetch(`${API_BASE_URL}/api/users/validate`, {
            credentials: "include"
        });
        if (!response.ok) {
            throw new Error("Invalid token");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        if (error.name === 'TypeError') {
            console.error("Network error:", error);
            throw new Error("Network error or server is not responding");
        } else {
            console.error("Token validation error:", error);
            throw error;
        }
    }
}

const signOut = async () => {
    try {
        const respose = await fetch(`${API_BASE_URL}/api/users/logout`, {
            credentials: "include",
            method: "POST"
        });
        if (!respose.ok) {
            throw new Error("Error in signing out");
        }
    } catch (error) {
        console.error("Error in logging out",error);
        throw error;
    }
}

const addMyHotel = async (hotelFormData)=>{
    const respose = await fetch(`${API_BASE_URL}/api/users/add-hotel`, {
        method: "POST",
        credentials: "include",
        body: hotelFormData,
    });

    if (!respose.ok) {
        throw new Error("Error in adding hotel");
    }

    return respose.json();
}

export { register, validateToken, signIn, signOut, addMyHotel };