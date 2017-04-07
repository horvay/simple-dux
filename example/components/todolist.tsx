import { Dispatcher, Store } from "../simpledux";
import { TodoListStore } from "../todoliststore";
import * as React from "react";

export class TodoList extends React.Component<{}, {}>
{
    constructor() {
        super();
        // update the list whwenevr we receive an update event
        Dispatcher.addCallback("todo list updated", () => this.setState({}));
    }
    public render() {
        let latest_list = Store.GetPersistentStore<TodoListStore>("todo list store").getTodoList();

        let key = 0;
        let list_to_render = latest_list.map<JSX.Element>(
            (item) => {
                return <li key={key++}>{item.task}</li>;
            }
        );

        return (
            <ul>
                {list_to_render}
            </ul>
        );
    }

}