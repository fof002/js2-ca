import { API_BASE_URL } from "./base-URL.js";

const logInUrl = API_BASE_URL + "auction/auth/login";
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const loginButton = document.querySelector("#login-button");
const errorContainer = document.querySelector("#error-container");
let loginInput = {};

//---------------- Login eventlistener for submit
loginButton.addEventListener("click", () => {
  createLoginInput();
  logInUser();
});

//----------------------------------------------

//------------------Function for API call for login

async function logInUser() {
  try {
    console.log(loginInput);
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginInput),
    };
    console.log(postData);
    const response = await fetch(logInUrl, postData);
    const json = await response.json();
    if (json.accessToken) {
      const accessToken = json.accessToken;
      localStorage.setItem("accessToken", accessToken);
      location.assign("feed.html");
    }
  } catch {
    console.log("sod off!");
  }
}

//------------------Creating login-input

const createLoginInput = () => {
  loginInput = {
    email: emailInput.value,
    password: passwordInput.value,
  };
};

//-----------------------------------
