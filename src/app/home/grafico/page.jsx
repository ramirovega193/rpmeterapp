'use client'
import Grafico from "@/app/components/graficos/grafico";
import { useState, useEffect } from "react";
import style from './grafico.module.css'

export default function GraficoPage(){

    const [fetchData , setData] = useState()
    const [torqueArray, setTorque] = useState()
    const [potenciaArray, setPotencia] = useState()
    const [rpmArray, setRpm] = useState()
    const [chartData, setChartData] = useState()
    let datos 


    useEffect(() => {
        fetch('http://127.0.0.1:8000/resultados')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
               setData(data.resultados);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);


    useEffect(()=>{

      if(fetchData){
        datos = fetchData
        var torque = []
        var potencia = []
        var rpm  = []

       datos.forEach((item) =>{
      
        
       torque.push(item.torque);
       potencia.push(item.potencia);
       rpm.push(item.rpm);
    })

      setTorque(torque)
      setPotencia(potencia)
      setRpm(rpm)
    
    }
    },[fetchData])


    useEffect(()=>{

      if(rpmArray && potenciaArray && torqueArray){
      setChartData({

        labels: rpmArray,
        datasets: [{
          label : "Potencia (HP)",
          data : potenciaArray,
          backgroundColor: ["red"],
          borderWidth: 2,
          fill: false,
          tension: 0.4
    
        },     
        {label : "Torque",
        data : torqueArray,
        backgroundColor: ["black"],
        borderWidth: 2,
        fill: false,
        tension: 0.4
      }
      ]
    
      })


    }},[torqueArray, potenciaArray,rpmArray])

    return<>
    
      
      <div className={style.contenedorGrafico}>
      {chartData ? 
      
      <Grafico datos={chartData}/>

      : 'cargando...' } 
      </div>
    </>
}