require("dotenv").config();

const users = require("../model/users");
const errorHandler = require("../controller/errorHandler");

const router = require("express").Router();
const client = require("../dbConnection");

router.get("/:userId", async (req, response) => {

    const sql = "SELECT * FROM public.usuarios WHERE id=$1"
    const value = [parseInt(req.params.userId)];    

    await client.query(sql, value,  (err, res) => {
        if (err) {

            res.send(err.stack)

        } else {

            console.log(res.rows);
            response.send("funcionou");

        }
    });

});

router.post("/", async (req, res) => {});

router.put("/:userId", async (req, res) => {});

router.delete("/:userId", async (req, res) => {});

module.exports = router;
