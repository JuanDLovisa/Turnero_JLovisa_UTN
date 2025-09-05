const Contenedor=({className, children})=>{
    return(

    <div className={`h-[600px] w-[400px] rounded-lg p-[16px] shadow ${className}`}>
        {children}
    </div>

    )
}

export default Contenedor