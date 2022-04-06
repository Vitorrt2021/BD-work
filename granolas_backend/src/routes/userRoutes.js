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

router.put("/:id/:senha", async (req, res) => {
    let dt = new Date();
    let dtSt = dt.toString();
    let customer = req.params;
    console.log(customer); //'SELECT NOW()::timestamp'
    
	const sql = "UPDATE public.usuarios SET atualizado_por=$1, atualizado_em=$2, senha=$3 WHERE id=$4";
	const values = [1, '2022-04-12' ,customer.senha, customer.id];
    await client.query(sql, values);
	return res.send("User updated").status(200);
});

router.post("/", async (req, res) => {
    let dates = req.body;
    console.log(dates);
    const date = new Date().getTime();
    let sqlstring = `INSERT INTO usuarios (nome, cpf, dt_nascimento, email, senha, tipo_de_usuario, criado_por, criado_em)
        VALUES (${dates.nome}, ${dates.cpf},${dates.nascimento}, ${dates.email}, ${dates.senha}, ${dates.tipouser},${dates.userlog}, ${date})`;
    client.query(sqlstring, (err, res) => {
        console.log(err ? err.stack : res.rows[0].message)
        client.end()
      });
    res.send(sqlstring);
    console.log(sqlstring);
});

router.delete("/:userId", async (req, res) => {});

module.exports = router;
