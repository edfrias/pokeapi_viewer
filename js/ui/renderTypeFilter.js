export const renderTypeFilter = (types) => {
  if(!types) {
    console.error('Invalid types error');
    return;
  }

  const typeFilter = document.getElementById('type-filter');

  if(!typeFilter) {
    console.error('Invalid typeFilter error');
    return;
  }

  typeFilter.innerHTML = types.map(type => `
    <label><input type="checkbox" name="type" value="${type.name}"> ${type.name}</label>
  `).join('');
};
