type FactoryMethod = (...args) => any;

export default class SimpleStore
{
    private _persist_storage: { [key: string]: any } = {};
    private _scoped_storage: { [key: string]: FactoryMethod } = {};

    /**
     * Registers an object with the store and will return the instance whenevr retrieved
     * @param store what you want to store
     * @param name the name to reference the store
     */
    public RegisterPersistentStore<T>(store: T, name: string): void
    {
        this._persist_storage[name] = store;
    }

    /**
     * Returns the instance initially stored with the given name
     * @param name the name of the object to be retrieved
     */
    public GetPersistentStore<T>(name: string): T
    {
        return this._persist_storage[name] as T;
    }

    /**
     * Deregisters an entry in the persistent store
     * @param name the name to deregister
     */
    public DeregisterPersistentStore<T>(name: string): void
    {
        delete this._persist_storage[name];
    }


    /**
     * Registers a factory method with the storer to retrieve a new instance of an object whenever retrieved
     * @param factory_method the method that will be called to create the object
     * @param name the name given to the object to be used to retrieve it.
     */
    public RegisterScopedStore<T>(factory_method: (...args) => T, name: string): void
    {
        this._scoped_storage[name] = factory_method;
    }

    /**
     * finds the factory method registered with the given name and runs it, returning the result
     * @param name the name of the object to be retrieved
     */
    public GetScopedStore<T>(name: string, ...args: any[]): T
    {
        const factory_method = this._scoped_storage[name];
        if (!factory_method)
        {
            throw `factory method called ${name} is not defined`;
        }

        return factory_method(...args) as T;
    }

    /**
     * * Deregisters an entry in the scoped store
     * @param name the name to deregister.
     */
    public DeregisterScopedStore<T>( name: string): void
    {
        delete this._scoped_storage[name];
    }
}
