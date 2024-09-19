import styles from '../sass/header.module.scss'
import Image from 'next/image'
import Logo from '../public/logo.svg'

export default function Header () {
    return (
        <header className={styles.container}>
            <div className={styles.containerLogo}>
                <Image src={Logo} height={35} width={35} alt='Logo'/>
                <p className={styles.textLogo}>FocalPoint</p>
            </div>
            <h3 className={styles.title}>Bem-vindo de volta, Marcus</h3>
            <p className={styles.paragraph}>Segunda, 01 de dezembro de 2025</p>
        </header>
    )
}