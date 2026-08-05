import api from "./axiosConfig";

export const loginUser = async (credentials) => {
    const response = await api.post("/auth/login", {
        email: String(credentials.email || "").trim(),
        password: String(credentials.password || ""),
    });

    return response.data;
};

export const registerUser = async (registerData) => {
    const response = await api.post(
        "/auth/register",
        registerData
    );

    return response.data;
};