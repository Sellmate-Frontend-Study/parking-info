import { ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';

export const renderToHtmlString = (component: ReactNode) => renderToString(component);

export const renderToHtmlElement = (component: ReactNode) => {
	const container = document.createElement('div');

	const root = createRoot(container);
	root.render(component);

	return container;
};
