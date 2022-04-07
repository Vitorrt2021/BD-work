const view = require("../model/view");
const errorHandler = require("../controller/errorHandler");
const client = require("../dbConnection");

const router = require("express").Router();

//TODO passar as funções para o controller


router.get("/", async (req, res) => {
    let sql = "SELECT * FROM enderecos"
    await client.query(sql);
    return res.json(res.rows).status(200)

});

router.post("/", async (req, res) => {});

router.delete("/:viewID", async (req, res) => {});

router.put("/:viewId", async (req, res) => {});

module.exports = router;
