const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../connection/db"); 

const router = express.Router();
const JWT_SECRET = "your_secret_key";

const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

router.post("/register", async (req, res) => {
    const { email, password } = req.body;
    

    if (!isValidEmail(email)) {
        return res.status(400).send("Invalid email format");
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = "INSERT INTO users ( email, password) VALUES (?,?)";
        db.query(query, [ email, hashedPassword], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error registering user");
            }
            res.status(201).send("User registered successfully");
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error registering user");
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!isValidEmail(email)) {
        return res.status(400).send("Invalid email format");
    }

    try {
        const query = "SELECT * FROM users WHERE email = ?";
        db.query(query, [email], async (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error logging in");
            }

            if (results.length > 0) {
                const user = results[0];

                const isMatch = await bcrypt.compare(password, user.password);

                if (isMatch) {
                    const token = jwt.sign(
                        { id: user.id, email: user.email },
                        JWT_SECRET,
                        { expiresIn: "1h" }
                    );

                    res.status(200).json({
                        message: "Login successful",
                        token,
                    });
                } else {
                    res.status(401).send("Invalid credentials");
                }
            } else {
                res.status(404).send("User not found");
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error logging in");
    }
});

module.exports = router;
