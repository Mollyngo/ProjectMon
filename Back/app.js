const express = require("express");
const app = express();
const authRoute = require('./src/routes/auth-route')



app.use(express.json());

app.use('/auth', authRoute)


app.listen(8000, () => {
    console.log("Server started on port 8000");
});