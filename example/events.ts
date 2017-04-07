import { IPayload } from "simple-dux/dispatcher";
import { TodoItem } from "./todoitem";

export class GenericEvent implements IPayload
{
    public event_type = "";

    constructor(event_type: string)
    {
        this.event_type = event_type;
    }
}

export class AddTodoItemEvent implements IPayload
{
    public event_type = "add todo item";
    public item: TodoItem;

    constructor(item: TodoItem)
    {
        this.item = item;
    }
}

export class UpdateDBNewTodo implements IPayload
{
    public event_type = "add todo item to db";
    public item: TodoItem;

    constructor(item: TodoItem)
    {
        this.item = item;
    }
}