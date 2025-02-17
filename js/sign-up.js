const signupForm = document.getElementById("signupForm");
const email = document.getElementById("email");
const username = document.getElementById("username");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const error_messages = document.getElementById("error_messages");
const userExists = document.getElementById("userExists");

signupForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent form from auto submitting

  let errors = [];
  
  // Check if password and confirm password match
  if (password.value !== confirmPassword.value) {
    errors.push("Password does not match");
    password.value = "";
    confirmPassword.value = "";
  }

  if (errors.length > 0) {
    error_messages.innerHTML = errors.join("<br>");
    return; // Prevent form submission if there are errors
  }

  // Storing email in session storage
  const emailInput = email.value;
  sessionStorage.setItem('email', emailInput);
  const emailSession = sessionStorage.getItem('email');
  console.log('Sign up email session' + emailSession);

  // Get the contact list from local storage
  let contactList = JSON.parse(localStorage.getItem("contactList")) || [];

  // Check if the user already exists
  const existingUser = contactList.find(user => user.email === emailInput);

  if (existingUser) {
    // If user exists
    console.log("The user already exists");
    userExists.style.display = "block";
  } else {
    let informationObject = {
      email: emailInput,
      username: username.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    };

    // Add the new usert
    contactList.push(informationObject);
    
    localStorage.setItem("contactList", JSON.stringify(contactList));

    // Save new user
    const stringifyInformation = JSON.stringify(informationObject);
    localStorage.setItem(emailInput, stringifyInformation);

    console.log("User doesn't exist and is now stored");
    window.location.href = "../pages/chat.html";
  }
});