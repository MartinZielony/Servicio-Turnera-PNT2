const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors')
app.use(cors());
app.use(express.json());

let medicoMartin = {
  id: 1,
  mail: "martin@martin.com",
  contrasena: "martin",
  esPaciente: false,
  nombre: 'Martin',
  apellido: 'Zielony',
  horarioInicioAtencion: "09:00",
  horarioFinAtencion: "18:00",
  idEspecialidad: 1
}

let pacientePablo = {
  id: 2,
  mail: "pablo@pablo.com",
  contrasena: "pablo",
  esPaciente: true,
  nombre: 'Pablo',
  apellido: 'Canseco'
}

let usuarios = [
  medicoMartin,
  pacientePablo
]

// Ruta raíz
app.get('/', (req, res) => {
  res.send('Hola, mundo!');
});

// Ruta de ejemplo
app.post('/usuarios/login', (req, res) => {

  let turnos = [{
    idTurno: 1,
    medico: medicoMartin,
    paciente: pacientePablo,
    fecha: 20231107,
    hora: 120000
  },
  {
    idTurno: 2,
    medico: medicoMartin,
    paciente: pacientePablo,
    fecha: 20231207,
    hora: 130000
  },
  {
    idTurno: 3,
    medico: medicoMartin,
    paciente: pacientePablo,
    fecha: 20231108,
    hora: 140000
  }]

  let mail = req.body.mail
  let contrasena = req.body.contrasena

  console.log(req.body);

  let usuarioObtenido = usuarios.find(usuario => usuario.mail == mail)

if (usuarioObtenido != undefined && usuarioObtenido.contrasena == contrasena) {
  let clonUsuario = Object.assign({}, usuarioObtenido)  
    console.log(turnos);
    clonUsuario.turnos = clonUsuario.esPaciente ?
                            turnos.filter(turno => turno.paciente.id == usuarioObtenido.id) 
                            : turnos.filter(turno => turno.medico.id == usuarioObtenido.id)
    console.log(clonUsuario.turnos);
    res.status(200)
      .send(clonUsuario)
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
