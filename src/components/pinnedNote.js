import { createCustomElement } from '../utils/utils';
import { updateNote } from '../main';
import { printAlert } from './removalAlert';

export function createNote(id, content) {
  const actions = `
  <div class="mt-3 flex w-full items-center justify-end gap-x-4">
    <button id="copy-content" class="focus:outline-none" tabindex="-1">
      <svg
        class="h-7 w-7 fill-current text-slate-500 transition-colors duration-200 hover:text-teal-500 sm:h-6 sm:w-6"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512">
        <path
        d="M224 0c-35.3 0-64 28.7-64 64V288c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H224zM64 160c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H288c35.3 0 64-28.7 64-64V384H288v64H64V224h64V160H64z" />
      </svg>
    </button>
    <button id="delete-note" class="focus:outline-none" tabindex="-1">
      <svg
        class="h-7 w-7 fill-current text-slate-500 transition-colors duration-200 hover:text-teal-500 sm:h-6 sm:w-6"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512">
        <path
        d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
      </svg>
    </button>
  </div>
  `;

  const actionsContainer = createCustomElement('div', {}, [actions]);

  const texArea = createCustomElement(
    'textarea',
    {
      class: 'pinned-note__textarea',
      spellcheck: false,
      placeholder: '📌 Write here!',
    },
    []
  );

  const noteElement = createCustomElement(
    'div',
    {
      class: 'pinned-note',
    },
    [texArea, actionsContainer]
  );

  texArea.value = content;
  texArea.addEventListener('change', () => updateNote(id, texArea.value));

  actionsContainer.querySelector('#copy-content').addEventListener('click', () => {
    let textContent = texArea.value;
    navigator.clipboard
      .writeText(textContent)
      .then()
      .catch(e => console.error(e));
  });

  actionsContainer.querySelector('#delete-note').addEventListener('click', () => printAlert(id, noteElement));

  return noteElement;
}
