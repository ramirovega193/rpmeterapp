import stlye from './input.module.css'

export function InputSidebar({placeholder,title,id}){

    return<>
    

        <label htmlFor={id} className={stlye.label}>{title}</label>
        <input type="number" id={id} placeholder={placeholder} className={stlye.input} min={0} />

    </>

}

export function InputBottom({placeholder,id,type}){


    return<>
    
        <input type={type} id={id} placeholder={placeholder} className={stlye.inputBottom} min={0} />
        
    </>

}
export function InputUser({user,id,type}){


    return<>
    
        <input type={type} id={id} value={user} className={stlye.inputUser} readOnly/>
        
    </>

}
export function InputDate({id,date}){


    return<>
    
        <input type="date" readOnly value={date} id={id}className={stlye.inputFecha} min={0} />
    
    </>
}