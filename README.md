# **simple-dux**
I wrote this library because redux/flux/mobx was too complex for some simple projects I was working on. I needed something that did basic Inversion of Control and be able to dispatch events.

There are two concepts in simple-dux. You have the Dispatcher to inject events and register callbacks for said events.

You can put them in a seperate files like this. In the example, I put them in a ts file called simpledux.ts
```ts
import SimpleDux from "simple-dux";

let dux = new SimpleDux();

export const Dispatcher = dux.Dispatcher;
export const Store = dux.Store;
```

# **So first the Store**

As an example, in your app.tsx (or whatever), you can use it like this:
```ts
import { Store } from "./simpledux";

...

constructor()
{
    super();

    Store.RegisterPersistentStore(new Services(), "services");
    Store.RegisterPersistentStore(new TodoListStore(), "todo list store");
}
```

So that later you can access these by name:

```ts
import { Store } from "../simpledux";

...

let latest_list = Store.GetPersistentStore<TodoListStore>("todo list store").getTodoList();

```

You can also register a factory function so that when you call it from the Store, it will run the function and return the result. (Basically giving you control over the lifetime of the result.)

# **Now for the Dispatcher**

The dispatcher requires you to set up events (often called actions) and inject them into it. Then you can register callbacks to handle those events/actions when they come through the Dispatcher.

So you may have something like this to keep your own stores up to date:
```ts
import { TodoItem } from "./todoitem";
import { Dispatcher, Store } from "./simpledux";
import * as Events from "./events";

export class TodoListStore
{
    private the_list: Array<TodoItem>;

    constructor()
    {
        Dispatcher.addCallback("add todo item", this.addTodoItem);

        ...
    }

    ...

    private addTodoItem = (addTodoEvent: Events.AddTodoItemEvent) =>
    {
        this.the_list.push(addTodoEvent.item);
        Dispatcher.injectEvent(new Events.UpdateDBNewTodo(addTodoEvent.item));
        Dispatcher.injectEvent(new Events.GenericEvent("todo list updated"));
    }
}
```

You can see here that when one sends an event called "add todo item", it will run the addTodoItem function. This function then updates it's internal list, and sends off two events: one to update the DB, and one to tell react components to update their stuff.

Note that in typescript, you have to inject the proper event to add a todo item, since it is private.

See the events.ts file in the example to see how to make events.

---

Be sure to check out the example folder for a simple todo app to see how the tools work.