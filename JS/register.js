import { API_BASE_URL } from "./base-URL.js";
//variables
const registerUserUrl = API_BASE_URL + "social/auth/register";
const registerButton = document.querySelector("#register");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const errorContainer = document.querySelector("#error-container");
let userInput = {};

// -----------------registrers user eventlistener
registerButton.addEventListener("click", () => {
  if (!nameInput.value || !emailInput.value || !passwordInput.value) {
    errorContainer.innerHTML = `Fill out all the fields`;
  } else {
    errorContainer.innerHTML = "";
    createUserInput();
    registerUser();
  }
});
//----------------------------------

//Function for registering user
async function registerUser() {
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
    console.log(json);
    if (json.id) {
      //checks if the server returns an object with an "ID" property, if it doesn't errormessages are shown.
      errorContainer.innerHTML = `<h3>User created!</h3>`;
    } else {
      const errorArray = json.errors;
      errorArray.forEach((errormessage) => {
        const errorUl = document.createElement("ul");
        errorContainer.appendChild(errorUl);
        errorUl.innerHTML += `<li>${errormessage.message}</li>`;
      });
    }
  } catch (error) {
    errorContainer.innerHTML = error;
  }
}

//function for creating userinput from input fields
const createUserInput = () => {
  userInput = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    password: passwordInput.value.trim(),
  };
};
//---------------------------------------
