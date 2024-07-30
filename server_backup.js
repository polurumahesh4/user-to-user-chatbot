const _ = require("lodash");
const express = require('express');
const app = express();
const port = 3005; // define your port
const server = app.listen(port, () => {
  console.log(`We are Listening on port ${port}...`);
});

const io = require('socket.io')(server, {
    path: "/pathToConnection"
});
let users = {};
let usersList = {};



io.on('connection', (socket) => {


		console.log(socket.id);
		let userID = socket.handshake.query.userID;

	 	if (!users[userID]) users[userID] = [];
  
  		// PUSH SOCKET ID FOR PARTICULAR USER ID
  		users[userID].push(socket.id);
  		usersList[userID] = userID;


  		console.log(users);
 
   		 // attach incoming listener for new user

   		 io.sockets.emit("user_connected", usersList); 


   		socket.on('send_message', function(msg){
       // io.emit('chat message', msg);

       			console.log(msg);

       			console.log(`send message : ${users[msg.receiver]}`);
       			//io.sockets.emit("send_message", msg); 
       			   io.to(users[msg.receiver]).emit("receive_message", msg);

    	});




  //  socket.on("private message", ({ content, to }) => {  socket.to(to).emit("private message", {    msg,    from: socket.id,  });});

   		  // DISCONNECT EVENT
  socket.on('disconnect', (reason) => {

    // REMOVE FROM SOCKET USERS
    _.remove(users[userID], (u) => u === socket.id);
    if (users[userID].length === 0) {

       delete usersList[userID];	
      // ISER IS OFFLINE BROAD CAST TO ALL CONNECTED USERS
      io.sockets.emit("user_disconnected", usersList);
      // REMOVE OBJECT
      delete users[userID];

      
      console.log(usersList);

   
    }


    
   
    socket.disconnect(); // DISCONNECT SOCKET

    console.log(userID, "Is Offline!", socket.id);
/*
    console.log(users_list);
    io.sockets.emit("users_list", users_list);
*/
  });
    	
    
});

