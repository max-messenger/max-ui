import { InitData } from 'src/types/data';
import { getUserInitData } from './getUserInitData';
import { getChatInitData } from './getChatInitData';

export const getInitDataUnsafe = (initData?: string | null) => {
    const initDataUnsafe: Partial<InitData> = {};

    if (!initData) {
        return initDataUnsafe;
    }
    try {
        const decodedInitData = decodeURIComponent(initData);
        const webAppParams = new URLSearchParams(decodedInitData);

        webAppParams.forEach((value, key) => {
            switch (key) {
                case 'hash':
                case 'query_id': {
                    initDataUnsafe[key] = value;
                    break;
                }
                case 'auth_date': {
                    initDataUnsafe[key] = Number(value);
                    break;
                }
                case 'user': {
                    initDataUnsafe[key] = getUserInitData(value);
                    break;
                }
                case 'chat': {
                    initDataUnsafe[key] = getChatInitData(value);
                    break;
                }
                default:
                    console.warn(`Неизвестный параметр: ${key}`);
            }
        });
    } catch (e) {
        console.warn(e);
    }

    return initDataUnsafe;
};
