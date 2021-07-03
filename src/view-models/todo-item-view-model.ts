import { ViewModel } from "react-model-view-viewmodel";
import { ToDoItemState } from "../models/to-do-item-state";
import { ToDoItem } from "../models/todo-item";

export class ToDoItemViewModel extends ViewModel {
    private readonly _itemIndex: number;
    private _state: ToDoItemState;

    public constructor(itemIndex: number, toDoItem: ToDoItem) {
        super();
        this._itemIndex = itemIndex;
        this.description = toDoItem.description;
        this._state = toDoItem.state;
    }

    public readonly description: string;

    public get state(): ToDoItemState {
        return this._state;
    }

    public get canProgress(): boolean {
        return this._state !== ToDoItemState.Done;
    }

    public progress(): void {
        if (this.canProgress) {
            switch (this._state) {
                case ToDoItemState.ToDo:
                    this._state = ToDoItemState.InProgress;
                    this.notifyPropertiesChanged("state", "canProgress");
                    break;

                case ToDoItemState.InProgress:
                    this._state = ToDoItemState.Done;
                    this.notifyPropertiesChanged("state", "canProgress");
                    break;
            }

            const todoItems: ToDoItem[] = JSON.parse(localStorage.getItem("todo-items") || "[]");
            todoItems[this._itemIndex] = new ToDoItem(this.description, this._state);
            localStorage.setItem("todo-items", JSON.stringify(todoItems));
        }
    }
}