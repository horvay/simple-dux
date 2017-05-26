import SimpleDux from "../src/index";
import { IPayload } from "../src/dispatcher";

it("dispatch an event and retrieve it", () =>
{
    let simple_dux = new SimpleDux();
    let dispatcher = simple_dux.Dispatcher;

    class TestEvent implements IPayload
    {
        public event_type = "test event";
        public test_data = "";

        constructor(data: string)
        {
            this.test_data = data;
        }
    }

    dispatcher.addCallback("test event", (event: TestEvent) =>
    {
        expect(event).toMatchSnapshot();
    });

    dispatcher.injectEvent(new TestEvent("yo momma"));
});

it("dispatch multiple events and cascade", () =>
{
    let simple_dux = new SimpleDux();
    let dispatcher = simple_dux.Dispatcher;

    class TestEvent1 implements IPayload
    {
        public event_type = "test event";
        public test_data = "";

        constructor(data: string)
        {
            this.test_data = data;
        }
    }

    class TestEvent2 implements IPayload
    {
        public event_type = "test event 2";
        public name = "no name";

        constructor(name: string)
        {
            this.name = name;
        }
    }

    dispatcher.addCallback("test event 2", (event: TestEvent2) =>
    {
        expect(event).toMatchSnapshot();
    });

    dispatcher.addCallback("test event", (event: TestEvent1) =>
    {
        expect(event).toMatchSnapshot();

        dispatcher.injectEvent(new TestEvent2("fred"));
    });

    dispatcher.injectEvent(new TestEvent1("yo momma"));
});

it("hits callback on all namespace callbacks", () =>
{
    let simple_dux = new SimpleDux();
    let dispatcher = simple_dux.Dispatcher;

    class TestEvent1 implements IPayload
    {
        public event_type = "test event";
        public test_data = "";

        constructor(data: string)
        {
            this.test_data = data;
        }
    }

    let count = 0;

    dispatcher.addNamespaceCallback("test events", (event: IPayload) =>
    {
        count++;
        expect(event).toMatchSnapshot();
    });

    dispatcher.addNamespaceCallback("test events", (event: IPayload) =>
    {
        count++;
        expect(event).toMatchSnapshot();
    });

    dispatcher.injectEvent(new TestEvent1("yo momma"), "test events");
    expect(count).toBe(2);
});

it("dispatch an event and delete it no longer gets called", () =>
{
    let simple_dux = new SimpleDux();
    let dispatcher = simple_dux.Dispatcher;

    class TestEvent implements IPayload
    {
        public event_type = "test event";
        public test_data = "";

        constructor(data: string)
        {
            this.test_data = data;
        }
    }

    let callback_count = 0;
    let fredEvent = (event: TestEvent) => {
        callback_count++;
    };

    dispatcher.addCallback("test event", this.fredEvent);
    dispatcher.removeCallback("test event", this.fredEvent);

    dispatcher.injectEvent(new TestEvent("yo momma"));

    expect(callback_count).toBe(0);
});
