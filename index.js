const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors')
app.use(cors());
app.use(express.json());


// Ruta raíz
app.get('/', (req, res) => {
  res.send('Hola, mundo!');
});

// Ruta de ejemplo
app.post('/usuarios/login', (req, res) => {
    
    let mail = req.body.mail
    let contrasena = req.body.contrasena

    if (mail == 'm@m.com' && contrasena == '123') {
        res.status(200)
    } else res.status(400)
});

// Ruta con parámetros
app.get('/usuario/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`Información del usuario con ID ${userId}`);
});

app.listen(port, () => {
  console.log(`La aplicación está escuchando en el puerto ${port}`);
});
