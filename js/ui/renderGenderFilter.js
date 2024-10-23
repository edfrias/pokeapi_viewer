export const renderGenderFilter = (genders) => {
  const genderFilter = document.getElementById('gender-filter');

  if(!genderFilter) {
    console.error('Invalid genderFilter error');
    return;
  }

  genderFilter.innerHTML = `
    ${genders.map(gender => `
      <label  tabindex="0"><input type="radio" name="gender" value="${gender.name}" tabindex="0"> ${gender.name}</label>
    `).join('')}
  `;
};
