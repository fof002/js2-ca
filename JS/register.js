import { API_BASE_URL } from "./base-URL.js";
//variables
const registerUserUrl = API_BASE_URL + "social/auth/register";
const registerButton = document.querySelector("#register");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const errorContainer = document.querySelector("#error-container");
let userInput = {};

// -----------------registrers user
registerButton.addEventListener("click", async () => {
  createUserInput();
  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInput),
    };
    const response = await fetch(registerUserUrl, postData);
    const json = await response.json();
  } catch (error) {
    console.log(error);
  }
});

//function for creating userinput from input fields
const createUserInput = () => {
  !nameInput.value || !emailInput.value || !passwordInput.value
    ? (errorContainer.innerHTML = `Fill out all the fields`)
    : (userInput = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        password: passwordInput.value.trim(),
      });
};
//---------------------------------------
