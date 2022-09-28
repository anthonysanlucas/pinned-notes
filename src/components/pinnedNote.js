import { createCustomElement } from '../utils/utils';
import { updateNote } from '../main';
import { printAlert } from './removalAlert';

export function createNote(id, content) {
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
    [texArea]
  );

  texArea.value = content;

  texArea.addEventListener('change', () => updateNote(id, texArea.value));

  texArea.addEventListener('dblclick', () => printAlert(id, noteElement));

  return noteElement;
}
