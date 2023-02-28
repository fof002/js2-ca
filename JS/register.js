import { API_BASE_URL } from "./base-URL.js";
//variables
const registerUserUrl = API_BASE_URL + "social/auth/register";
const registerButton = document.querySelector("#register");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");

let userInput = {
  name: "empty_name",
  email: "empty_email",
  password: "empty_password",
};

async function registerUser(url, userData) {
  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };
    const response = fetch(url);
  } catch (error) {}
}
registerUser(registerUserUrl, userInput);
