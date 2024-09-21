export interface AddTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    newTaskName: string;
    setNewTaskName: (name: string) => void;
    onAddTask: () => void;
  }