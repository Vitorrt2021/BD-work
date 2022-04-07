const router = require("express").Router();
const client = require("../dbConnection");
const address = require("../model/address");
require("dotenv").config();

const errorHandler = require("../controller/errorHandler");

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

router.get("/:id", async (req, response) => {
    const sql = "SELECT * FROM public.enderecos_usuarios WHERE id_usuario=$1"
    
    const value = [parseInt(req.params.id)];    
    console.log(value)
    await client.query(sql, value,  (err, res) => {
        if (err) {
            response.send(err.stack)
        } else {
            return response.status(200).json(res.rows[0]);
        }
    });
    

});

router.post("/", async (req, res) => {
    let dates = req.body;
    console.log(dates);
    const dt = new Date();
    
    let sqlstring = `INSERT INTO public.enderecos_usuarios (id_usuario, cep, numero, complemento, logradouro, cidade, uf, criado_por, criado_em )
        VALUES ('${dates.iduser}', '${dates.cep}','${dates.numero}', '${dates.complemento}', '${dates.logradouro}', '${dates.cidade}', '${dates.uf}', '${dates.userlog}', '${dateTime(dt)}')`;
    client.query(sqlstring, (err, res) => {
        console.log(err ? err.stack : res.rows)
        /* client.end() */
      });
    res.send(sqlstring);
    
});

router.delete("/:userId", async (req, res) => {
    let costumer = req.params;
    let dt = new Date();

    const sql = "UPDATE public.enderecos_usuarios SET deletado_por=$1, deletado_em=$2 WHERE id_usuario=$3";
    const values = [5, dateTime(dt), Number(costumer.userId)];

    await client.query(sql, values);
    return res.json(res.rows).status(200);
});

router.put("/:userId/:cep/:numero/:complemento/:logradouro/:cidade/:uf", async (req, res) => {
    let costumer = req.params;
    let dt = new Date();

    let sql = "UPDATE public.enderecos_usuarios SET atualizado_por=$1, atualizado_em=$2, cep=$3, numero=$4, complemento=$5, logradouro=$6, cidade=$7, uf=$8 WHERE id_usuario=$9";
    let values = [5, dateTime(dt), costumer.cep, costumer.numero, costumer.complemento, costumer.logradouro, costumer.cidade, costumer.uf, costumer.userId];

    await client.query(sql, values);
    return res.json(res.rows).status(200);
});

module.exports = router;
