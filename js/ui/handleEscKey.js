import { closeModal } from "./closeModal";

export const handleEscKey = (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
};
