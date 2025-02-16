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


  // const textRecieved=document.getElementById('textRecieved');
  // //retriving value stored in local storage
  // textSent.localStorage.getItem("value")
  
  // sendBtn.addEventListener('submit',(e)=>{
    //   e.preventDefault();
    //   localStorage.setItem("value",chatContainer.value);
    //   textSent.textContent=localStorage.getItem("value")
    // })
    const sendBtn= document.getElementById('sendBtn');
    const chatContainer=document.getElementById('chatContainer');
    const messageInput=document.getElementById('messageInput');
    const textSent=document.getElementById('textSent');

sendBtn.addEventListener('click',(e)=>{
  e.preventDefault();
  const messageValue=messageInput.value;
  localStorage.setItem("message",messageValue)
  console.log("Message saved to localSorage:",messageValue)
  textSent.textContent=messageValue
})

};