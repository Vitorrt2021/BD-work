const router = require("express").Router();

const address = require("../model/address");

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

router.get("/:id", async (req, res) => {
    const sql = "SELECT * FROM public.enderecos_usuarios WHERE id=$1"
    const value = [parseInt(req.params.Id)];    

    await client.query(sql, value,  (err, res) => {
        if (err) {
            response.send(err.stack)
        } else {
            response.status(200).json(res.rows[0]);
        }
    });
    /*const query = `
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

    });*/

});

router.post("/", async (req, res) => {
    let dates = req.body;
    console.log(dates);
    const dt = new Date();
    
    let sqlstring = `INSERT INTO public.enderecos_usuarios (id_usuario, cep, numero, complemento, logradouro, cidade, uf, criado_por, criado_em )
        VALUES ('${dates.iduser}', '${dates.cep}','${dates.numero}', '${dates.complemento}', '${dates.logradouro}', '${dates.cidade}', '${dates.uf}', '${dates.userlog}', ${dateTime(dt)})`;
    client.query(sqlstring, (err, res) => {
        console.log(err ? err.stack : res.rows[0])
        client.end()
      });
    res.send(sqlstring);
    console.log(sqlstring);
});

router.delete("/:addressId", async (req, res) => {});

router.put("/:addressId", async (req, res) => {});

module.exports = router;
