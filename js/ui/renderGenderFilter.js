export const renderGenderFilter = (genders) => {
  const genderFilter = document.getElementById('gender-filter');

  genderFilter.innerHTML = `
    <label tabindex="0"><input type="radio" name="gender" value="" tabindex="0"> All</label>
    ${genders.map(gender => `
      <label  tabindex="0"><input type="radio" name="gender" value="${gender.name}" tabindex="0"> ${gender.name}</label>
    `).join('')}
  `;
};
