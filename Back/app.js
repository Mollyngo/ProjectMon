const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const app = express();
app.use(require('./middleware/auth'));



app.use(express.json());

const userRoutes = require('./routes/userRoutes');
const clinicRoutes = require('./routes/clinicRoutes');

app.use('/api/user', userRoutes);
app.use('/api/clinic', clinicRoutes);


app.listen(8000, () => {
    console.log("Server started on port 8000");
});