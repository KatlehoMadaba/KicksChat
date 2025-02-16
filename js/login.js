const username = document.getElementById("username");
const password = document.getElementById("password");
const form = document.getElementById("form");
const email = document.getElementById("email");
const unregistredUser = document.getElementById("unregistredUser");
const incorrectPassword = document.getElementById("incorrectPassword");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  //convert email input value to string
  const emailInput = email.value;
  const passwordInput = password.value;
  //returns JavaScript object stored in local storage as JSON object matching emailInput key
  const informationObject = JSON.parse(localStorage.getItem(emailInput));

  if (!informationObject) {
    unregistredUser.style.display = "block";
  } else {
    if (
      informationObject.email == emailInput &&
      informationObject.password == passwordInput
    ) {
      console.log("this user exists");
      addEventListener("click", () => {
        window.location.href = "../pages/chat.html";
      });
    } else if (
      informationObject.email == emailInput ||
      !informationObject.password == passwordInput
    ) {
      console.log("your password or email is in correct ");
      incorrectPassword.style.display = "block";
    }
  }
});
