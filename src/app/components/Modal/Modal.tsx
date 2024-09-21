'use client'

import { useEffect } from "react";
import styles from './modal.module.scss'
import { IModalProps } from "@/app/models/IModal";



export default function Modal ({isOpen, onClose, children}: ModalProps) {

    useEffect(() => {

        if (isOpen) {
          document.body.classList.add('body-blur');
        } else {
          document.body.classList.remove('body-blur');
        }
    
        return () => {
          document.body.classList.remove('body-blur');
        };

      }, [isOpen]);
    
      if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
    )
}