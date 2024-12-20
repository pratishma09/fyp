const express = require("express");
const cors = require("cors");
const db = require("./connection/db");
const app = express();
const router = require('./route/route');

app.use(cors({ origin: "http://localhost:5173" })); 
app.use(express.json()); 

app.use("/api", router);

app.use((err, req, res, next) => {
    console.error(err); 
    if (err.status) {
        return res.status(err.status).json({ message: err.message });
    }
    return res.status(500).json({ message: "Something went wrong!" });
});

app.use((req, res) => {
    res.status(404).json({ message: "Not Found" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
