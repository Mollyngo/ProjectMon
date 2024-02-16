const express = require("express");
const app = express();
const authRoute = require('./src/routes/auth-route')
const clinicRoute = require('./src/routes/clinic-route')
const authenticate = require("./src/middlewares/authMiddleware");
const notFound = require("./src/middlewares/notFound");
const error = require("./src/middlewares/error");

app.use(express.json());



app.use('/auth', authRoute);
app.use('/clinics', authenticate, clinicRoute)





app.use(notFound);
app.use(error);

app.listen(8000, () => {
    console.log("Server started on port 8000");
});