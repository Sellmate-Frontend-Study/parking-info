import { ReactNode } from 'react';
import { createRoot } from 'react-dom/client';

export const createHTMLElementFromReactNode = (reactNode: ReactNode): HTMLElement => {
  const container = document.createElement('div');
  const root = createRoot(container);
  root.render(reactNode);
  return container;
};