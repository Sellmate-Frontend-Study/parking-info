import { ReactNode } from 'react';
import { createRoot } from 'react-dom/client';

export const createHTMLElementFromReactNode = (reactNode: ReactNode): HTMLElement => {
  const container = document.createElement('div');
  const root = createRoot(container);

  container.style.width = '420px';
  container.style.padding = '12px';

  root.render(reactNode);
  return container;
};