export interface IAddTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    newTaskName: string;
    setNewTaskName: (name: string) => void;
    onAddTask: () => void;
  }