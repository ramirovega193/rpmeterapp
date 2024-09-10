"use client"
import { useState } from 'react'
import style from './home.module.css'
import ReactSpeedometer from 'react-d3-speedometer'
import { InputSidebar, InputBottom, InputUser, InputDate } from '../components/input/input'
import Image from 'next/image'
import Boton from '../components/boton/boton'

export default function Inicio(){

    
    const [defaultValues,setDefault] = useState({

        "pinionPrimaria": "21",
        "coronaPrimaria": "70",
        "pinionCambio": "13",
        "coronaCambio": "36",
        "pinionEje": "18",
        "coronaEje":"25"
    }) 

    const [PPActual, setPP] = useState(defaultValues.pinionPrimaria)











    const [rpm, setRpm] = useState(7000)
    const [maxRpm, setMaxRpm] = useState(10000)
    const [grabando, setGrab] = useState(false)
    var today= new Date()
    const formattedDate = today.toISOString().split('T')[0];

    const pararGrabacion = () =>{
        
        setGrab(!grabando)
        //...futuro codigo
    }

    const iniciarGrabacion = () =>{

        setGrab(!grabando)
        //...futuro codigo
    }

    return(
        <div className={style.homeContenedor}>
            <div className={style.homeArea1}>
                <div className={style.homeCuentavueltasCont}>
                    <ReactSpeedometer 

                        value={rpm}
                        minValue={0}
                        maxValue={maxRpm}
                        needleColor="#FF0000"
                        segments={4}
                        segmentColors={['black', 'black', 'black', '#FF0000']}
                        ringWidth={10}  
                        width={500}
                        height={300}                   
                    />                    
                </div>
            </div>
            <div className={style.homeArea2}>
                
                <h4 className={style.estadoGrabacion}>{grabando ? "Grabando" : "Grabación en pausa" }</h4>

                <div className={style.homeArea2bis}>
                <h3 className={style.tituloFactor}>Factor de correccion</h3>
                <InputSidebar placeholder="Por defecto: 1013 hPa" title="Presión atmosférica (hPa)" id="input1"/>
                <InputSidebar placeholder="Por defecto: 20 ºC" title="Temperatura (ºC)" id="input2"/>
                </div>

                <div className={style.botonesSidebar}>
                    <Boton contenido="Generar tabla" />
                    <Boton contenido="Generar Gragfico" />
                    {grabando ? <Boton funcion={pararGrabacion} contenido="Detener grabacion"/> : <Boton funcion={iniciarGrabacion} contenido="Iniciar grabación"/>}
   
                </div>

            </div>
            <div className={style.homeArea3}>
                <div className={style.homeImageCont}>
                    <Image width={200} height={70} src='/logos/logoWebp.webp' alt='LogoHome'/>
                </div>
                <div className={style.contenedorInputs}>
                    <div className={style.input1}>
                        <InputBottom type="text" placeholder="Nombre de la sesión" id="input3"/>
                    </div>
                    <div className={style.input2}>
                        <InputDate date={formattedDate} id="input4"/>
                    </div>
                    <div className={style.input3}>
                        <InputUser type="text" user="Example Username" id="input4"/>
                    </div>
                </div>  
            </div>
        </div>
        
    )
    
}