import SimpleDux from "../src/index";
import { IPayload } from "../src/dispatcher";

it('dispatch an event and retrieve it', () =>
{
    let simple_dux = new SimpleDux();
    let dispatcher = simple_dux.Dispatcher;

    class testEvent implements IPayload
    {
        event_type = "test event";
        public test_data = "";

        constructor(data: string)
        {
            this.test_data = data;
        }
    }

    dispatcher.addCallback("test event", (event: testEvent) =>
    {
        expect(event).toMatchSnapshot();
    });

    dispatcher.injectEvent(new testEvent("yo momma"));
});

it('dispatch multiple events and cascade', () =>
{
    let simple_dux = new SimpleDux();
    let dispatcher = simple_dux.Dispatcher;

    class testEvent1 implements IPayload
    {
        event_type = "test event";
        public test_data = "";

        constructor(data: string)
        {
            this.test_data = data;
        }
    }

    class testEvent2 implements IPayload
    {
        event_type = "test event 2";
        public name = "no name";

        constructor(name: string)
        {
            this.name = name;
        }
    }

    dispatcher.addCallback("test event 2", (event: testEvent2) =>
    {
        expect(event).toMatchSnapshot();
    })

    dispatcher.addCallback("test event", (event: testEvent1) =>
    {
        expect(event).toMatchSnapshot();

        dispatcher.injectEvent(new testEvent2("fred"));
    });

    dispatcher.injectEvent(new testEvent1("yo momma"));
});
