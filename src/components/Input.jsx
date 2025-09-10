const Input =
    ({ name, onChange, value, type, placeholder, min, max, step }) => {
        return (
            <div
                className="flex flex-col gap-2"
            >
                <label htmlFor={name}>{name}:</label>

                <input

                    className='bg-slate-700 border border-slate-600 text-slate-100 focus:ring-emerald-500 p-1 rounded shadow'
                    name={name}
                    id={name}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    min={min}
                    max={max}
                    step={step}

                />
            </div>
        )
    }

export default Input