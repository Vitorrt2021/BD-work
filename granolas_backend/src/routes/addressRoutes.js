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

router.delete("/:addressId", async (req, res) => {
    let addressId = req.params;
    let dt = new Date();

    const sql = "UPDATE public.enderecos_usuarios SET deletado_por=$1, deletado_em=$2 WHERE id=$3";
    const values = [addressId.userlog, dateTime(dt), Number(addressId.addressId)];

    await client.query(sql, values);
    return res.json(res.rows).status(200);
});

router.put("/:addressId", async (req, res) => {
    let dt = new Date();
    let dtSt = dt.toString();
    let customer = req.params;
    console.log(customer); 
    
	const sql = "UPDATE public.enderecos_usuarios SET atualizado_por=$1, atualizado_em=$2, id_usuario=$3, cep=$4, numero=$5, complemento=$6, logradouro=$7, cidade=$8, uf=$9 WHERE id=$4";
	const values = [customer.userlog, `${dateTime(dt)}` ,customer.iduser, customer.cep, customer.numero, customer.complemento, customer.logradouro, customer.cidade, customer.uf];
    await client.query(sql, values);
	return res.json(res.rows).status(200);
});

module.exports = router;
