import { API_BASE_URL } from "./base-URL.js";
//variables
const registerUserUrl = API_BASE_URL + "social/auth/register";
const registerButton = document.querySelector("#register");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const errorContainer = document.querySelector("#error-container");
const errorUl = document.querySelector("#error-ul");
let userInput = {};

// -----------------registrers user eventlistener
registerButton.addEventListener("click", () => {
  if (
    nameInput.value.trim().length < 20 &&
    emailInput.value.includes("@noroff.no") &&
    passwordInput.value.trim().length >= 8
  ) {
    createUserInput();
    console.log(userInput);
    registerUser();
  } else {
    errorContainer.innerHTML = `Something went wrong. Please try again or contatct us`;
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
      location.assign("feed.html");
    } else {
      const errorArray = json.errors;
      errorArray.forEach((errormessage) => {
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

//validate input in registration fields
document.addEventListener("keyup", validateUserInput);

function validateUserInput() {
  errorUl.innerHTML = "";
  errorContainer.innerHTML = "";
  if (passwordInput.value.trim().length < 8) {
    errorUl.innerHTML += `<li>Password must be at least 8 characters</li>`;
  }
  if (!emailInput.value.includes("@noroff.no")) {
    errorUl.innerHTML += `<li>Only noroff.no emails are allowed to register</li>`;
  }
  if (nameInput.value.trim().length > 20) {
    errorUl.innerHTML += `<li>Name cannot be greater than 20 characters</li>`;
  }
  if (
    nameInput.value.trim().length < 20 &&
    emailInput.value.includes("@noroff.no") &&
    passwordInput.value.trim().length >= 8
  ) {
    errorContainer.innerHTML = `Looks good!`;
  }
}
//-----------------------------------------------
/*//function print onLoad
const url = new URL(document.location);
const printPage = () => {
  if (url.searchParamsurl.get("print") === true) {
    document.printPage();
  }
};
document.addEventListener("afterPrint", () => {
  location.assign("url til nasjonale ops");
}); */
