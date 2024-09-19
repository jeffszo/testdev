
import Image from "next/image"
import styles from "../sass/modal.module.scss"
import Button from "./Button"
import IconDelete from "../public/delete-icon.svg"





export default function ModalHome() {


    return (
        <div className={styles.fullscreen}>
            <div className={styles.containermodal}>
                <div>
                    <h6>Suas tarefas de hoje</h6>
                </div>
                <div className={styles.containertasks}>
                    <div className={styles.containertodo}>
                        <div className={styles.containercheck}>
                            <input type="checkbox" name="opcao" value="opcao1" />
                            <span>Lavar as mãos</span>
                        </div>
                        <Image src={IconDelete} alt='Logo' height={22} width={22}/>
                    </div>
                    <div className={styles.containertodo}>
                         <div className={styles.containercheck}>
                            <input type="checkbox" name="opcao" value="opcao1" />
                            <span>Lavar as mãos</span>
                        </div>
                        <Image src={IconDelete} alt='Logo' height={22} width={22}/>
                    </div>
                    <div className={styles.containertodo}>
                        <div className={styles.containercheck}>
                            <input type="checkbox" name="opcao" value="opcao1" />
                            <span>Lavar as mãos</span>
                        </div>
                        <Image src={IconDelete} alt='Logo' height={22} width={22}/>
                    </div>
                </div>

                <div className={styles.containerdone}>
                    <h6>Tarefas finalizadas</h6>
                    

                </div>

                <div>
                    <Button/>
                </div>
            </div>
        </div>
    )
}