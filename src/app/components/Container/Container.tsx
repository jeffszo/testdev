"use client";

import Image from "next/image";
import styles from "./container.module.scss";
import IconDelete from "../../public/delete-icon.svg";
import Button from "../Button/Button";
import { useState } from "react";
import { Task } from '../../types/Task';
import DeleteTaskModal from "../DeleteTaskModal/DeleteTaskModal";
import AddTaskModal from "../AddTaskModal/AddTaskModal";


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
        id: Date.now(), 
        title: newTaskName,
        isCompleted: false
      };
      setTasks(prevTasks => [...prevTasks, newTask]); 
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
      setCompletedTasks(prevTasks => prevTasks.filter((t) => t.id !== taskToDelete.id)); 
      setShowDeleteModal(false);
      setTaskToDelete(null);
    }
  };

  const handleToggleTask = (task: Task) => {
    if (task.isCompleted) {
      setTasks(prevTasks => [...prevTasks, { ...task, isCompleted: false }]);
      setCompletedTasks(prevTasks => prevTasks.filter((t) => t.id !== task.id));
    } else {
      setTasks(prevTasks => prevTasks.filter((t) => t.id !== task.id));
      setCompletedTasks(prevTasks => [...prevTasks, { ...task, isCompleted: true }]);
    }
  };

  return (
    <div className={styles.fullscreen}>
      
      <form className={styles.containermodal}>
        <div>
          <h6 className={styles.titleTasks}>Suas tarefas de hoje</h6>
          {tasks.map((task) => (
            <div key={task.id} className={styles.containertodo}>
              <div className={styles.containercheck}>
              
                  <input 
                  className={styles.inputtasks}
                  checked={task.isCompleted} 
                  type="checkbox" 
                  onChange={() => handleToggleTask(task)} 
                  />
              

                <p className={styles.taskname}>{task.title}</p>
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
                  className={styles.customCheckbox}
                  checked 
                  type="checkbox" 
                  onChange={() => handleToggleTask(task)} 
                />
                <p className={styles.tasknamedone}>{task.title}</p>
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

        <AddTaskModal 
          isOpen={showModal} 
          onClose={handleModalClose} 
          newTaskName={newTaskName} 
          setNewTaskName={setNewTaskName} 
          onAddTask={handleAddTask} 
        />

        <DeleteTaskModal 
          isOpen={showDeleteModal} 
          onClose={() => setShowDeleteModal(false)} 
          onDelete={handleRemoveTask} 
          task={taskToDelete || undefined} 
        />
      </form>

      <Button onClick={handleButtonClick}>Adicionar nova tarefa</Button>

    </div>
  );
}
