require("dotenv").config;
const app = require("./src/app");
const client = require("./src/dbConnection");

const port = process.env.PORT || 3004;

client
  .connect()
  .then((data) => {
    console.log("Conectado na base de dados");
    client.query("SELECT * from usuarios").then((e) => {
      console.log(e.rows);
    });
    app.listen(port, () => console.log(`Ouvindo na porta ${port} ...`));
  })
  .catch((err) => {
    console.log(err);
  });
