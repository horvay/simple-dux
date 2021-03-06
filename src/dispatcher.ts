export type EventType = string;
export type EventCallback = (payload: IPayload) => void;

export interface IPayload
{
    event_type: EventType;
}

export default class Dispatcher
{
    private callbacks: { [id: string]: Array<EventCallback> } = {};
    private namespace_callbacks: { [id: string]: Array<EventCallback> } = {};

    /**
      * Adds a callback to be ran for a certain event.
      */
    public addCallback(event_type: EventType, callback: EventCallback)
    {
        if (!this.callbacks[event_type])
        {
            this.callbacks[event_type] = new Array<EventCallback>();
        }

        this.callbacks[event_type].push(callback);
    }

    public addNamespaceCallback(namespace: string, callback: EventCallback)
    {
        if (!this.namespace_callbacks[namespace])
        {
            this.namespace_callbacks[namespace] = new Array<EventCallback>();
        }

        this.namespace_callbacks[namespace].push(callback);
    }

    /**
      * Sends an event into the dipatcher to be ran by the callbacks.
      */
    public injectEvent(payload: IPayload, namespace?: string)
    {
        if (namespace)
        {
            const ns_callbacks_for_event = this.namespace_callbacks[namespace];

            if (ns_callbacks_for_event)
            {
                ns_callbacks_for_event.forEach(c => c(payload));
            }
        }

        const callbacks_for_event = this.callbacks[payload.event_type];

        if (callbacks_for_event)
        {
            callbacks_for_event.forEach(c => c(payload));
        }
    }

    public removeNamespaceCallback(namespace: string, callback: EventCallback)
    {
        let ns_array = this.namespace_callbacks[namespace];
        for (let i = 0; i < ns_array.length; i++)
        {
            if (ns_array[i] === callback)
            {
                this.namespace_callbacks[namespace].splice(i, 1);
                return;
            }
        }
    }

    public removeCallback(event_type: EventType, callback: EventCallback)
    {
        let cb_array = this.callbacks[event_type];
        for (let i = 0; i < cb_array.length; i++)
        {
            if (cb_array[i] === callback)
            {
                this.callbacks[event_type].splice(i, 1);
                return;
            }
        }
    }
}
