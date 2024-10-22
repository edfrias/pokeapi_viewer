import { state } from "../constants/state";

export const handleColorClick = (event) => {
  console.log('handleColorClick event', event)
  if (event.target.classList.contains('color-box')) {
    const checkIcon = `
      <svg style="pointer-events: none" height="20" width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17.837 17.837" xml:space="preserve"><path style="fill:#fff" d="M16.145 2.571a.7.7 0 0 0-.99 0L6.92 10.804l-4.241-4.27a.698.698 0 0 0-.989 0L.204 8.019a.703.703 0 0 0 0 .99l6.217 6.258a.704.704 0 0 0 .99 0L17.63 5.047a.7.7 0 0 0 0-.994l-1.485-1.482z"/></svg>
    `;

    if(event.target.classList.contains('selected')) {
      event.target.classList.remove('selected');
      event.target.innerHTML = '';
      state.selectedFilters.color = state.selectedFilters.color.filter(item => item !== event.target.dataset.color);
    } else {
      event.target.classList.add('selected');
      event.target.innerHTML = checkIcon;
      state.selectedFilters.color = Array.from(new Set([...(state.selectedFilters.color), event.target.dataset.color]));
    }
  }
};
