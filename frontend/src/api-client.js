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
        console.error("Error in registering user", error);
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
        console.error("Error in sign in", error);
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
        const response = await fetch(`${API_BASE_URL}/api/users/logout`, {
            credentials: "include",
            method: "POST"
        });
        if (!response.ok) {
            throw new Error("Error in signing out");
        }
    } catch (error) {
        console.error("Error in logging out", error);
        throw error;
    }
}

const addMyHotel = async (hotelFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/users/add-hotel`, {
        method: "POST",
        credentials: "include",
        body: hotelFormData,
    });

    if (!response.ok) {
        throw new Error("Error in adding hotel");
    }

    return response.json();
}

const fetchMyHotels = async () => {
    const response = await fetch(`${API_BASE_URL}/api/users/my-hotels`, {
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error("Error in fetching hotels");
    }
    return response.json();
}

const fetchMyHotelById = async (hotelId) => {
    const response = await fetch(`${API_BASE_URL}/api/users/my-hotels/${hotelId}`, {
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error("Error in fetching hotel details");
    }
    return response.json();
}

const UpdateMyHotelById = async (hotelFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/users/my-hotels/${hotelFormData.get("hotelId")}`, {
        method: "PUT",
        credentials: "include",
        body: hotelFormData,
    });

    if (!response.ok) {
        throw new Error("Error in editing hotel details");
    }

    return response.json();
}

const searchHotels = async (searchParams) => {
    const queryParams = new URLSearchParams();

    queryParams.append("destination", searchParams.destination || "");
    queryParams.append("checkIn", searchParams.checkIn || "");
    queryParams.append("checkOut", searchParams.checkOut || "");
    queryParams.append("adultCount", searchParams.adultCount || "");
    queryParams.append("childCount", searchParams.childCount || "");
    queryParams.append("page", searchParams.page || "");

    queryParams.append("maxPrice", searchParams.maxPrice || "");
    queryParams.append("sortOption", searchParams.sortOption || "");

    searchParams.facilities?.forEach((facility) => {
        queryParams.append("facilities", facility);
    });
    searchParams.types?.forEach((type) => {
        queryParams.append("types", type);
    });
    searchParams.stars?.forEach((star) => {
        queryParams.append("stars", star);
    });

    const response = await fetch(`${API_BASE_URL}/api/hotels/search?${queryParams}`);

    if (!response.ok) {
        throw new Error("Error in fetching hotels");
    }

    return response.json();
}

const fetchHotelbyId = async (hotelId) => {
    const response = await fetch(`${API_BASE_URL}/api/hotels/search/${hotelId}`);

    if (!response.ok) {
        throw new Error("Error in fetching hotel data");
    }

    return response.json();
}

export {
    register, validateToken, signIn, signOut, addMyHotel, fetchMyHotels,
    fetchMyHotelById, UpdateMyHotelById, searchHotels, fetchHotelbyId
};