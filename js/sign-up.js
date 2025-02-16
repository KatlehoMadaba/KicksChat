const form = document.getElementById("form");
const email = document.getElementById("email");
const username = document.getElementById("username");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const error_messages = document.getElementById("error_messages");
const userExists = document.getElementById("userExists");
//Retrieving email for validation
const existingUser = email.value.toString();
const emailJson = JSON.parse(localStorage.getItem(existingUser));
form.addEventListener("submit", (e) => {
  e.preventDefault(); //Prevents form from auto submitting
  //Displays error for password that doesnt exists
  let errors = [];
  if (password.value !== confirmPassword.value) {
    e.preventDefault(); //Prevents form from auto submitting
    errors.push("Password word do not match");
  }
  if (errors.length > 0) {
    error_messages.innerHTML = errors.join("<br>");
  }
  //Validating if user exists
  if (!emailJson === null) {
    const emailValue = emailJson.email;
    if (existingUser === emailValue) {
      console.log("The user does exist");
      userExists.style.display = "block";
    }
  }
  //
  else {
    let informationObject = {
      email: email.value,
      username: username.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    };
   
    const stringifyInformation = JSON.stringify(informationObject);//converting the informationObject into a string
    localStorage.setItem(email.value, stringifyInformation);
    console.log("user doesnt exist and is now stored");
    console.log("This is email: " + email.value.toString());
    addEventListener("click", () => {
      window.location.href = "../pages/chat.html";
    });
  }
});
