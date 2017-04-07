declare module 'simple-dux/dispatcher' {
    export type EventType = string;
    export type EventCallback = (payload: IPayload) => void;
    export interface IPayload
    {
        event_type: EventType;
    }
    export default class Dispatcher
    {
        private callbacks;
        addCallback(event_type: EventType, callback: EventCallback): void;
        injectEvent(payload: IPayload): void;
    }

}
declare module 'simple-dux/store' {
    export default class SimpleStore
    {
        private _persist_storage;
        private _scoped_storage;
        RegisterPersistentStore<T>(store: T, name: string): void;
        GetPersistentStore<T>(name: string): T;
        RegisterScopedStore<T>(factory_method: (...args) => T, name: string): void;
        GetScopedStore<T>(name: string, ...args: any[]): T;
    }

}
declare module 'simple-dux' {
    import Dispatcher from 'simple-dux/dispatcher';
    import SimpleStore from 'simple-dux/store';
    export default class SimpleDux
    {
        Dispatcher: Dispatcher;
        Store: SimpleStore;
    }

}
