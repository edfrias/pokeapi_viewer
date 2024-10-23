export const renderColorFilter = (colors) => {
  if(!colors || colors.length === 0) {
    console.error('Invalid colors error');
    return;
  }

  const colorFilter = document.getElementById('color-filter');

  if(!colorFilter) {
    console.error('Invalid colorFilter error');
    return;
  }

  colorFilter.innerHTML = colors.map(color => `
    <div class="color-box ${color.name}" data-color="${color.name}" style="background-color: ${color.name}" tabindex="0"></div>
  `).join('');
};
