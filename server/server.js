import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const db = new pg.Pool({
    connectionString: process.env.DB_CONN
});

app.get("/messages", async (req, res) => {
    const result = await db.query(
    "SELECT * FROM fan_messages ORDER BY created_at DESC"
);

res.json(result.rows);
});

app.post("/messages", async (req, res) => {
    const { fan_name, team, message } = req.body;

await db.query(
    "INSERT INTO fan_messages (fan_name, team, message) VALUES ($1, $2, $3)",
    [fan_name, team, message]
);

    res.status(201).json({ success: true });
});

app.get("/", (req, res) => {
    res.send("Guestbook API is running");
});

app.listen(3000, () => {
    console.log("server running on port 3000");
});