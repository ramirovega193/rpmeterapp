import Boton from '../components/boton/boton'
import style from './activar.module.css'
import Link from "next/link";
import Image from 'next/image'
import { InputBottom } from '../components/input/input';

export default function activarPage(){

    return<>
    
        <div className={style.contenedor}>
            <div className={style.closeButton}>
                <Link href="/home"><button className={style.button}>X</button></Link>
            </div>  
            <div className={style.contenedorImagen}>
                <Image src="/logos/logoV2.svg" alt="logoLanding" width={400} height={150}/>
            </div>
            <div className={style.contenedorInputs}>
                <InputBottom type="text" placeholder="Introduzca su nombre" />
                <InputBottom type="password" placeholder="Introduzca su contraseña"/>
                <InputBottom type="text" placeholder="Introduzca su código de activación"/>
                <p>Si usted ya tiene su cuenta activada no es necesario que vuelva a ingresar el código</p>
            </div>
            <div className={style.contenedorBotones}>
                <Boton contenido="Iniciar sesión"/>
                <Boton contenido="Registrar mi cuenta" />
            </div>
        </div>
        
    </>

}