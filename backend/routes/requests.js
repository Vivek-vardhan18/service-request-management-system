const express = require("express");
const db = require("../db");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();
router.post("/create", authMiddleware, (req, res) => {
    const { title, description } = req.body;

    const sql =
        "INSERT INTO requests (title, description, user_id) VALUES (?, ?, ?)";

    db.query(
        sql,
        [title, description, req.user.id],
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }

            res.status(201).json({
                message: "Request Created Successfully"
            });
        }
    );
});
router.get("/myrequests", authMiddleware, (req, res) => {

    const sql = "SELECT * FROM requests WHERE user_id = ?";

    db.query(sql, [req.user.id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.status(200).json(result);
    });
});
router.get(
  "/all",
  authMiddleware,
  adminMiddleware,
  (req, res) => {

    const sql = "SELECT * FROM requests";

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.status(200).json(result);
    });
});
router.put(
    "/update/:id",
    authMiddleware,
    adminMiddleware,
    (req, res) => {

    const { status } = req.body;

    const sql =
        "UPDATE requests SET status = ? WHERE id = ?";

    db.query(
        sql,
        [status, req.params.id],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.status(200).json({
                message: "Request Status Updated"
            });
        }
    );
});

router.delete(
    "/delete/:id",
    authMiddleware,
    adminMiddleware,
    (req, res) => {

        const sql =
            "DELETE FROM requests WHERE id = ?";

        db.query(
            sql,
            [req.params.id],
            (err, result) => {

                if (err) {
                    return res.status(500).json(err);
                }

                res.status(200).json({
                    message: "Request Deleted Successfully"
                });
            }
        );
    }
);
module.exports = router;