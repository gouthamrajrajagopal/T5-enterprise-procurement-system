import axiosClient from "./axiosClient";

export const loginUser = (loginData) => {
    return axiosClient.post("/auth/login", loginData);
};

export const registerUser = (registerData) => {
    return axiosClient.post("/auth/register", registerData);
};