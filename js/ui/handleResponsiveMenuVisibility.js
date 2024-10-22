export const handleResponsiveMenuVisibility = () => {
  const filtersNode = document.getElementById('filters');
  const closeFiltersTrigger = document.getElementById('close-filters');

  filtersNode.style.display = 'flex';
  closeFiltersTrigger.addEventListener('click', () => {
    filtersNode.style.display = 'none';
  });
};