import { User } from 'src/types/data';

export const getUserInitData = (userString: string): Partial<User> | undefined => {
    try {
        const userRawData: Partial<User> = JSON.parse(userString);

        if (userRawData && typeof userRawData === 'object') {
            return {
                first_name: userRawData.first_name,
                last_name: userRawData.last_name,
                username: userRawData.username,
                language_code: userRawData.language_code,
                photo_url: userRawData.photo_url,
                id: Number(userRawData.id),
            };
        }
    } catch (e) {
        console.warn(e);
    }
    return undefined;
};
