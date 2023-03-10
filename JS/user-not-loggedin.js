window.addEventListener("load", () => {
  if (!localStorage.getItem("accessToken")) {
    location.assign("login.html");
  }
});
