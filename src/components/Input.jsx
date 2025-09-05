const Input = ({name, onChange, value, type, placeholder, min, max, step}) => {
    return(
        <div className="flex flex-col gap-1">
          <label htmlFor={name}>{name}</label>
          <input className="px-1 py-1.5 border-[1px] border-slate-800 rounded shadow bg-slate-500/20" 
          placeholder={placeholder} name={name} id={name}
          onChange={onChange} value={value} type={type} min={min} max={max} step={step} />
        </div>
        )
}

export default Input