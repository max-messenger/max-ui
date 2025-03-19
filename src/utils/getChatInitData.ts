import { Chat } from 'src/types/data';

export const getChatInitData = (chatString: string): Chat | undefined => {
    try {
        const chatRawData: Chat = JSON.parse(chatString);

        if (chatRawData && typeof chatRawData === 'object') {
            return {
                id: chatRawData.id,
                type: chatRawData.type,
            };
        }
    } catch (e) {
        console.warn(e);
    }

    return undefined;
};
