import { handleEscKey } from "./handleEscKey";

export const closeModal = () => {
  document.getElementById('modal').style.display = 'none';
  const bodyNode = document.getElementsByTagName('body');
  bodyNode[0].style.overflow = 'auto';
  document.removeEventListener('keydown', handleEscKey);
};
