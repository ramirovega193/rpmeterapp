"use client"
import { useState, useEffect } from 'react';
import style from './tabla.module.css'
import Tabla from '@/app/components/tabla/tabla';


export default function TablaPage(){


    const [data,setData] = useState()

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

    return<>

        <div className={style.tablas}>
        
        {data ? 
            <Tabla datos={data}/>
            : 
            "cargando ..."
        }
        </div>
    
    </>

}