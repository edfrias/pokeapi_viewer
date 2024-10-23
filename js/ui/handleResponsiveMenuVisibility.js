export const handleResponsiveMenuVisibility = () => {
  const filtersNode = document.getElementById('filters');
  const closeFiltersTrigger = document.getElementById('close-filters');

  if(!filtersNode || !closeFiltersTrigger) {
    console.error('Invalid node error');
    return;
  }

  filtersNode.style.display = 'flex';
  closeFiltersTrigger.addEventListener('click', () => {
    filtersNode.style.display = 'none';
  });
};