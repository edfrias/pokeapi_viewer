export const renderTypeFilter = (types) => {
  if(!types) {
    console.error('Invalid types provided');
    return;
  }

  const typeFilter = document.getElementById('type-filter');

  typeFilter.innerHTML = types.map(type => `
    <label><input type="checkbox" name="type" value="${type.name}"> ${type.name}</label>
  `).join('');
};
