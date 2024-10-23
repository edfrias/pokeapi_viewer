export const renderGenderFilter = (genders) => {
  if(!genders || genders.length === 0) {
    console.error('Invalid genders error');
    return;
  }

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
