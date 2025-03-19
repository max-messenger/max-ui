import { ReceiveDataMap, RequestPropsMap } from './data';

export type RequestMethodName = keyof RequestPropsMap;
export type ReceivedMethodName = keyof ReceiveDataMap;

export type RequestProps<M extends RequestMethodName> = RequestPropsMap[M];
export type ReceivedData<M extends ReceivedMethodName> = ReceiveDataMap[M];

export type PromiseController<M extends ReceivedMethodName> = {
    resolve: (value: ReceivedDataWithRequestId<M>) => void;
    reject: (error: MaxBridgeErrorEvent & RequstIdProp) => void;
};

type RequstIdProp = {
    requestId?: string;
};

export type RequestPropsWithRequestId<M extends RequestMethodName> = RequestPropsMap[M] &
    RequstIdProp;
export type ReceivedDataWithRequestId<M extends ReceivedMethodName> = ReceiveDataMap[M] &
    RequstIdProp;

export interface WebViewHandler {
    postEvent: <K extends RequestMethodName>(type: K, content: string) => void;
}

export type MaxBridgeErrorEvent = {
    error: {
        error_code: number;
        error_msg: string;
    };
};

export type MaxBridgeEvent<M extends ReceivedMethodName> =
    | (MaxBridgeErrorEvent & RequstIdProp)
    | ReceivedDataWithRequestId<M>;
