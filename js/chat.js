
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
    chatMessagesContainer.innerHTML = ""; // Clear clear  chat before
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

    // Uconversation header to show the selected user's name when user is selected
    if (convoConvo) {
      convoConvo.textContent = selectedUser;
      profileInfo.textContent = selectedUser;
    }
  }

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
    loadChat(recieverUsername);

    // Clear message input after sending
    messageInput.value = "";
  }
  //trigger send button when page loads
  sendBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const selectedUser = convoConvo.textContent;
    if (selectedUser) {
      sendMessage(selectedUser);
    }
  });
// Listen for changes in localStorage
window.addEventListener('storage', function(event) {
    //checking whether it is key messages being updated in the local storage
    if (event.key === 'messages') {
      // Reloading the chat for the current user
      loadChat(convoConvo.textContent);  
      // The conversation that is  happing is stored in convoConvo.textContent
    }
  });
  function showContactInfo(email) {
    infoContact.textContent = email;
  }

  function dateTime(dt) {
    let date = new Date(dt);
    let hour = date.getHours();
    let minute = date.getMinutes();
    hour = hour < 10 ? "0" + hour : hour;
    minute = minute < 10 ? "0" + minute : minute;
    return `${hour}:${minute}`;
  }

  // Clicking on the user in contact list
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

  // contact pop-up show
  profileBtn.addEventListener("click", () => {
    cardPopup.style.display = "block";
  });

  //contact pop-up close
  closeprofileBtn.addEventListener("click", () => {
    cardPopup.style.display = "none";
  });

  // First user display on page load
  if (contactList.length > 0) {
    loadChat(contactList[0].username);
  }
