export const closeModal = () => {
  document.getElementById('modal').style.display = 'none';
  document.removeEventListener('keydown', handleEscKey);
};
