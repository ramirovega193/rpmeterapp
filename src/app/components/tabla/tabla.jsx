import style from './tabla.module.css'


export default function Tabla({datos}){


    return<>
    
    <ul className={style.ul}>
         <li className={style.First}>RPM</li>   
         <li className={style.First}>POTENCIA</li> 
         <li className={style.First}>TORQUE</li> 
    </ul>
    {datos.map((num) => (

        <>
        <ul className={style.ul}>
         <li className={style.rpm}>{num.rpm}</li>   
         <li className={style.potencia}>{num.potencia}</li> 
         <li className={style.torque}>{num.torque}</li> 
        </ul>
        </>
    
    
    ))}
    </>
}