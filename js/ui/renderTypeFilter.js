export const renderTypeFilter = (types) => {
  const typeFilter = document.getElementById('type-filter');

  typeFilter.innerHTML = types.map(type => `
    <label><input type="checkbox" name="type" value="${type.name}"> ${type.name}</label>
  `).join('');
};