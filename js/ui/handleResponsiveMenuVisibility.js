export const handleResponsiveMenuVisibility = () => {
  const filtersNode = document.getElementById('filters');
  const closeFiltersTrigger = document.getElementById('close-filters');
  const bodyNode = document.getElementsByTagName('body');

  if(!filtersNode || !closeFiltersTrigger) {
    console.error('Invalid node error');
    return;
  }

  filtersNode.style.display = 'block';
  bodyNode[0].style.overflow = 'hidden';
  closeFiltersTrigger.addEventListener('click', () => {
    filtersNode.style.display = 'none';
    bodyNode[0].style.overflow = 'auto';
  });
};