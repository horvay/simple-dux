declare module 'simple-dux/dispatcher' {
    type EventType = string;
    type EventCallback = (payload: IPayload) => void;
    interface IPayload
    {
        event_type: EventType;
    }
    class Dispatcher
    {
        addCallback(event_type: EventType, callback: EventCallback): void;
        addNamespaceCallback(namespace: string, callback: EventCallback): void;
        injectEvent(payload: IPayload, namespace?: string): void;
        removeNamespaceCallback(namespace: string): void;
        removeCallback(event_type: EventType): void;
    }

}
declare module 'simple-dux/store' {
    class SimpleStore
    {
        RegisterPersistentStore<T>(store: T, name: string): void;
        GetPersistentStore<T>(name: string): T;
        DeregisterPersistentStore<T>(name: string): void;
        RegisterScopedStore<T>(factory_method: (...args) => T, name: string): void;
        GetScopedStore<T>(name: string, ...args: any[]): T;
        DeregisterScopedStore<T>(name: string): void;
    }

}
declare module 'simple-dux' {
    import { Dispatcher } from 'simple-dux/dispatcher';
    export { IPayload, EventCallback, EventType } from 'simple-dux/dispatcher';
    import { SimpleStore } from 'simple-dux/store';
    export default class SimpleDux
    {
        Dispatcher: Dispatcher;
        Store: SimpleStore;
    }
}
