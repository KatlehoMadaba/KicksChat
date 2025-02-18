window.onload = function () {
  const emailAddress = sessionStorage.getItem("email");
  const objectJSON = JSON.parse(localStorage.getItem(emailAddress));
  const domUsername = objectJSON.username;
  const sendBtn = document.getElementById("sendBtn");
  const messageInput = document.getElementById("messageInput");
  const chatMessagesContainer = document.getElementById("chatMessages");
  const contactContainer = document.getElementById("contactContainer");
  const convoConvo = document.getElementById("showUsername"); // Ensure that exists
  const logOut = document.getElementById("logOut");

  // Retrieve contacts and store in the contact list
  let contactList = JSON.parse(localStorage.getItem("contactList")) || [];

  // Display contacts in the contact list
  contactList.forEach((contact) => {
    if (contact.email !== emailAddress) {
      let ul = document.createElement("ul");
      let li = document.createElement("li");
      li.addEventListener("click", () => {
        convoClick(contact.username);
        loadChat(contact.username);
      });
      let span = document.createElement("span");
      li.classList.add("contactItem");
      span.classList.add("contactName");
      span.textContent = contact.username;
      ul.appendChild(li);
      li.appendChild(span);
      contactContainer.appendChild(li);
    }
  });

  //  selected  chat
  function loadChat(selectedUser) {
    let messageList = JSON.parse(localStorage.getItem("messages")) || [];
    let filteredMessages = messageList.filter(
      (message) =>
        (message.senderUsername === selectedUser &&
          message.recieverUsername === domUsername) ||
        (message.senderUsername === domUsername &&
          message.recieverUsername === selectedUser)
    );

    chatMessagesContainer.innerHTML = ""; // Clear
    filteredMessages.forEach((message) => {
      const messageDiv = document.createElement("div");
      if (message.senderUsername === domUsername) {
        messageDiv.classList.add("messageSent");
      } else {
        messageDiv.classList.add("messageReceived");
      }
      messageDiv.innerHTML = `<span class="messageSender">${
        message.senderUsername
      }</span>
           <span class="messageText">${message.message}</span>
           <span class="messageTime">${dateTime(message.date_time)}</span>`;
      chatMessagesContainer.appendChild(messageDiv);
    });

    if (convoConvo) {
      convoConvo.textContent = selectedUser;
    }
  }

  function sendMessage(recieverUsername) {
    sendBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const messageValue = messageInput.value.trim();
      if (!messageValue) {
        console.log("empty message");
        return;
      }

      const dateTime = Date.now().toString();

      let message = {
        email: emailAddress,
        senderUsername: domUsername,
        recieverUsername: recieverUsername,
        message: messageValue,
        date_time: dateTime,
        status: "sent",
      };

      let storedMessages = JSON.parse(localStorage.getItem("messages")) || [];
      storedMessages.push(message);
      localStorage.setItem("messages", JSON.stringify(storedMessages));

      console.log(
        "Message saved to localStorage:",
        messageValue + " By this email address " + emailAddress
      );

      //reload
      loadChat(recieverUsername);

      messageInput.value = "";
    });
  }

  function dateTime(dt) {
    let date = new Date(dt);
    let hour = date.getHours();
    let minute = date.getMinutes();
    hour = hour < 10 ? "0" + hour : hour;
    minute = minute < 10 ? "0" + minute : minute;
    return `${hour}:${minute}`;
  }

  function convoClick(username) {
    loadChat(username);
    sendMessage(username);
  }

  if (contactList.length > 0) {
    loadChat(contactList[0].username); //show first  person
  }

  function logOut() {
    logOut.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href="../index.html"
      sessionStorage.setItem("")
    });
  }
};