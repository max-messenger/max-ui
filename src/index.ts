import { WebApp } from './bridge';

export * from './types/bridge';
export * from './types/data';

window.WebApp = new WebApp();
