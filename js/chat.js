window.addEventListener("storage", (e) => {
  if (e.key === 'groupChat') {
      displayChats();
  }
});

window.onload = function () {
  // Retrieving email address from sessionStorage
  const emailAddress = sessionStorage.getItem("email");
  console.log(emailAddress);

  // Retrieving email address key properties using emailAddress
  const objectJSON = JSON.parse(localStorage.getItem(emailAddress));
  console.log("This is the user name: " + objectJSON.username);
  const userName = sessionStorage.setItem("username", objectJSON.username);
  console.log("This is the username session: " + sessionStorage.getItem("username"));

  // Retrieving only the username from the object
  const domUsername = objectJSON.username;
  // Display current user
  const initialLetter = document.getElementById("initialLetter");
  initialLetter.textContent = domUsername;

  const sendBtn = document.getElementById("sendBtn");
  const messageInput = document.getElementById("messageInput");
  const textSent = document.getElementById("textSent");
  const chatMessagesContainer = document.getElementById("chatMessages");
  const contactContainer = document.getElementById("contactContainer");
  const convoConvo = document.getElementById("showUsername"); // Ensure this exists
  const gchatBtn = document.getElementById("gchatBtn");

  // Retrieving contact list
  let contactList = JSON.parse(localStorage.getItem("contactList")) || [];

  // Displaying contacts
  contactList.forEach((contact) => {
      if (contact.email !== emailAddress) { // Excluding current user!
          let ul = document.createElement("ul");
          let li = document.createElement("li");
          li.addEventListener('click', (e) => {
              convoClick(contact.username);
              loadChat(contact.username); // Load chat for the selected contact
              sendMessage(contact.username)
          });
          let span = document.createElement("span");
          let span1 = document.createElement("span");
          li.classList.add("contactItem");
          span1.classList.add("iconContact");
          span.classList.add("contactName");
          span.textContent = contact.username;
          ul.appendChild(li);
          li.appendChild(span1);
          li.appendChild(span); 
          contactContainer.appendChild(li);
      }
  });

  // Function to load chat for a selected user
  function loadChat(selectedUser) {
      let messageList = JSON.parse(localStorage.getItem("messages")) || [];

      // Filter messages between current user and selected user
      let filteredMessages = messageList.filter(message => 
          (message.senderUsername === selectedUser && message.recieverUsername === domUsername) ||
          (message.senderUsername === domUsername && message.recieverUsername === selectedUser)
      );

      // Display messages
      chatMessagesContainer.innerHTML = ""; // Clear previous chat
      filteredMessages.forEach((message) => {
          const messageDiv = document.createElement('div');
          if (message.senderUsername === domUsername) {
              messageDiv.classList.add('messageSent');
          } else {
              messageDiv.classList.add('messageReceived');
          }
          messageDiv.innerHTML =
              `<span class="messageSender">${message.senderUsername}</span>
               <span class="messageText">${message.message}</span>
               <span class="messageTime">${dateTime(message.date_time)}</span>`;
          chatMessagesContainer.appendChild(messageDiv);
      });

      // Update conversation header to show the selected user's name
      if (convoConvo) {
          convoConvo.textContent = selectedUser;
      }
  }

  // Function to send message
  function sendMessage(recieverUsername) {
      sendBtn.addEventListener("click", (e) => {
          e.preventDefault();
          const messageValue = messageInput.value.trim();
          if (!messageValue) return; // Don't send empty messages

          const dateTime = Date.now().toString();
          console.log("Message saved to localStorage:", messageValue + " By this email address " + emailAddress);

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

          // Reload chat for the selected user
          loadChat(recieverUsername);

          // Clear message input after sending
          messageInput.value = "";
      });
  }

  // Function to format date and time
  function dateTime(dt) {
      let date = new Date(dt);
      let hour = date.getHours();
      let minute = date.getMinutes();
      hour = hour < 10 ? '0' + hour : hour;
      minute = minute < 10 ? '0' + minute : minute;
      return `${hour}:${minute}`;
  }

  // Clicking on the user
  function convoClick(username) {
      console.log("Selected user: " + username);
      loadChat(username); // Load chat when a contact is clicked
  }

  // Switching to group chat
  gchatBtn.addEventListener("click", (e) => {
      window.location.href = "../pages/group-chat.html";
  });

  // Display the first contact's chat when the page loads (optional)
  if (contactList.length > 0) {
      loadChat(contactList[0].username); // Automatically load the first contact's chat
  }
};