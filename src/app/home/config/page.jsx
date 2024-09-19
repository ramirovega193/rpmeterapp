"use client"
import Boton from '../../components/boton/boton'
import style from './config.module.css'
import Link from "next/link";
import { useState } from 'react';


export default function ConfigPage(){

    const [defaultValues,setDefault] = useState({

        "pinionPrimaria": "21",
        "coronaPrimaria": "70",
        "pinionCambio": "13",
        "coronaCambio": "36",
        "pinionEje": "18",
        "coronaEje":"25"
    }) 
    

    return<>

            
        <div className={style.contenedor}>
        <div className={style.closeButton}>
           <Link href="/home"><button className={style.button}>X</button></Link>
        </div>  
            <h2>Configuración</h2>

            <div className={style.contenedorInputs}>
                <ul>
                  <li>Relación primaria: <input className={style.input}  type="number" id='pinionPrimaria' value="21" /> <input className={style.input}  type="number" id='coronaPrimaria' value="70" /></li>
                  <li>Relación cambio: <input  className={style.input} type="number" id='pinionCambio' value="13" /> <input className={style.input} type="number" id='coronaPrimaria' value="36" /></li>
                  <li>Relación eje: <input  className={style.input} type="number" id='pinionEje' value="18" /> <input className={style.input}  type="number" id='coronaPrimaria' value="25" /></li>
                </ul>
                <ul>
                  <li>Radio rodillo: <input  className={style.inputXL} type="number" id='radioVolante' placeholder='Ingrese un valor' /></li>
                  <li>Peso rodillo: <input className={style.inputXL}  type="number" id='pesoVolante' placeholder='Ingrese un valor' /></li>
                </ul>
            </div>

            <div className={style.contenedorBotones}>

                <Boton contenido="Reestablecer los valores por defecto" /> 
                <Boton contenido="Aplicar cambios" /> 

            </div>

        </div>    
    
    </>

}