import { TodoItem } from "./todoitem";
import { Dispatcher, Store } from "./simpledux";
import * as Events from "./events";
import { Services } from "./services";

export class TodoListStore
{
    private the_list: Array<TodoItem>;

    constructor()
    {
        Dispatcher.addCallback("add todo item", this.addTodoItem);

        this.the_list = Store.GetPersistentStore<Services>("services").GetTodoListFromDB();
    }

    public getTodoList(): Array<TodoItem>
    {
        return this.the_list;
    }

    private addTodoItem = (addTodoEvent: Events.AddTodoItemEvent) =>
    {
        this.the_list.push(addTodoEvent.item);
        Dispatcher.injectEvent(new Events.UpdateDBNewTodo(addTodoEvent.item));
        Dispatcher.injectEvent(new Events.GenericEvent("todo list updated"));
    }
}
