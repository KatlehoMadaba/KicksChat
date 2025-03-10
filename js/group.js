window.addEventListener("storage", (e) => {
    if (e.key == "messageUpdates") {
    loadGroupChat()
    }
  });
const sendBtn = document.getElementById("sendBtn");
const messageInput = document.getElementById("messageInput");
const chatMessagesContainer = document.getElementById("chatMessages");
const personalchatBtn = document.getElementById("btnChat");

//retriving current user
const emailAddress = sessionStorage.getItem("email");

const objectJSON = JSON.parse(localStorage.getItem(emailAddress));
console.log("This is the user name: " + objectJSON.username);
const currentUser = objectJSON.username;
//const currentUser =sessionStorage.getItem("CurrentUser");
//display current user intialLetter

const initialLetter = document.getElementById("initialLetter");
initialLetter.textContent = currentUser[0].toUpperCase();
console.log("Current user:", currentUser);

function redirect() {
  window.location.href = "../pages/chat.html";
}

function loadGroupChat() {
  return JSON.parse(localStorage.getItem("groupChat")) || [];
}

//displaying messages that already exist
function displayChats() {
  const groupchatMessages = loadGroupChat();
  //clearing to prevent duplication
  chatMessagesContainer.innerHTML = "";
  groupchatMessages.forEach((message) => {
    const messageDiv = document.createElement("div");
    if (message.currentUser === currentUser) {
      messageDiv.classList.add("messageSent");
    } else {
      messageDiv.classList.add("messageReceived");
    }
    messageDiv.innerHTML = `<span class="messageSender">${
      message.currentUser
    }</span>
         <span class="messageText">${message.message}</span>
         <span class="messageTime">${dateTime(message.date_time)}</span>`;
    chatMessagesContainer.appendChild(messageDiv);
  });
}

//send messages

sendBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const messageValue = messageInput.value.trim();
  //checking if something needs to be sent
  if (messageValue === "") {
    return;
  }
  let userMessages = {
    currentUser: currentUser,
    date_time: Date.now(),
    message: messageValue,
  };
  let groupchatMessages = loadGroupChat();
  //Add new message to the group chat array
  groupchatMessages.push(userMessages);

  // Saving update messages to localStorage
  localStorage.setItem("groupChat", JSON.stringify(groupchatMessages));

  //displaying new message
  displayChats();


  localStorage.setItem('messageUpdates',Date.now());
  
  //leave text area empty
  messageInput.value = "";
});

//fomatting date
function dateTime(dt) {
  let date = new Date(dt);
  let hour = date.getHours();
  let minute = date.getMinutes();
  hour = hour < 10 ? "0" + hour : hour;
  minute = minute < 10 ? "0" + minute : minute;
  return `${hour}:${minute}`;
}

