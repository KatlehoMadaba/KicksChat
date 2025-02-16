
document.getElementById("loginextBtn").addEventListener("click",()=>{
    window.location.href="./project-root/pages/login.html"
});
document.getElementById("signupBtn").addEventListener("click",()=>{
    window.location.href="./project-root/pages/sign-up.html"
});

window.onload = function() {
    sessionStorage.setItem("username", "john_doe");
    console.log("Session data set: username = john_doe");
};