const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");

const router = express.Router();

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql =
            "INSERT INTO users (name,email,password) VALUES (?,?,?)";

        db.query(
            sql,
            [name, email, hashedPassword],
            (err, result) => {
                if (err) {
                    return res.status(500).json(err);
                }

                res.status(201).json({
                    message: "User Registered Successfully"
                });
            }
        );
    } catch (error) {
        res.status(500).json(error);
    }
});
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], async (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "User Not Found"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            result[0].password
        );

       if (!isMatch) {
    return res.status(401).json({
        message: "Invalid Password"
    });
}


const token = jwt.sign(
{
    id: result[0].id,
    email: result[0].email,
    role: result[0].role
},
process.env.JWT_SECRET,
{ expiresIn: "1h" }
);

res.status(200).json({
    message: "Login Successful",
    token
});
    });
});

module.exports = router;