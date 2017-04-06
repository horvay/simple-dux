import SimpleDux from "../src/index";

it('Successfully register a persistent store and retrieve it', () =>
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

it('Successfully register a factory method store and retrieve it with argument', () =>
{
    let simple_dux = new SimpleDux();
    let store = simple_dux.Store;

    class Person
    {
        public name = "not-set";
        public age = 54;

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

it('Successfully register a factory method store and retrieve it without argument', () =>
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