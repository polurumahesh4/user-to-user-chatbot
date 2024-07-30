const host = "http://localhost:3005";
var receiver = "";
var sender = "";

// PASS your query parameters

const userID = document.getElementById("userID").value;
sender = document.getElementById("userID").value;
const queryParams = { userID: userID };
const socket = io(host, {
  path: "/pathToConnection",
  transports: ["websocket"], // https://stackoverflow.com/a/52180905/8987128
  upgrade: false,
  query: queryParams,
  reconnection: false,
  rejectUnauthorized: false,
});

socket.once("connect", () => {
  // USER IS ONLINE
  socket.on("user_connected", (users) => {
    console.log(userID, "Is Connected!"); // update online status
    var html = "";
    for (i in users) {
      html +=
        "<li class='clearfix' onclick=onUserSelected('" + users[i] + "');>";
      html +=
        "<img src='https://bootdey.com/img/Content/avatar/avatar1.png' alt='avatar'>";
      html += "<div class='about'>";
      html += "<div class='name'>" + users[i] + "</div>";
      html +=
        "<div class='status'> <i class='fa fa-circle offline'></i> left 7 mins ago </div> ";
      html += "</div>";
      html += "</li>";
    }
    document.getElementById("users").innerHTML = "";
    document.getElementById("users").innerHTML += html;
  });

  socket.on("receive_message", function (msg) {
    console.log(msg);

    var html = "";

    html += "<li class='clearfix'>";
    html += "<div class='message-data'>";
    html += "<span class='message-data-time'>10:10 AM, Today</span>";
    html += "</div>";
    html += "<div class='message my-message'>" + msg.message + " </div>";
    html += "</li>";

    document.getElementById("messages").innerHTML += html;
  });

  socket.on("user_disconnected", (users) => {
    var html = "";
    for (i in users) {
      html +=
        "<li class='clearfix' onclick=onUserSelected('" + users[i] + "');>";
      html +=
        "<img src='https://bootdey.com/img/Content/avatar/avatar1.png' alt='avatar'>";
      html += "<div class='about'>";
      html += "<div class='name'>" + users[i] + "</div>";
      html +=
        "<div class='status'> <i class='fa fa-circle offline'></i> left 7 mins ago </div> ";
      html += "</div>";
      html += "</li>";
    }
    document.getElementById("users").innerHTML = "";
    document.getElementById("users").innerHTML += html;
  });

  // ==== SUPPORTIVES

  socket.on("connect_error", (err) => {
    document.getElementById("connection").innerHTML =
      "Connect Error - " + err.message;
    console.log(err.message);
  });
  socket.on("connect_timeout", () => {
    document.getElementById("connection").innerHTML =
      "Conection Time Out Please Try Again.";
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
    document.getElementById("connection").innerHTML =
      "Reconnect Error - " + err.message;
  });
  socket.on("reconnect_failed", () => {
    document.getElementById("connection").innerHTML = "Reconnect Failed";
  });
});
