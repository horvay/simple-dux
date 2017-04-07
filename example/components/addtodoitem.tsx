import * as React from "react";
import { Dispatcher } from "../simpledux";
import * as Events from "../events";

export class AddTodoItem extends React.Component<{}, {}>
{
    private todo_item_text: string;
    public render()
    {
        return (
            <div>
                <label>Add: </label>
                <input type="text" value={this.todo_item_text} onChange={(e) => this.todo_item_text = e.target.value} />
                <input type="button" value="+" onClick={this.addTodoItem} />
            </div>
        );
    }

    private addTodoItem = () =>
    {
        if (!this.todo_item_text && this.todo_item_text === "")
        {
            return;
        }

        Dispatcher.injectEvent(new Events.AddTodoItemEvent({ task: this.todo_item_text }));
        this.todo_item_text = "";

        this.setState({});
    }
}
