export const renderColorFilter = (colors) => {
  const colorFilter = document.getElementById('color-filter');

  colorFilter.innerHTML = colors.map(color => `
    <div class="color-box ${color.name}" data-color="${color.name}" style="background-color: ${color.name}" tabindex="0"></div>
  `).join('');
};
