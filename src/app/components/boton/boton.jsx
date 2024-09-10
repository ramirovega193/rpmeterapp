import style from './boton.module.css'

export default function Boton({contenido, funcion}){


    return<>
    
        <button onClick={funcion} className={style.boton}>{contenido}</button>
    
    </>

}