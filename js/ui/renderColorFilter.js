export const renderColorFilter = (colors) => {
  const colorFilter = document.getElementById('color-filter');

  if(!colorFilter) {
    console.error('Invalid colorFilter error');
    return;
  }

  colorFilter.innerHTML = colors.map(color => `
    <div class="color-box ${color.name}" data-color="${color.name}" style="background-color: ${color.name}" tabindex="0"></div>
  `).join('');
};
