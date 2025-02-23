const username = document.getElementById("username");
const password = document.getElementById("password");
const loginForm = document.getElementById("loginForm");
const email = document.getElementById("email");
const unregistredUser = document.getElementById("unregistredUser");
const incorrectPassword = document.getElementById("incorrectPassword");


loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //convert input values to string
  const emailInput = email.value;
  const passwordInput = password.value;
  //const loginuser=username.value;
  //storing email in a session 
  sessionStorage.setItem('email',emailInput)
  //sessionStorage.setItem('CurrentUser',loginuser)
  const emailSession=sessionStorage.getItem('email')
  console.log("email session saved :" + emailSession)
  //returns JavaScript object stored in local storage as JSON object matching emailInput key
  const informationObject = JSON.parse(localStorage.getItem(emailInput));

  if (!informationObject) {
    unregistredUser.style.display = "block";
  } else {
    if (informationObject.email == emailInput &&informationObject.password == passwordInput) {
      console.log("this user exists");
        window.location.href = "../pages/chat.html";
    } else if (
      informationObject.email == emailInput ||
      !informationObject.password == passwordInput
    ) {
      console.log("your password or email is in correct ");
      incorrectPassword.style.display = "block";
      password.value=""
    }
  }
});
