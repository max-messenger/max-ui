import { WebApp } from '../bridge';
import type { WebViewHandler } from './bridge.ts';

declare global {
    interface Window {
        WebApp: WebApp;
        WebViewHandler: WebViewHandler;
    }
}

export {};
