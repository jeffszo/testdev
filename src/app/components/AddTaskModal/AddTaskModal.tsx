"use client";

import Modal from "../Modal/Modal";
import styles from "./AddTaskModal.module.scss";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  newTaskName: string;
  setNewTaskName: (name: string) => void;
  onAddTask: () => void;
}


export default function AddTaskModal ({isOpen, onClose, newTaskName, setNewTaskName, onAddTask}) : AddTaskModalProps {
    return (


     <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.modalAdd}>
        <h2>Nova tarefa</h2>
        <label>
          Título
          <input 
            className={styles.input}
            type="text" 
            placeholder='Digite' 
            value={newTaskName} 
            onChange={(e) => setNewTaskName(e.target.value)} 
          />
        </label>
        <div className={styles.containerBtn}> 
          <button onClick={onClose}>Cancelar</button>
          <button onClick={onAddTask}>Adicionar</button>
        </div>
      </div>
    </Modal>
    )
}