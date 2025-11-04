import axios from "axios";

export const API_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const registerUser = async (data) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/register`,
      {
        name: data.name,
        email: data.email,
        password: data.password,
        gender: data.gender.toUpperCase(),
        designation: data.designation,
        registrationNo: data.registrationNo,
        phoneNumber: data.phoneNumber,
        semester: data.semester,
        department: data.department,
        userRole: data.type, // STUDENT or STAFF
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return response.message;
  } catch (error) {
    console.error("Error registering user:", error.message);
  }
};

export const loginUser = async (userEmail, userPassword) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/login`,
      {
        email: userEmail,
        password: userPassword,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", response.data.user);
    return response.data.user;
  } catch (error) {
    console.error("Error registering user: ", error.message);
  }
};

export const verifyOtp = async (userOtp) => {
  try {
    const response = await fetch(`${API_URL}/auth/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: { otp: userOtp },
    });

    localStorage.setItem("token", response.data.token);
    return response.data.user;
  } catch (error) {
    console.error("Error registering user: ", error.message);
  }
};

export const logoutUser = async () => {
  try {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      body: {},
      headers: {
        "Content-Type": "application/json",
        Authorization: `brearer ${localStorage.getItem("token")}`,
      },
    });
    localStorage.removeItem("token");
    return response.data.message;
  } catch (error) {
    console.error("Error registering user: ", error.message);
  }
};
