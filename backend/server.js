const express = require("express")
require('dotenv').config();
const connectDb = require("./config/db");
const userRoute = require("./routes/userRoute");
const chatRoute = require("./routes/chatRoute");
const messageRoute = require("./routes/messageRoute")

const {notFound,errorHandler} = require("./middelware/error");



//create instance file 
const app = express()
connectDb();

const PORT = process.env.PORT || 1000; 

app.use(express.json())



app.use("/api/user", userRoute);
app.use("/api/chat", chatRoute);
app.use("/api/messages", messageRoute);



app.use(notFound);
app.use(errorHandler);




app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
