
export function leerDB () {
    return JSON.parse(localStorage.getItem("citas"))
}

export function escribirDB (datos) {
    localStorage.setItem('citas', JSON.stringify(datos))
}

export function formatearFecha (fecha, hora) {

    const dt = new Date(`${fecha}T${hora}`)

    return dt.toLocaleDateString("es-ES", {
        day: 'numeric',
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: 'numeric'
    })
}