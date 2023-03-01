import { API_BASE_URL } from "./base-URL.js";
//variables
const registerUserUrl = API_BASE_URL + "social/auth/register";
const registerButton = document.querySelector("#register");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");

let userInput = {};

registerButton.addEventListener("click", async (registerUserUrl, userData) => {
  try {
    userInput = {
      name: nameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
    };
    console.log(userInput);
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };
    const response = fetch(url);
  } catch (error) {}
});
