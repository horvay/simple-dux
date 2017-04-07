import { Dispatcher } from "./simpledux";
import * as Events from "./events";
import * as FakeData from "./fakedata";
import { TodoItem } from "./todoitem";

export class Services
{
    constructor()
    {
        Dispatcher.addCallback("add todo item to db", this.addTodoItemToDB);
    }

    public GetTodoListFromDB()
    {
        // act like this goes to the DB lolz
        return FakeData.todoDB.map<TodoItem>((item) => { return { task: item }; });
    }

    private addTodoItemToDB(newItemEvent: Events.UpdateDBNewTodo)
    {
        // act like this sends it to the DB :P
        FakeData.todoDB.push(newItemEvent.item.task);
    }
}