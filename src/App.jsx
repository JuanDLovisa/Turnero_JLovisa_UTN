import Contenedor from "./components/Contendor.jsx"
import { useState } from 'react'
import Input from "./components/Input"
import { ToastContainer, toast } from "react-toastify"
import { leerDB, escribirDB } from './ayuda.js'
import Tarjeta from "./components/Tarjeta.jsx"
import { v4 as uuid } from "uuid"

const App = () => {
  
  const [id, modificarId] = useState(null)
  const [nombreCompleto, modificarNombreCompleto] = useState("")
  const [fecha, modificarFecha] = useState("")
  const [horario, modificarHorario] = useState("")
  const [telefono, modificarTelefono] = useState("")
  const [citas, modificarCitas] = useState(leerDB() ?? [])
  const hoy = new Date()
  const unaSemanaDespues = new Date()
  unaSemanaDespues.setDate(unaSemanaDespues.getDate() + 7)


  const manejarHorario = (evento) => {
    const horaUsuario = evento.target.value
    const horaUsuarioSplit = horaUsuario.split(":")
    const hora = Number(horaUsuarioSplit[0])
    const minutos = Number(horaUsuarioSplit[1])
    if (hora >= 8 && hora <= 19) {
      if (minutos === 30 || minutos === 0) {
        modificarHorario(horaUsuario)
        return
      }
      if (minutos > 15 && minutos < 45) {
        modificarHorario(`${horaUsuarioSplit[0]}:30`)

      } else if (minutos >= 45) {
        let hora_formateada = hora + 1

        if (hora_formateada >= 20) {
          toast.error("Fuera de horario")
          return
        }

        hora_formateada = hora_formateada.toString()
        if (hora_formateada.length === 1) {
          modificarHorario(`0${hora_formateada}:00`)
        } else {
          modificarHorario(`${hora_formateada}:00`)
        }

      }
      else {
        modificarHorario(`${horaUsuarioSplit[0]}:00`)

      }

    } else {
      toast.error("Fuera de horario")
    }
  }

  const borrarCita = (id) => {
  const citasFiltradas = citas.filter(cita => cita.id !== id)

  escribirDB(citasFiltradas)          
  modificarCitas(citasFiltradas)      

  toast.success("Turno eliminado correctamente")
}

  const editarCita = (id) => {

    const [citaFiltrada] = citas.filter(
      function (cita) {
        if (cita.id === id) {
          return cita
        }

      }
    )

    modificarId(citaFiltrada.id)
    modificarNombreCompleto(citaFiltrada.nombreCompleto)
    modificarFecha(citaFiltrada.fecha)
    modificarHorario(citaFiltrada.horario)
    modificarTelefono(citaFiltrada.telefono)

  }
  // 
  const limpiarEstados = () => {
    modificarId(null)
    modificarNombreCompleto("")
    modificarHorario("")
    modificarFecha("")
    modificarTelefono("")
  }

  const modificarCitayGuarda = () => {

    const citasModificadas = citas.map(
      function (cita) {
        if (cita.id === id) {
          return {
            id: id,
            nombreCompleto,
            horario,
            fecha,
            telefono
          }
        }
        return cita
      }
    )

    escribirDB(citasModificadas)
    modificarCitas(leerDB())

    limpiarEstados()

    toast.success("Turno Modificado Enhorabuena")
  }

const enviarFormulario = (evento) => {
  evento.preventDefault()

  if (id !== null) {
    modificarCitayGuarda()
    return
  }

  if ([nombreCompleto, fecha, horario, telefono].includes("")) {
    toast.error("Todos los campos son obligatorios")
    return
  }

  const turno = {
    id: uuid(),
    nombreCompleto,
    fecha,
    horario,
    telefono
  }

  const datos = leerDB() ?? []

  // 🔍 Verificar que no exista ya un turno en esa fecha y horario
  const existeTurno = datos.some(
    (cita) => cita.fecha === fecha && cita.horario === horario
  )

  if (existeTurno) {
    toast.error("Ya existe un turno en esa fecha y horario")
    return
  }

  datos.push(turno)
  escribirDB(datos)
  modificarCitas(leerDB() ?? [])

  limpiarEstados()

  toast.success("Turno cargado exitosamente")
}

  return (
    <div
      className="w-full min-h-screen bg-gradient-to-b from-slate-800 to-slate-700 flex justify-center items-center gap-3 px-4 ">

      <Contenedor className="bg-slate-600/90 shadow-lg border border-slate-500 text-slate-100" >
        <div>
          <h2 className='text-3xl font-black text-center mt-5' >Formulario</h2>
          <form
            className="flex flex-col gap-5 mt-5"
            onSubmit={enviarFormulario}

          >
            <Input
              name="Nombre Completo"
              placeholder="Nombre Completo"
              type="text"
              value={nombreCompleto}
              onChange={
                (evento) => {
                  modificarNombreCompleto(evento.target.value)
                }
              }
            />

            <Input
              name="Día"
              type="date"
              min={hoy.toISOString().slice(0, 10)}
              max={unaSemanaDespues.toISOString().slice(0, 10)}
              value={fecha}
              onChange={(evento) => {
                const eleccion = new Date(evento.target.value)
                const dia = eleccion.getDay() // obtenemos el dia de la semana Lunes == 0 Domingo == 6
                if (dia === 0 || dia === 6) {
                  toast.error("Domingos y Lunes no laboramos")
                } else {
                  modificarFecha(evento.target.value)
                }
              }
              }
            />
            <Input
              name="Horario"
              type="time"
              step="1800"
              value={horario}
              onChange={manejarHorario}

            />
            <Input
              type="number"
              name="Telefono"
              placeholder="Ingrese su telefono"
              value={telefono}
              onChange={(evento) => {
                modificarTelefono(evento.target.value)
              }}

            />
            <input
              className="bg-emerald-500 hover:bg-emerald-600 text-white w-full p-2 text-center font-bold rounded mt-5 cursor-pointer transition-all"
              type="submit"
              value={id !== null ? "Modificar" : "Agendar"}
            />
          </form>
        </div>
      </Contenedor>

      <Contenedor className="bg-slate-600/90 shadow-lg border border-slate-500 text-slate-100">
        <div>
          <h2 className='text-3xl mt-4 mb-4 font-black text-center'>Turnos</h2>
          <div className="h-[450px] overflow-auto flex flex-col gap-1 p-2">
            {
              citas.map(cita => {
                return <Tarjeta
                  key={cita.id}
                  cita={cita}
                  borrar={borrarCita}
                  modificar={editarCita} />
              })
            }
          </div>
        </div>
      </Contenedor>

      <ToastContainer />
    </div >
  )
}

export default App