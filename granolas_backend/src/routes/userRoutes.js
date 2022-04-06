require("dotenv").config();

const users = require("../model/users");
const errorHandler = require("../controller/errorHandler");

const router = require("express").Router();
const client = require("../dbConnection");

function dateTime(date) {
    let dt = date;
    let dtstring = dt.getFullYear()
        + '-' + pad(dt.getMonth()+1,2)
        + '-' + pad(dt.getDate(),2)
        + 'T' + pad(dt.getHours(),2)
        + ':' + pad(dt.getMinutes(),2)
        + ':' + pad(dt.getSeconds(),2);
    return dtstring.toString();
    }

    function pad(number, length) {
        let str = '' + number;
        while (str.length < length) {
            str = '0' + str;
        }
       
        return str;
    }
router.get("/:userId", async (req, response) => {

    const sql = "SELECT * FROM public.usuarios WHERE id=$1"
    const value = [parseInt(req.params.userId)];    

    await client.query(sql, value,  (err, res) => {
        if (err) {

            response.send(err.stack)

        } else {

            
            response.status(200).json(res.rows[0]);

        }
    });

});

router.put("/:id/:senha", async (req, res) => {
    let dt = new Date();
    let dtSt = dt.toString();
    let customer = req.params;
    console.log(customer); 
    
	const sql = "UPDATE public.usuarios SET atualizado_por=$1, atualizado_em=$2, senha=$3 WHERE id=$4";
	const values = [5, `${dateTime(dt)}` ,customer.senha, customer.id];
    await client.query(sql, values);
	return res.json(res.rows).status(200);
});

router.post("/", async (req, res) => {
    let costumer = req.body;
    const dt = new Date();
    
    let sqlstring = `INSERT INTO public.usuarios (nome, cpf, dt_nascimento, email, senha, tipo_de_usuario, criado_por, criado_em )
        VALUES ('${costumer.nome}', '${costumer.cpf}','${costumer.nascimento}', '${costumer.email}', '${costumer.senha}', ${Number(costumer.tipouser)}, ${Number(costumer.userlog)}, '${dateTime(dt)}')`;
    client.query(sqlstring, (err, res) => {
        console.log(err ? err.stack : res.rows[0])
        /* client.end() */
      });
    res.send(sqlstring);
    console.log(sqlstring);
});

router.delete("/:userId", async (req, res) => {
    let user = req.params;
    let dt = new Date();

    const sql = "UPDATE public.usuarios SET deletado_por=$1, deletado_em=$2 WHERE id=$3";
    const values = [5, dateTime(dt), Number(user.userId)];

    await client.query(sql, values);
    return res.json(res.rows).status(200);
});

module.exports = router;
