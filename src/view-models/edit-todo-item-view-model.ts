import type { IEvent } from "react-model-view-viewmodel";
import { DispatchEvent, ViewModel } from "react-model-view-viewmodel";
import { ToDoItem } from "../models/todo-item";
import { ToDoItemFormViewModel } from "./todo-item-form-view-model";

export class EditToDoItemViewModel extends ViewModel {
    private _itemIndex: number | undefined = undefined;
    private readonly _saved: DispatchEvent = new DispatchEvent();
    private readonly _deleted: DispatchEvent = new DispatchEvent();

    public readonly form: ToDoItemFormViewModel = new ToDoItemFormViewModel();

    public get saved(): IEvent {
        return this._saved;
    }
    
    public get deleted(): IEvent {
        return this._deleted;
    }

    public load(itemIndex: number): void {
        const todoItems: ToDoItem[] = JSON.parse(localStorage.getItem("todo-items") || "[]");
        const todoItem = todoItems[itemIndex];
        if (todoItem) {
            this._itemIndex = itemIndex;
            this.form.description.initialValue = this.form.description.value = todoItem.description;
            this.form.state.initialValue = this.form.state.value = todoItem.state;
        }
    }

    public save(): void {
        if (this._itemIndex !== undefined) {
            const updatedToDoItem = new ToDoItem(this.form.description.value, this.form.state.value);
            const todoItems: ToDoItem[] = JSON.parse(localStorage.getItem("todo-items") || "[]");
            todoItems[this._itemIndex] = updatedToDoItem;
            localStorage.setItem("todo-items", JSON.stringify(todoItems));

            this._saved.dispatch(this);
        }
    }

    public delete(): void {
        if (this._itemIndex !== undefined) {
            const todoItems: ToDoItem[] = JSON.parse(localStorage.getItem("todo-items") || "[]");
            todoItems.splice(this._itemIndex, 1);
            localStorage.setItem("todo-items", JSON.stringify(todoItems));

            this._deleted.dispatch(this);
        }
    }
}