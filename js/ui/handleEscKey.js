import { closeModal } from "./closeModal";

export const handleEscKey = (event) => {
  if(!event) {
    console.error('Invalid event error');
    return;
  }

  if (event.key === 'Escape') {
    closeModal();
  }
};
