window.onload = function () {
  //retriving email address from session
  const emailAddress = sessionStorage.getItem("email");
  console.log(emailAddress);

  //retreving email address key properties using emailAddress
  const objectJSON = JSON.parse(localStorage.getItem(emailAddress));
  console.log(objectJSON.username);

  //retriving only the username from the object
  const domUsername = objectJSON.username;
  ////display current user
  const initialLetter = document.getElementById("initialLetter");
  initialLetter.textContent = domUsername;

  const sendBtn = document.getElementById("sendBtn");
  const messageInput = document.getElementById("messageInput");
  const textSent = document.getElementById("textSent");
  const chatContainer = document.getElementById("chatContainer");
  const messagesContainer = document.getElementById("textSent");
  const chatMessages = document.getElementById("chatMessages");
  const contactContainer = document.getElementById("contactContainer");
  const convoConvo=document.getElementById("showUsername");
  //retriving contact list
  let contactList = JSON.parse(localStorage.getItem("contactList")) || [];
  console.log(contactList);
  contactList.innerHTML = "";

  //displaying contacts
  contactList.forEach((contact) => {
    let ul = document.createElement("ul");
    let li = document.createElement("li");
    li.addEventListener('click',(e)=>{
      loadChat(contact.username);
    })
    let span = document.createElement("span");
    let span1 = document.createElement("span");
    li.classList.add("contactItem");
    span1.classList.add("iconContact");
    span.classList.add("contactName");
    span.textContent = contact.username;
    // span2.classList.add("contactTime");
    ul.appendChild(li);
    li.appendChild(span1);
    li.appendChild(span); //what ever is inside the bracket is the child of li
    contactContainer.appendChild(li);
  });

  //clicking on the user 
  function loadChat(username){
    document.addEventListener('click',(e)=>{
      convoConvo.textContent=username;
    })
  }

  //Sending a message
  sendBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const messageValue = messageInput.value;
    const dateTime = new Date().toString();
    console.log(
      "Message saved to localSorage:",
      messageValue + "By this email address" + emailAddress
    );
    let messages = {
      email: emailAddress,
      username: domUsername,
      message: messageInput.value,
      date_time: dateTime,
      status: "sent",
    };
    // //Json object to string
    //messages to local storage
    let storedMessages = JSON.parse(localStorage.getItem("messages")) || [];
    storedMessages.innerHTML = "";
    //displaying existing messages

    storedMessages.forEach((mes) => {
      let messageSent= document.createElement("div");
      messageSent.classList.add("messageSent");
      messageSent.textContent=mes.message
      chatMessages.appendChild(messageSent)
      const messageItem = document.getElementById("textSent");
      if (messageItem !== null) {
        messageItem.textContent = mes.message;
      }
    });
    storedMessages.push(messages);

    //saving the message to the array
    localStorage.setItem("messages", JSON.stringify(storedMessages));
    //getting last index of the arrray
    const recentMessages = storedMessages[storedMessages.length - 1];
    console.log("These are the recent messages" + recentMessages);
    //display message
    textSent.textContent = recentMessages.message;

    //clear text box after sending
    messageInput.value = "";

  });
};
