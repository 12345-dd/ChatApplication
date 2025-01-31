import React, { useEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import { List, ListItem, ListItemText, Paper, Typography, Box, TextField, Button } from "@mui/material";
import io from "socket.io-client";
import axios from "axios";

const socket = io("https://mern24.onrender.com");

export const Chat = () => {
  const [users, setusers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setnewMessage] = useState("");
  const userName = localStorage.getItem("userName");

  useEffect(() => {
    socket.emit("user", userName);

    const fetchUsers = async () => {
      try {
        const res = await axios.get("https://mern24.onrender.com/user/user");
        setusers(res.data.data.filter((user) => user.userName !== userName));
      } catch (err) {
        console.log(err);
      }
    };

    fetchUsers();

    socket.on("receive", (data) => {
        setMessages([...messages, data]);
    });

  }, [userName,messages]);
  

  const handleSendMessage = () => {

    const messageData = {
      sender: userName,
      receiver: selectedUser.userName,
      message: newMessage,
    };

    socket.emit("message", messageData);

    setMessages([...messages, { ...messageData, time: new Date() }]);
    setnewMessage("");
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <Paper elevation={3} sx={{ height: "100vh", overflowY: "auto" , backgroundColor:"#5ce1e6",color:"white"}}>
          <Typography variant="h6" sx={{ padding: "10px" }}>
            Users
          </Typography>
          <hr />
          <List>
            {users.map((user) => (
              <ListItem
                button
                onClick={() => setSelectedUser(user)}
                selected={selectedUser?.userName === user.userName}
              >
                <ListItemText primary={user.userName} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>


      <Grid item xs={9}>
        <Paper elevation={3} sx={{ height: "100vh", padding: "10px", display: "flex", flexDirection: "column" }}>
          {selectedUser ? (
            <>
              <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                Chat with {selectedUser.userName}
              </Typography>
              <Box sx={{ flexGrow: 1, overflowY: "auto", marginBottom: "10px" }}>
                {messages
                  .filter(
                    (msg) =>
                      (msg.sender === userName && msg.receiver === selectedUser.userName) ||
                      (msg.sender === selectedUser.userName && msg.receiver === userName)
                  )
                  .map((msg) => (
                    <Box sx={{ padding: "5px" }}>
                      <Typography
                        variant="body2"
                        color={msg.sender === userName ? "primary" : "textSecondary"}
                      >
                        {msg.sender}: {msg.message}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {new Date(msg.time).toLocaleTimeString()}
                      </Typography>
                    </Box>
                  ))}
              </Box>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <TextField
                  variant="outlined"
                  fullWidth
                  value={newMessage}
                  onChange={(e) => setnewMessage(e.target.value)}
                  placeholder="Type a message"
                />
                <Button variant="contained" onClick={handleSendMessage} sx={{ marginLeft: 2 }}>
                  Send
                </Button>
              </Box>
            </>
          ) : (
            <Box sx={{display:"flex",flexDirection:"column",justifyContent:"center", alignItems:"center",height:"100vh"}}>
              <Typography variant="h3" color="textSecondary">
                Select a user to start chatting
              </Typography>
            </Box>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};


