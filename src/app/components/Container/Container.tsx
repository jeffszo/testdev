"use client";

import Image from "next/image";
import styles from "./container.module.scss";
import IconDelete from "../../public/delete-icon.svg";
import Button from "../Button/Button";
import { useState } from "react";
import { Task } from '../../types/Task';
import AddTaskModal from "../AddTaskModal/AddTaskModal";
import DeleteTaskModal from "../DeleteTaskModal/DeleteTaskModal";

export default function Container() {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [newTaskName, setNewTaskName] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
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
          <h6 className={styles.titleTasks}>Suas tarefas de hoje</h6>
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
          <h6 className={styles.titleDone}>Tarefas finalizadas</h6>
          {completedTasks.map((task) => (
            <div key={task.id} className={styles.containerdone}>
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


        {/* Modal de Adicionar Tarefa */}
        <AddTaskModal 
          isOpen={showModal} 
          onClose={handleModalClose} 
          newTaskName={newTaskName} 
          setNewTaskName={setNewTaskName} 
          onAddTask={handleAddTask} 
        />

        {/* Modal de Deletar Tarefa */}
        <DeleteTaskModal 
          isOpen={showDeleteModal} 
          onClose={() => setShowDeleteModal(false)} 
          onDelete={handleRemoveTask} 
          task={taskToDelete || undefined} 
        />
      </div>

      <Button onClick={handleButtonClick}>Adicionar nova tarefa</Button>

    </div>
  );
}
