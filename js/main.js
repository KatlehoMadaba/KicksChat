// const sendBtn = document.getElementById("sendBtn");
// const messageInput = document.getElementById("messageInput");
// const chatMessagesContainer = document.getElementById("chatMessages");
// const personalchatBtn = document.getElementById("btnChat");
// const logoutBtn = document.getElementById("logout");

// //retriving current user
// const emailAddress = sessionStorage.getItem("email");
// const currentUser = sessionStorage.getItem("username");

// //display current user intialLetter
// function profilePicture() {
//   const initialLetter = document.getElementById("initialLetter");
//   initialLetter.textContent = currentUser;
//   console.log("Current user:", currentUser);
// }

// function redirect() {
//   window.location.href = "../pages/chat.html";
// }
// //groupChat intilization group chat messages from localStorage
// let groupchatMessages = JSON.parse(localStorage.getItem("groupChat")) || [];

// //displaying messages that already exist
// function displayChats() {
//   //clearing to prevent duplication
//   chatMessagesContainer.innerHTML = "";
//   groupchatMessages.forEach((message) => {
//     const messageDiv = document.createElement("div");
//     if (message.currentUser === currentUser) {
//       messageDiv.classList.add("messageSent");
//     } else {
//       messageDiv.classList.add("messageReceived");
//     }
//     messageDiv.innerHTML = `<span class="messageSender">${
//       message.currentUser
//     }</span>
//          <span class="messageText">${message.message}</span>
//          <span class="messageTime">${dateTime(message.date_time)}</span>`;
//     chatMessagesContainer.appendChild(messageDiv);
//   });
// }

// displayChats();
// //send messages
// sendBtn.addEventListener("click", (e) => {
//   e.preventDefault();
//   const messageValue = messageInput.value.trim();
//   //checking if something needs to be sent
//   if (messageValue === "") {
//     return;
//   }
//   let userMessages = {
//     currentUser: currentUser,
//     date_time: Date.now(),
//     message: messageValue,
//   };
//   //Add new message to the group chat array
//   groupchatMessages.push(userMessages);

//   // Saving update messages to localStorage
//   localStorage.setItem("groupChat", JSON.stringify(groupchatMessages));

//   //displaying new message
//   displayChats();

//   //leave text area empty
//   messageInput.value = "";
//   // Listen for changes in localStorage
//   window.addEventListener("storage", function (event) {
//     //checking whether it is key messages being updated in the local storage
//     if (event.key === "groupChat") {
//       // Reloading the chat for the current user
//       loadChat(convoConvo.textContent);
//       // The conversation that is  happing is stored in convoConvo.textContent
//     }
//   });
// });

// logoutBtn.addEventListener("click", (e) => {
//   window.location.href = "../index.html";
// });
// //fomatting date
// function dateTime(dt) {
//   let date = new Date(dt);
//   let hour = date.getHours();
//   let minute = date.getMinutes();
//   hour = hour < 10 ? "0" + hour : hour;
//   minute = minute < 10 ? "0" + minute : minute;
//   return `${hour}:${minute}`;
// }