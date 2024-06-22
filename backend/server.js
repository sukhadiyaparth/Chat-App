const express = require("express")
require('dotenv').config();
const connectDb = require("./config/db");
const userRoute = require("./routes/userRoute");
const chatRoute = require("./routes/chatRoute");
const messageRoute = require("./routes/messageRoute")
const cors = require('cors');

const {notFound,errorHandler} = require("./middelware/error");



//create instance file 

const app = express()
connectDb();

const PORT = process.env.PORT || 1000; 
app.use(cors());
app.use(express.json())



app.use("/api/user", userRoute);
app.use("/api/chat", chatRoute);
app.use("/api/messages", messageRoute);


app.get("/",(req,res)=>{
res.send("hello")
})


app.use(notFound);
app.use(errorHandler);




// app.listen(PORT, () => {
//     console.log(`App listening on port ${PORT}`);
// });

const server = app.listen(
    PORT,
    console.log(`Server running on PORT ${PORT}...`)
  );

  // this code is handle corse error
  const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
      origin: "https://chat-app-frontend-ochre.vercel.app/",
      // credentials: true,
    },
  });

  io.on("connection",(socket)=>{
    
    socket.on("setup", (userData)=>{
        // create a room for one to one communication
        socket.join(userData?._id)


        socket.emit("connected userid")
    })

    socket.on("join Chat", (room)=>{
        // create a room for one to one communication
        socket.join(room)

        console.log("User Joined Room :"+room);
    })

    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

    socket.on("new message", (newMessageRecieved)=>{
        // create a room for one to one communication
        var chat = newMessageRecieved?.chat
        if(!chat?.users) return console.log("chat.users is not define");

        chat?.users?.forEach((user) =>{
            if(user?._id == newMessageRecieved?.sender?._id ) return;
            socket.in(user?._id).emit("message recieved", newMessageRecieved)
           
        })
    });


    socket.off("setup", ()=>{
        console.log("user Disconnected");
        socket.leave(userData?._id)
    })





  })
