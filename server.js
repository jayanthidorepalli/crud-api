require("dotenv").config();

const express = require("express");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// --------------------
// Home Route
// --------------------
app.get("/", (req, res) => {
    res.send("CRUD API is running");
});

// --------------------
// Health Check
// --------------------
app.get("/health", async (req, res) => {
    try {
        await prisma.$queryRaw`SELECT 1`;

        res.status(200).json({
            status: "UP",
            database: "Connected"
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            status: "DOWN",
            database: "Disconnected",
            error: err.message
        });
    }
});

// --------------------
// Create User
// --------------------
app.post("/users", async (req, res) => {

    try {

        const { name, email } = req.body;

        const user = await prisma.user.create({
            data: {
                name,
                email
            }
        });

        res.status(201).json(user);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            error: err.message
        });

    }

});

// --------------------
// Get All Users
// --------------------
app.get("/users", async (req, res) => {

    try {

        const users = await prisma.user.findMany();

        res.json(users);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            error: err.message
        });

    }

});

// --------------------
// Get User By ID
// --------------------
app.get("/users/:id", async (req, res) => {

    try {

        const id = Number(req.params.id);

        const user = await prisma.user.findUnique({
            where: {
                id
            }
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json(user);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            error: err.message
        });

    }

});

// --------------------
// Update User
// --------------------
app.put("/users/:id", async (req, res) => {

    try {

        const id = Number(req.params.id);

        const { name, email } = req.body;

        const user = await prisma.user.update({

            where: {
                id
            },

            data: {
                name,
                email
            }

        });

        res.json(user);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            error: err.message
        });

    }

});

// --------------------
// Delete User
// --------------------
app.delete("/users/:id", async (req, res) => {

    try {

        const id = Number(req.params.id);

        await prisma.user.delete({
            where: {
                id
            }
        });

        res.json({
            message: "User deleted successfully"
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            error: err.message
        });

    }

});

// --------------------
// Server
// --------------------
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});
