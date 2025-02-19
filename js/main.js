// Retrieving email address from sessionStorage
const emailAddress = sessionStorage.getItem("email");
console.log(emailAddress);

// Retrieving email address key properties using emailAddress
const objectJSON = JSON.parse(localStorage.getItem(emailAddress));
console.log("This is the user name: " + objectJSON.username);
const domUsername = objectJSON.username;

// Display current user
const initialLetter = document.getElementById("initialLetter");
initialLetter.textContent = domUsername[0].toUpperCase();

const sendBtn = document.getElementById("sendBtn");
const messageInput = document.getElementById("messageInput");
const chatMessagesContainer = document.getElementById("chatMessages");
const contactContainer = document.getElementById("contactContainer");
const convoConvo = document.getElementById("showUsername");
const gchatBtn = document.getElementById("gchatBtn");
const logoutBtn = document.getElementById("logout");
const profileBtn = document.getElementById("userInfo");
const closeprofileBtn = document.getElementById("closeBtn");
const profileInfo = document.getElementById("profilename");
const cardPopup = document.getElementById("cardPopup");
const infoContact = document.getElementById("infoContact");

// Retrieving contact list from localStorage
let contactList = JSON.parse(localStorage.getItem("contactList")) || [];

// Displaying contacts
contactList.forEach((contact) => {
  if (contact.email !== emailAddress) {
    let ul = document.createElement("ul");
    let li = document.createElement("li");
    li.addEventListener("click", () => {
      convoClick(contact.username);
      loadChat(contact.username);
      showContactInfo(contact.email);
    });
    let span = document.createElement("span");
    span.classList.add("contactName");
    span.textContent = contact.username;
    li.classList.add("contactItem");
    li.appendChild(span);
    ul.appendChild(li);
    contactContainer.appendChild(ul);
  }
});

// Function to load chat for a selected user
function loadChat(selectedUser) {
  let messageList = JSON.parse(localStorage.getItem("messages")) || [];
  // Filter messages between current user and selected user
  let filteredMessages = messageList.filter(
    (message) =>
      (message.senderUsername === selectedUser &&
        message.recieverUsername === domUsername) ||
      (message.senderUsername === domUsername &&
        message.recieverUsername === selectedUser)
  );

  // Display messages
  chatMessagesContainer.innerHTML = ""; // Clear chat before
  filteredMessages.forEach((message) => {
    const messageDiv = document.createElement("div");
    if (message.senderUsername === domUsername) {
      messageDiv.classList.add("messageSent");
    } else {
      messageDiv.classList.add("messageReceived");
    }
    messageDiv.innerHTML = `
        <span class="messageSender">${message.senderUsername}</span>
        <span class="messageText">${message.message}</span>
        <span class="messageTime">${dateTime(message.date_time)}</span>
      `;
    chatMessagesContainer.appendChild(messageDiv);
  });

  // Update conversation header to show the selected user's name
  if (convoConvo) {
    convoConvo.textContent = selectedUser;
    profileInfo.textContent = selectedUser;
  }
}

// Function to send message
function sendMessage(recieverUsername) {
  const messageValue = messageInput.value.trim();
  if (!messageValue) return;

  const dateTime = Date.now().toString();
  console.log(
    "Message saved to localStorage:",
    messageValue + " By this email address " + emailAddress
  );

  let message = {
    email: emailAddress,
    senderUsername: domUsername,
    recieverUsername: recieverUsername,
    message: messageValue,
    date_time: dateTime,
    status: "sent",
  };

  // Store message in localStorage
  let storedMessages = JSON.parse(localStorage.getItem("messages")) || [];
  storedMessages.push(message);
  localStorage.setItem("messages", JSON.stringify(storedMessages));

  // Trigger a storage event update by setting a new 'messageUpdate' key
  localStorage.setItem("messageUpdate", Date.now().toString());  // This will fire the 'storage' event

  // Load the chat and display the new message immediately
  loadChat(recieverUsername);

  // Clear message input after sending
  messageInput.value = "";
}

// Event listener for send button
sendBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const selectedUser = convoConvo.textContent;
  if (selectedUser) {
    sendMessage(selectedUser);
  }
});

// Function to show contact info
function showContactInfo(email) {
  infoContact.textContent = email;
}

// Format date and time for message timestamps
function dateTime(dt) {
  let date = new Date(dt);
  let hour = date.getHours();
  let minute = date.getMinutes();
  hour = hour < 10 ? "0" + hour : hour;
  minute = minute < 10 ? "0" + minute : minute;
  return `${hour}:${minute}`;
}

// Clicking on a user in the contact list
function convoClick(username) {
  console.log("Selected user: " + username);
  loadChat(username); // Load chat when a contact is clicked
}

// Route to group chat page
gchatBtn.addEventListener("click", (e) => {
  window.location.href = "../pages/group-chat.html";
});

// Logout button
logoutBtn.addEventListener("click", () => {
  window.location.href = "../index.html";
});

// Contact pop-up show
profileBtn.addEventListener("click", () => {
  cardPopup.style.display = "block";
});

// Contact pop-up close
closeprofileBtn.addEventListener("click", () => {
  cardPopup.style.display = "none";
});

// Listen for changes in localStorage (
window.addEventListener('storage', function(event) {
  // Check if the key of the updated storage item is 'mess'
  if (event.key === 'messageUpdate') {
    console.log('Message update detected, refreshing chat...');
    // Reload the chat for the current user
    loadChat(convoConvo.textContent);  // The current conversation is stored in convoConvo.textContent
  }
});

// First user display on page load (if there's any contact)
if (contactList.length > 0) {
  loadChat(contactList[0].username);
}