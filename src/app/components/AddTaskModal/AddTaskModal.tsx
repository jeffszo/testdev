import Modal from "../Modal/Modal";
import styles from "./AddTaskModal.module.scss";
import {  KeyboardEvent } from 'react';


import { IAddTaskModalProps } from "@/app/models/IAddTaskModal";

export default function AddTaskModal({
  isOpen,
  onClose,
  newTaskName,
  setNewTaskName,
  onAddTask,
}: IAddTaskModalProps) {

  
  const handleAddTask = () => {
    onAddTask();
    setNewTaskName("");
  };


  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleAddTask();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.modalAdd}>
        <h2>Nova tarefa</h2>
        <label>
          Título {""}
          <input
            className={styles.input}
            type="text"
            placeholder="Digite"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </label>
        <div className={styles.containerBtn}>
          <button onClick={onClose}>Cancelar</button>
          <button onClick={handleAddTask}>Adicionar</button>
        </div>
      </div>
    </Modal>
  );
}
