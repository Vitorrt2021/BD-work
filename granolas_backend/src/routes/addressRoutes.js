const router = require("express").Router();

const address = require("../model/address");

const errorHandler = require("../controller/errorHandler");

router.get("/:id", async (req, res) => {

    const query = `
        SELECT * FROM
            public.enderecos_usuarios
        LEFT JOIN WHERE id=$1
    
    
    `
    const value = req.params.userId;

    client.query(query, value,  (err, res) => {

        if (err) {
            console.log(err.stack)
        } else {
            console.log(res.rows[0])
        }

    });

});

router.get("/:id", async (req, res) => {});

router.post("/", async (req, res) => {});

router.delete("/:addressId", async (req, res) => {});

router.put("/:addressId", async (req, res) => {});

module.exports = router;
