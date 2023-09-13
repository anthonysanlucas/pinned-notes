import { createCustomElement } from '../utils/utils';
import { deleteNote } from '../main';

const removalAlert = `
  <section
    class="mx-auto grid w-[min(95%,30rem)] max-w-[30rem] gap-y-4 rounded-lg bg-slate-900 py-8 px-6 text-center shadow-inner shadow-slate-700/50 sm:text-left">
    <div class="gap-x-3 sm:flex">
      <svg
        class="mx-auto text-primary select-none sm:mx-0"
        width="40"
        height="40"
        viewBox="0 0 40 40"
        xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="#1E293B" />
        <path
          d="M8 29L20 5L32 29H8ZM10.8364 27.1053H29.1636L20 8.78947L10.8364 27.1053ZM20.1091 25.3053C20.3455 25.3053 20.5409 25.2158 20.6955 25.0368C20.85 24.8579 20.9273 24.6316 20.9273 24.3579C20.9273 24.0842 20.85 23.8579 20.6955 23.6789C20.5409 23.5 20.3455 23.4105 20.1091 23.4105C19.8727 23.4105 19.6773 23.5 19.5227 23.6789C19.3682 23.8579 19.2909 24.0842 19.2909 24.3579C19.2909 24.6316 19.3682 24.8579 19.5227 25.0368C19.6773 25.2158 19.8727 25.3053 20.1091 25.3053ZM19.2909 21.8H20.9273V14.7263H19.2909V21.8Z"
          fill="currentColor" />
      </svg>
      <span class="text-lg text-white">
        <h3 class="font-mediun text-lg">Delete Note</h3>
        <p class="mt-2 text-base opacity-80">Are you sure you want to delete this note?</p>
      </span>
    </div>
    <div class="flex flex-col gap-2 font-semibold sm:flex-row-reverse">
      <button
        id="delete-button"
        class="h-10 w-full select-none rounded-md bg-primary px-4 py-2 font-medium text-white shadow-md shadow-primary/40 outline-none hover:bg-primary-hover focus:ring-2 focus:ring-primary-hover sm:w-28">
        Delete
      </button>
      <button
        id="cancel-button"
        class="h-10 w-full select-none rounded-md bg-neutral-200 px-4 py-2 font-medium text-neutral-900 shadow-md shadow-neutral-200/30 outline-none hover:bg-neutral-300 focus:ring-2 focus:ring-neutral-800 sm:w-28">
        Cancel
      </button>
    </div>
  </section>
`;

export function printAlert(id, element) {
  const modalContainer = createCustomElement(
    'div',
    {
      id: 'modal-container',
      class: 'modal-container',
    },
    [removalAlert]
  );

  document.body.appendChild(modalContainer);

  const deleteButton = document.getElementById('delete-button');
  const cancelButton = document.getElementById('cancel-button');
  const modal = document.getElementById('modal-container');

  deleteButton.addEventListener('click', () => {
    deleteNote(id, element);
    removeAlert();
  });

  cancelButton.addEventListener('click', () => {
    removeAlert();
  });

  modalContainer.addEventListener('click', e => {
    if (e.target === modalContainer) return removeAlert();
  });

  document.addEventListener('keydown', e => keyEvents(e.key, modal));

  function keyEvents(key, node) {
    if (key === 'Escape' && document.body.contains(node)) {
      removeAlert();
    }

    if (key === 'Enter' && document.body.contains(node)) {
      deleteNote(id, element);
      removeAlert();
    }
    return;
  }

  function removeAlert() {
    document.body.removeChild(modalContainer);
  }
}
