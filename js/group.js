
    window.addEventListener("storage",(e)=>{
        if(e.key == 'groupChat'){
            displayChats();
        }
    });
    const sendBtn =document.getElementById("sendBtn");
    const messageInput=document.getElementById("messageInput");
    const chatMessagesContainer=document.getElementById("chatMessages");

    //retriving current user
    const emailAddress=sessionStorage.getItem("email");
    const currentUser =sessionStorage.getItem("username");
    
    //display current user intialLetter
    function profilePicture(){
        const initialLetter= document.getElementById("initialLetter")
        initialLetter.textContent=currentUser;
        console.log("Current user:",currentUser);
    }
   
    function redirect (){
        window.location.href="../pages/chat.html"
    }
    //groupChat intilization group chat messages from localStorage
    let groupchatMessages =JSON.parse(localStorage.getItem("groupChat")) || [];

    //displaying messages that already exist 
    function displayChats (){
        //clearing to prevent duplication
        chatMessagesContainer.innerHTML = "" ;
        groupchatMessages.forEach((message)=>{
            const messageDiv =document.createElement('div');
            if(message.currentUser === currentUser){
                messageDiv.classList.add('messageSent');
            } else {
                messageDiv.classList.add('messageReceived');
            }
            messageDiv.innerHTML =
                `<span class="messageSender">${message.senderUsername}</span>
                 <span class="messageText">${message.message}</span>
                 <span class="messageTime">${dateTime(message.date_time)}</span>`;
            chatMessagesContainer.appendChild(messageDiv);
        })
    }
    //chats to be displayed on intial page load
    displayChats();
    //send messages 

        sendBtn.addEventListener('click',(e)=>{
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