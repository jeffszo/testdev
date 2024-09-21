"use client";

import React from "react";
import Modal from "../Modal/Modal";
import styles from "./DeleteTaskModal.module.scss";
import { Task } from '../../types/Task';

interface DeleteTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  task?: Task;
}

export default function DeleteTaskModal ({isOpen, onClose, onDelete,}: DeleteTaskModalProps) {


  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.modalDelete}>
        <h2>Deletar tarefa</h2>
        <p>Tem certeza que você deseja deletar essa tarefa? </p>
        <div className={styles.containerBtn}>
          <button onClick={onClose}>Cancelar</button>
          <button onClick={onDelete}>Deletar</button>
        </div>
      </div>
    </Modal>
  );
};


