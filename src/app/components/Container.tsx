"use client";

import Image from "next/image";
import styles from "../sass/container.module.scss";
import IconDelete from "../public/delete-icon.svg";
import Button from "./Button";
import { useState } from "react";
import {Task} from '../types/Task';

export default function Container() {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [newTaskName, setNewTaskName] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);

  const handleButtonClick = () => {
    setShowModal(true);
    document.body.classList.add('body-blur');
  };

  const handleModalClose = () => {
    setShowModal(false);
    document.body.classList.remove('body-blur');
  };

  const handleAddTask = () => {
    if (newTaskName.trim() !== "") {
      const newTask: Task = {
        id: Date.now(), // Gerar um ID único
        title: newTaskName,
        isCompleted: false
      };
      setTasks(prevTasks => [...prevTasks, newTask]); // Atualiza a lista de tarefas
      setNewTaskName("");
      setShowModal(false);
    }
  };

  const handleConfirmDelete = (task: Task) => {
    setTaskToDelete(task);
    setShowDeleteModal(true);
  };

  const handleRemoveTask = () => {
    if (taskToDelete) {
      setTasks(prevTasks => prevTasks.filter((t) => t.id !== taskToDelete.id));
      setCompletedTasks(prevTasks => prevTasks.filter((t) => t.id !== taskToDelete.id)); // Remove da lista de tarefas finalizadas também
      setShowDeleteModal(false);
      setTaskToDelete(null);
    }
  };

  const handleToggleTask = (task: Task) => {
    if (task.isCompleted) {
      // Move tarefa de volta para a lista de tarefas pendentes
      setTasks(prevTasks => [...prevTasks, { ...task, isCompleted: false }]);
      setCompletedTasks(prevTasks => prevTasks.filter((t) => t.id !== task.id));
    } else {
      // Move tarefa para a lista de tarefas finalizadas
      setTasks(prevTasks => prevTasks.filter((t) => t.id !== task.id));
      setCompletedTasks(prevTasks => [...prevTasks, { ...task, isCompleted: true }]);
    }
  };

  return (
    <div className={styles.fullscreen}>
      <div className={styles.containermodal}>
        <div>
          <h6>Suas tarefas</h6>
          {tasks.map((task) => (
            <div key={task.id} className={styles.containertodo}>
              <div className={styles.containercheck}>
                <input 
                  checked={task.isCompleted} 
                  type="checkbox" 
                  onChange={() => handleToggleTask(task)} 
                />
                <span className={styles.taskname}>{task.title}</span>
              </div>
              <Image 
                src={IconDelete} 
                alt="Delete" 
                height={22} 
                width={22} 
                onClick={() => handleConfirmDelete(task)} 
                style={{ cursor: 'pointer' }} 
              />
            </div>
          ))}
        </div>

        <div>
          <h6>Tarefas finalizadas</h6>
          {completedTasks.map((task) => (
            <div key={task.id} className={styles.containertodo}>
              <div className={styles.containercheck}>
                <input 
                  checked 
                  type="checkbox" 
                  onChange={() => handleToggleTask(task)} 
                />
                <span className={styles.taskname}>{task.title}</span>
              </div>
              <Image 
                src={IconDelete} 
                alt="Delete" 
                height={22} 
                width={22} 
                onClick={() => handleConfirmDelete(task)} 
                style={{ cursor: 'pointer' }} 
              />
            </div>
          ))}
        </div>

        <div>
          <Button onClick={handleButtonClick}>Adicionar nova tarefa</Button>
        </div>

        {showModal && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h2>Nova tarefa</h2>
              <span>Título</span>
              <input 
                type="text" 
                placeholder='Digite' 
                value={newTaskName} 
                onChange={(e) => setNewTaskName(e.target.value)} 
              />
              <div> 
                <button onClick={handleModalClose}>Fechar</button>
                <button onClick={handleAddTask}>Adicionar</button>
              </div>
            </div>
          </div>
        )}

        {showDeleteModal && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h2>Confirmar exclusão</h2>
              <p>Tem certeza que deseja excluir a tarefa "{taskToDelete?.title}"?</p>
              <div>
                <button onClick={() => setShowDeleteModal(false)}>Cancelar</button>
                <button onClick={handleRemoveTask}>Confirmar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
