const express = require("express")
require('dotenv').config();
const connectDb = require("./config/db");
const userRoute = require("./routes/userRoute");
const {notFound,errorHandler} = require("./middelware/error");
var cookieParser = require('cookie-parser');
const { checkAuthenticationcookie } = require("./middelware/authentication");


//create instance file 
const app = express()
connectDb();

const PORT = process.env.PORT || 1000; 

app.use(express.json())

app.use(cookieParser())
app.use(checkAuthenticationcookie('token'))


app.use("/api/user", userRoute);

app.use(notFound);
app.use(errorHandler);




app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
