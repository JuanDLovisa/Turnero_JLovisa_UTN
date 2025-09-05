import Contenedor from "./components/Contendor"
import Input from "./components/Input"
import { useState } from "react"
import {ToastContainer, toast} from "react-toastify"

const App = () => {

  const [nomCompleto, setNomCompleto] = useState("")
  const [telefono, setTelefono] = useState("")
  const [horario, setHorario] = useState("")
  const [fecha, setFecha] = useState("")

  const fechaHoy = new Date()
  const unaSemanaDesp = new Date()
  unaSemanaDesp.setDate(unaSemanaDesp.getDate() + 7)

  const enviarFormulario = (evento) => {
    evento.preventDefault()

    if([nombreCompleto,fecha,horario,telefono].includes("")) {
      toast.error("Todos los campos son obligatorios")
      return
    }

    const turno = {
      nombreCompleto,
      fecha,
      horario,
      telefono
    }

    localStorage.setItem("turnos", JSON.stringify([turno]))
  }

  return (<div className="w-full min-h-screen 
  flex justify-center items-center gap-3 px-4 bg-gradient-to-b from-slate-800 to-slate-700">
    <Contenedor className={" bg-slate-400"}>
      <div>
        <h2 className="text-3xl font-bold text-center mt-3">Formulario</h2>
      </div>

      <form className="flex flex-col gap-5 pt-5"
      onSubmit={(e) => {enviarFormulario(e)}}>
        <Input name="Nombre Completo" placeholder="Nombre Completo" type="text" value={nomCompleto}
        onChange={(e) => {setNomCompleto(e.target.value)}} />

        <Input name="Telefono" placeholder="Telefono" type="number" value={telefono}
        onChange={(e) => {setTelefono(e.target.value)}} />

        <Input name="Fecha" placeholder="Fecha" type="date" value={fecha} 
        onChange={(e) => {
        const eleccion = new Date(e.target.value)
        if([5,6].includes(eleccion.getDay())) {
          toast.error("No es posible sacar un turno sabado o domingo")
        }
        else{
          setFecha(e.target.value)
        }  
        }} 
        min={fechaHoy.toISOString().slice(0,10)} max={unaSemanaDesp.toISOString().slice(0,10)}
        />

        <Input name="Horario" placeholder="Horario" type="time" step="1800" value={horario} 
        onChange={(e) => {
          const horaUsuario = e.target.value.split(":")
          const hora = Number(horaUsuario[0])
          const minutos = Number(horaUsuario[1])
          console.log(`${hora} ${minutos}`)
          if(hora >= 8 && hora <= 19){
            if(minutos === 0 || minutos === 30){
              setHorario(e.target.value)
              return
            }

            if(minutos > 15 && minutos < 45){
              setHorario(`${horaUsuario[0]}:30`)
            }
            else if(minutos >= 45){
              let horaFormateada = hora + 1
              
              if(horaFormateada >= 20){
                toast.error("Fuera de horario")
                return
              }

              horaFormateada = horaFormateada.toString()

              if(horaFormateada.length === 1){
                setHorario(`0${horaFormateada}:00`)
              }
              else{
                setHorario(`${horaFormateada}:00`)
              }
            }
          }
          else{
            toast.error("Fuera de horario")
          }
          }} />

        <input className="w-full p-2 text-center font-bold bg-slate-800 text-slate-50 
        rounded mt-5 cursor-pointer hover:bg-slate-700 transition-all" 
        type="submit" placeholder="Registrar turno" />
      </form>
    </Contenedor>
    <Contenedor className={"bg-slate-600 text-white"}>
      <div>
        <h2>Turnos</h2>
      </div>
      </Contenedor>
      <ToastContainer/>
  </div>)
}

export default App;