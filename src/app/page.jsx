import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <>

      <main>
        
        <div className={styles.landingContenedorFlex}>
          <div className={styles.landingContenedorImagen}>
            <Image src="/logos/logoV2.svg" alt="logoLanding" width={500} height={150} />
          </div>
          <h1 className={styles.landingTitle}>Lo que no se mide no se puede mejorar</h1>
          <div className={styles.landingContenedorBtn}>
            <Link href="/home" ><button className={styles.landingBtn}>Entrar</button></Link>
          </div>
        </div>
      </main>

    </>
  );
}
