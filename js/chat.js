
window.onload = function() {
//retriving email address from session
  const emailAddress=sessionStorage.getItem('email')
  console.log(emailAddress)
  //retreving email address key properties using emailAddress
  const objectJSON=JSON.parse(localStorage.getItem(emailAddress))
  console.log(objectJSON.username);
  //retriving only the username from the object
  const domUsername=objectJSON.username
  //displaying username in
  const showUsername=document.getElementById('showUsername');
  showUsername.textContent=domUsername;
};