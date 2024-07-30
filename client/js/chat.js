

 function sendMessage() {
        // get message
        var message = document.getElementById("message").value;


        // send message to server
         socket.emit("send_message", {
          sender: sender,
          receiver: receiver,
          message: message
        }); 

       /*

         socket.on('send_message', function(msg){
     
         		console.log(msg);

            
        }); */
  
            var html = "";

            html += "<li class='clearfix'>";
            html += "<div class='message-data text-right'>";
            html += "<span class='message-data-time'>10:10 AM, Today</span>";
            html += "<img src='https://bootdey.com/img/Content/avatar/avatar7.png' alt='avatar'>";
            html += "</div>";
            html += "<div class='message other-message float-right'>" +message+" </div>";
            html += "</li>";
 
            document.getElementById("messages").innerHTML += html;

        // append your own message
        document.getElementById("message").value = "";
        // prevent form from submitting
        return false;
    }


        function onUserSelected(username) {
        // save selected user in global variable
        receiver = username;
        sender = document.getElementById("userID").value;
        alert(sender);
        alert(receiver);
        document.getElementById("receiver").innerHTML = receiver;

      }
