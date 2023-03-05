import { API_BASE_URL } from "./base-URL.js";

const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const loginButton = document.querySelector("#login-button");
const errorContainer = document.querySelector("#error-container");

//---------------- Login eventlistener for submit
loginButton.addEventListener("click", loginUser);

//----------------------------------------------

//------------------Function for API call for login

//-----------------Validating login

document.addEventListener("keyup", validateLoginInput);

function validateLoginInput() {
  errorUl.innerHTML = "";
  errorContainer.innerHTML = "";
  if (passwordInput.value.trim().length < 8) {
    errorUl.innerHTML += `<li>Password must be at least 8 characters</li>`;
  }
  if (!emailInput.value.includes("@noroff.no")) {
    errorUl.innerHTML += `<li>Only noroff.no emails are allowed to register</li>`;
  }
}
//--------------------------------------

//------------------Creating login-input

const createLoginInput = () => {
  loginInput = {
    email: emailInput.value.trim(),
    password: passwordInput.value.trim(),
  };
};

//-----------------------------------
