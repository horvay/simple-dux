import * as React from "react";
import * as ReactDom from "react-dom";
import { TodoListStore } from "./todoliststore";
import { TodoList } from "./components/todolist";
import { AddTodoItem } from "./components/addtodoitem";
import { Services } from "./services";
import { Store } from "./simpledux";

class App extends React.Component<{}, {}>
{
    constructor()
    {
        super();

        Store.RegisterPersistentStore(new Services(), "services");
        Store.RegisterPersistentStore(new TodoListStore(), "todo list store");
    }

    public render()
    {
        return (
            <div>
                "Here are your todo items"
                <TodoList />
                <AddTodoItem />
            </div>
        );
    }
}

ReactDom.render(<App />, document.getElementById("container"));
