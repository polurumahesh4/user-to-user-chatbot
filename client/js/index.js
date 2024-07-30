document.addEventListener("DOMContentLoaded", () => {
    const host = "http://localhost:3005";
    let receiver = "";
    const sender = document.getElementById("userID").value;
    const queryParams = { userID: sender };
    const socket = io(host, {
      path: "/pathToConnection",
      transports: ["websocket"],
      upgrade: false,
      query: queryParams,
      reconnection: false,
      rejectUnauthorized: false,
    });
  
    const chatContainer = document.getElementById("chat-windows-container");
    let chatWindowCount = 0;
    const maxChatWindows = 3;
    const openChats = new Set();
  
    function addNavLinkListeners() {
      const navLinks = document.querySelectorAll(".nav-link");
  
      navLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
          event.preventDefault();
          const chatTitleText = event.target.closest(".nav-link").getAttribute("data-chat");
          receiver = chatTitleText; // Set receiver for the sender
          if (openChats.has(chatTitleText)) {
            alert("This chat window is already open.");
          } else if (chatWindowCount < maxChatWindows) {
            createChatWindow(chatTitleText);
          } else {
            alert("Maximum of 3 chat windows are allowed.");
          }
        });
      });
    }
  
    function createChatWindow(title) {
      const chatWindow = document.createElement("div");
      chatWindow.classList.add("chat-window");
      chatWindow.setAttribute("data-chat", title);
  
      chatWindow.innerHTML = `
        <div class="chat-header">
          <span>${title}</span>
          <button class="close-chat"><i class="fas fa-times"></i></button>
        </div>
        <div class="chat-body">
          <!-- Chat content goes here -->
        </div>
        <div class="chat-footer">
          <input type="text" placeholder="Type a message">
          <button class="send-message-btn">Send</button>
        </div>
      `;
  
      chatContainer.appendChild(chatWindow);
      positionChatWindows();
  
      chatWindowCount++;
      openChats.add(title);
  
      const closeChatButton = chatWindow.querySelector(".close-chat");
      closeChatButton.addEventListener("click", () => {
        chatContainer.removeChild(chatWindow);
        chatWindowCount--;
        openChats.delete(title);
        positionChatWindows();
      });
  
      const sendMessageButton = chatWindow.querySelector(".send-message-btn");
      sendMessageButton.addEventListener("click", () => {
        const messageInput = chatWindow.querySelector(".chat-footer input");
        const message = messageInput.value;
        if (message.trim() !== "") {
          socket.emit("send_message", {
            receiver: title,
            sender: sender,
            message: message,
          });
          messageInput.value = "";
  
          const chatBody = chatWindow.querySelector(".chat-body");
          const html = `
          <li class='clearfix'>
            <div class='message-data'>
              <span class='message-data-time'>${new Date().toLocaleTimeString()}</span>
            </div>
            <div class='message my-message'>${message}</div>
          </li>
        `;
        chatBody.innerHTML += html;
        }
      });
    }
  
    function positionChatWindows() {
      const chatWindows = document.querySelectorAll(".chat-window");
      let bottomOffset = 0;
      let rightOffset = 0;
  
      chatWindows.forEach((chatWindow, index) => {
        if (index % 3 === 0 && index !== 0) {
          bottomOffset += chatWindow.offsetHeight + 20; // 20px for margin
          rightOffset = 0;
        }
        chatWindow.style.bottom = bottomOffset + "px";
        chatWindow.style.right = rightOffset + "px";
        rightOffset += chatWindow.offsetWidth + 20; // 20px for margin
      });
    }
  
    socket.once("connect", () => {
      // USER IS ONLINE
      socket.on("user_connected", (users) => {
        console.log(sender, "Is Connected!");
        let html = "";
        for (let i in users) {
          html +=
            `<li><a href="#" class="nav-link" data-chat="${users[i]}"><i class="fas fa-th-large"></i> ${users[i]}</a></li>`;
        }
        document.getElementById("online_user_list").innerHTML = html;
        addNavLinkListeners();
      });
  
      socket.on("receive_message", function (msg) {
        console.log(msg);
        const { sender: messageSender, message } = msg;
        
        // Check if the chat window with the sender is already open
        if (!openChats.has(messageSender)) {
          createChatWindow(messageSender);
        }
      
        const chatWindow = document.querySelector(`.chat-window[data-chat="${messageSender}"] .chat-body`);
        const isSender = sender === messageSender; // Check if the message is from the current user
      
        const messageClass = isSender ? 'my-message' : 'other-message';
        const html = `
          <li class='clearfix'>
            <div class='message-data'>
              <span class='message-data-time'>${new Date().toLocaleTimeString()}</span>
            </div>
            <div class='message ${messageClass}'>${message}</div>
          </li>
        `;
        chatWindow.innerHTML += html;
      });
      
  
      socket.on("user_disconnected", (users) => {
        let html = "";
        for (let i in users) {
          html +=
            `<li><a href="#" class="nav-link" data-chat="${users[i]}"><i class="fas fa-th-large"></i> ${users[i]}</a></li>`;
        }
        document.getElementById("online_user_list").innerHTML = html;
        addNavLinkListeners();
      });
  
      // ==== SUPPORTIVES
      socket.on("connect_error", (err) => {
        document.getElementById("connection").innerHTML = "Connect Error - " + err.message;
        console.log(err.message);
      });
      socket.on("connect_timeout", () => {
        document.getElementById("connection").innerHTML = "Connection Time Out Please Try Again.";
      });
      socket.on("reconnect", (num) => {
        document.getElementById("connection").innerHTML = "Reconnected - " + num;
      });
      socket.on("reconnect_attempt", () => {
        document.getElementById("connection").innerHTML = "Reconnect Attempted.";
      });
      socket.on("reconnecting", (num) => {
        document.getElementById("connection").innerHTML = "Reconnecting - " + num;
      });
      socket.on("reconnect_error", (err) => {
        document.getElementById("connection").innerHTML = "Reconnect Error - " + err.message;
      });
      socket.on("reconnect_failed", () => {
        document.getElementById("connection").innerHTML = "Reconnect Failed";
      });
    });
  });
  