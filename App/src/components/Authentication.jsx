import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Authentication = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (getToken() == null) {
      navigate("/login");
    } else {
      navigate("/create");
    }
  }, [navigate]);
};

export const registerUser = async (registerData) => {
  const response = await fetch("http://localhost:5194/api/account/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerData),
  });
};

export const loginUser = async (loginData) => {
  try {
    const response = await fetch("http://localhost:5194/api/account/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    const responseData = await response.text();

    return responseData;
  } catch (error) {
    console.log(error);
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};
