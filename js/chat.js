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

    const sendBtn= document.getElementById('sendBtn');
    const chatContainer=document.getElementById('chatContainer');
    const messageInput=document.getElementById('messageInput');
    const textSent=document.getElementById('textSent');

sendBtn.addEventListener('click',(e)=>{
  e.preventDefault();

  const messageValue=messageInput.value;
  console.log("Message saved to localSorage:",messageValue + "By this email address"+emailAddress)
  const dateTime=new Date().toString();
  let messages={
    email: emailAddress,
    username: domUsername,
    message: messageInput.value,
    date_time: dateTime,
    status:"sent"
  }
  const messagesJson= JSON.stringify(messages);
  localStorage.setItem("messages",messagesJson);
  const stringmesageObj=localStorage.getItem("messages");
  console.log(stringmesageObj);
  textSent.textContent=stringmesageObj.message
})
};