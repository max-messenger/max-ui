import { BackButton } from './backButton';
import {
    MaxBridgeEvent,
    PromiseController,
    ReceivedData,
    ReceivedMethodName,
    RequestMethodName,
    RequestProps,
    RequestPropsWithRequestId,
    WebViewHandler,
} from './types/bridge';
import { getInitData } from './utils/getInitData';
import { getInitDataUnsafe } from './utils/getInitDataUnsafe';

type EventHandler<T> = (data: T) => void;

const REJECT_TIMEOUT = 10_000;

const MAX_URL_REGEXP = /^https:\/\/.*\.(?:max|oneme)\.ru$/
export class WebApp {
    private eventHandlers: Map<ReceivedMethodName, Set<EventHandler<any>>> = new Map();
    // Храним запросы, ожидающие ответа
    private pendingRequests: Map<string, PromiseController<any>> = new Map();
    private readonly webviewBridge: WebViewHandler | undefined;

    public BackButton;

    constructor() {
        // Прослушивание сообщений от родительского окна
        if (this.isIframe()) {
            window.addEventListener('message', async (event: MessageEvent) => {
                if (!MAX_URL_REGEXP.test(event.origin) || typeof event.data !== 'string') {
                    return;
                }

                try {
                    const { type, ...content } = JSON.parse(event.data);
                    if (type?.startsWith('WebApp')) {
                        await this.receiveEvent(type, content);
                    }
                } catch (e) {
                    console.error('Ошибка при обработке сообщения:', e);
                }
            });
        } else {
            this.webviewBridge = window.WebViewHandler;
        }

        this.BackButton = new BackButton({
            postBackButtonEvent: (isVisible) =>
                this.postEvent('WebAppSetupBackButton', { isVisible }),
            onClick: (callback) => this.onEvent('WebAppBackButtonPressed', callback),
            offClick: (callback) => this.offEvent('WebAppBackButtonPressed', callback),
        });
    }

    get initData() {
        return getInitData();
    }

    get initDataUnsafe() {
        return getInitDataUnsafe(this.initData);
    }

    private isIframe(): boolean {
        return window.self !== window.top;
    }

    /**
     * Стандартная отправка событий (без ожидания ответа)
     */
    private postEvent<K extends RequestMethodName>(
        type: K,
        content: RequestProps<K> = {} as RequestProps<K>,
        callback?: () => void,
    ): void {
        this.sendEventByClientType(type, content);
        callback?.();
    }

    /**
     * Отправка события с ожиданием ответа
     */
    private postEventAsync<K extends RequestMethodName>(
        type: K,
        content: RequestProps<K> = {} as RequestProps<K>,
    ): Promise<K extends ReceivedMethodName ? ReceivedData<K> : void> {
        return new Promise((resolve, reject) => {
            const requestId = crypto.randomUUID();

            // Сохраняем res и rej функции, которые будут вызваны при получении ответа
            this.pendingRequests.set(requestId, { resolve, reject });

            this.sendEventByClientType(type, { ...content, requestId });

            setTimeout(reject, REJECT_TIMEOUT);
        });
    }

    /**
     * Отправка события в зависимости от типа
     */
    private sendEventByClientType<K extends RequestMethodName>(
        type: K,
        content: RequestPropsWithRequestId<K>,
    ): void {
        if (this.isIframe()) {
            window.parent.postMessage(JSON.stringify({ type, ...content }), '*');
        } else if (this.webviewBridge) {
            this.webviewBridge.postEvent(type, JSON.stringify(content));
        }
    }

    /**
     * Обработка полученного события
     */
    private async receiveEvent<K extends ReceivedMethodName>(
        type: K,
        { requestId, ...response }: MaxBridgeEvent<K>,
    ): Promise<void> {
        if (requestId && 'error' in response) {
            // Ошибка в ответа на запрос
            console.log(`[WebApp] Получена ошибка: ${type}`, response);
            this.pendingRequests.get(requestId)?.reject(response);
            this.pendingRequests.delete(requestId);
        } else if (requestId && !('error' in response)) {
            // Это ответ на запрос, вызываем колбэк
            console.log(`[WebApp] Получено событие: ${type}`, response);
            this.pendingRequests.get(requestId)?.resolve(response);
            this.pendingRequests.delete(requestId);
        } else {
            // Обычное событие
            const typeHandlers = this.eventHandlers.get(type);

            typeHandlers?.forEach((handler) => {
                try {
                    handler(response);
                } catch (e) {
                    console.error(`Ошибка в обработке события "${type}":`, e);
                }
            });
        }
    }

    /**
     * Функция, которую используют нативные клиенты для отправки ответа
     */
    public async sendEvent<K extends ReceivedMethodName>(
        type: K,
        content: string = '{}',
    ): Promise<void> {
        try {
            this.receiveEvent(type, JSON.parse(content));
        } catch (e) {
            console.warn(e);
        }
    }

    /**
     * Подписка на событие с использованием колбэка
     */
    public onEvent<K extends ReceivedMethodName>(
        type: K,
        callback: EventHandler<ReceivedData<K>>,
    ): () => void {
        let typeHandlers = this.eventHandlers.get(type);
        if (!typeHandlers) {
            typeHandlers = new Set<EventHandler<ReceivedData<K>>>();
            this.eventHandlers.set(type, typeHandlers);
        }
        typeHandlers.add(callback);

        return () => {
            this.offEvent(type, callback);
        };
    }

    /**
     * Удаление подписки на событие
     */
    private offEvent<K extends ReceivedMethodName>(
        type: K,
        callback: EventHandler<ReceivedData<K>>,
    ): void {
        const typeHandlers = this.eventHandlers.get(type);
        if (typeHandlers) {
            typeHandlers.delete(callback);
            if (typeHandlers.size === 0) {
                this.eventHandlers.delete(type);
            }
        }
    }

    /**
     * Закрытие приложения
     */
    public close(): void {
        this.postEvent('WebAppClose', {}, () => {
            console.log('Приложение закрыто');
        });
    }

    /**
     * Инициализация WebApp API
     */
    public ready(): void {
        this.postEvent('WebAppReady', {}, () => {
            console.log('WebApp готово к работе');
        });
    }

    /**
     * Запрос номера телефона
     */
    public requestContact() {
        return this.postEventAsync('WebAppRequestPhone');
    }

    /**
     * Подтверждать закрытие миниаппа с помощью всплывающего окна
     */
    public enableClosingConfirmation() {
        this.postEvent('WebAppSetupClosingBehavior', { needConfirmation: true });
    }

    /**
     * Отключение подтверждения закрытия миниаппа
     */
    public disableClosingConfirmation() {
        this.postEvent('WebAppSetupClosingBehavior', { needConfirmation: false });
    }

    /**
     * Открытие ссылки во внешнем браузере
     */
    public openLink(url: string) {
        this.postEvent('WebAppOpenLink', { url });
    }
}
