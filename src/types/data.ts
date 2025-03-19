export interface User {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    language_code: string;
    photo_url: string;
}

export interface Chat {
    id: number;
    type: 'DIALOG' | 'CHAT' | 'CHANNEL';
}

export interface InitData {
    query_id: string;
    auth_date: number;
    hash: string;
    user: Partial<User>;
    chat: Chat;
}

export type RequestPropsMap = {
    WebAppReady: {};
    WebAppClose: {};
    WebAppRequestPhone: {};
    WebAppSetupBackButton: { isVisible: boolean };
    WebAppSetupClosingBehavior: { needConfirmation: boolean };
    WebAppOpenLink: { url: string };
};

export type ReceiveDataMap = {
    WebAppRequestPhone: {
        phone: string;
    };
    WebAppBackButtonPressed: {};
};
