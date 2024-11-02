"use client"
import { useState, useEffect } from 'react'
import style from './home.module.css'
import ReactSpeedometer from 'react-d3-speedometer'
import { InputSidebar, InputBottom, InputDate } from '../components/input/input'
import Image from 'next/image'
import Boton from '../components/boton/boton'

export default function Inicio(){

    const [rpm, setRpm] = useState(0)
    const [maxRpm, setMaxRpm] = useState(1000)
    const [grabando, setGrab] = useState(false)
    var today= new Date()
    const formattedDate = today.toISOString().split('T')[0];
    // Almanecena los responses a medida que son transmitidos en tiempo real
    const [dataStreaming, setDataStreaming] = useState([])

    // Obtener datos del streaming
    useEffect(function() {
        const fetchData = async () => {

            const datosIngresados = {
                "peso": 1,
                "radio": 12,
                "pinion_primario": 1,
                "pinion_eje": 1,
                "pinion_cambio": 1,
                "corona_primaria": 1,
                "corona_eje": 1,
                "corona_cambio": 1,
                "presion_atmosferica": 1013,
                "temperatura": 20
              };

            // La response es en streaming. Por lo cual usamos un readableStream para leer los responses
            const response = await fetch("http://127.0.0.1:8000/iniciar-grabacion", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(datosIngresados),
            });
            const reader = response.body.getReader();
            // Con TextDecoder transformamos fragmentos de bits en texto
            const decoder = new TextDecoder('utf-8');

            // CompletedData almacena todos los responses hasta el momento.
            let completedData = [];
            // PartialData almacena el response actual
            let partialData = '';

            // Manejo de las responses con reader en bucle
            while (true) {
                // value es la response, si ya no manda respuestas recibimos done
                const { value, done } = await reader.read();    

                // Done = true: Finaliza el bucle
                if (done) break;
    
                // Decodificar el fragmento recibido
                partialData += decoder.decode(value, { stream: true });
      
                // Separar por líneas (cada línea debería ser un objeto JSON independiente)
                const lines = partialData.split("\n");

                // Procesar todas las líneas menos la última (ya que podría estar incompleta)
                for (let i = 0; i < lines.length - 1; i++) {
                    try {
                        // Si no la puede convertir en json, está incompleta.
                        const parsed = JSON.parse(lines[i]);
                        // En caso de que esté completa la pushea en completedData
                        completedData.push(parsed);
                    } catch (error) {
                        console.error("Error al parsear JSON:", error);
                    }
                }

                // Mantener la última línea en `partialData` (puede estar incompleta)
                partialData = lines[lines.length - 1];

                // Actualizar el estado con los datos completados
                setDataStreaming([...completedData]);
                
            }

            // Agregar la última línea (si es un JSON válido)
            if (partialData) {
                try {
                    const parsed = JSON.parse(partialData);
                    completedData.push(parsed);
                    setDataStreaming([...completedData]);
                } catch (error) {
                    console.error("Error al parsear JSON en la última línea:", error);
                }
          
            }
                
        }
        
        if (grabando) {
            fetchData();
        }

    }, [grabando])

    //verificando datos...
    useEffect(()=>{

        if(dataStreaming.length > 0)
         setRpm(dataStreaming[dataStreaming.length-1].rpm)


    },[dataStreaming])







    const openNewWindow = () => {
        window.electron.openNewWindow(); 
      };

    const openTabla = () =>{
        window.electron.openTabla();
    }

    const pararGrabacion = () =>{
        
        setGrab(!grabando)
        //...futuro codigo
    }

    const iniciarGrabacion = () =>{

        setGrab(!grabando)
        //...futuro codigo

        // Nota de Alejo para (Vega_PHP):
        /*
            En teoría debe funcionar. Los datos se guardan en el state dataStreaming.
            Y el estado se actualiza cada vez que hay una nueva lectura.
        */
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
                    <Boton contenido="Generar tabla" funcion={openTabla} />
                    <Boton contenido="Generar Grafico" funcion={openNewWindow}/>
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
                </div>  
            </div>
        </div>
        
    )
    
}