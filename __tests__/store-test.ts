import SimpleDux from "../src/index";

it("Successfully register a persistent store and retrieve it", () =>
{
    let simple_dux = new SimpleDux();
    let store = simple_dux.Store;

    class Person
    {
        public name = "greg";
    }

    let greg: Person = { name: "greg" };
    store.RegisterPersistentStore(greg, "greg");

    let greg2 = store.GetPersistentStore("greg");

    expect(greg2).toEqual(greg);
});

it("Deregister a persistent store and cant retrieve it", () =>
{
    let simple_dux = new SimpleDux();
    let store = simple_dux.Store;

    class Person
    {
        public name = "greg";
    }

    let greg: Person = { name: "greg" };
    store.RegisterPersistentStore(greg, "greg");

    store.DeregisterPersistentStore("greg");

    let greg2 = store.GetPersistentStore("greg");

    expect(greg2).toBeUndefined();
});

it("Successfully register a factory method store and retrieve it with argument", () =>
{
    let simple_dux = new SimpleDux();
    let store = simple_dux.Store;

    class Person
    {
        public name = "not-set";
        public age = 54;
        public yourmother = true;

        constructor(name: string)
        {
            this.name = name;
        }
    }

    let factory_method = (name: string) => new Person(name);

    store.RegisterScopedStore(factory_method, "greg");

    let greg = store.GetScopedStore<Person>("greg", "fredarg");

    expect(greg).toMatchSnapshot();
});

it("Deregister a factory method and retrieve with argument throws error", () =>
{
    let simple_dux = new SimpleDux();
    let store = simple_dux.Store;

    class Person
    {
        public name = "not-set";
        public age = 54;
        public yourmother = true;

        constructor(name: string)
        {
            this.name = name;
        }
    }

    let factory_method = (name: string) => new Person(name);

    store.RegisterScopedStore(factory_method, "greg");

    store.DeregisterScopedStore("greg");

    expect(() => {
        let greg = store.GetScopedStore<Person>("greg", "fredarg");
    }).toThrowError("factory method called greg is not defined");
});

it("Successfully register a factory method store and retrieve it without argument", () =>
{
    let simple_dux = new SimpleDux();
    let store = simple_dux.Store;

    class Person
    {
        public name = "not-set";
        public age = 54;
    }

    let factory_method = () => new Person();

    store.RegisterScopedStore(factory_method, "greg");

    let greg = store.GetScopedStore<Person>("greg");

    expect(greg).toMatchSnapshot();
});

it("Deregister a factory method and retrieve without argument throws error", () =>
{
    let simple_dux = new SimpleDux();
    let store = simple_dux.Store;

    class Person
    {
        public name = "not-set";
        public age = 54;
    }

    let factory_method = () => new Person();

    store.RegisterScopedStore(factory_method, "greg");

    store.DeregisterScopedStore("greg");

    expect(() => {
        let greg = store.GetScopedStore<Person>("greg");
    }).toThrowError("factory method called greg is not defined");
});