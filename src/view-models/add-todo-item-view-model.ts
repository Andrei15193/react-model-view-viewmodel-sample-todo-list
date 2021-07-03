import type { IEvent } from "react-model-view-viewmodel";
import { DispatchEvent, ViewModel } from "react-model-view-viewmodel";
import { ToDoItem } from "../models/todo-item";
import { ToDoItemFormViewModel } from "./todo-item-form-view-model";

export class AddToDoItemViewModel extends ViewModel {
    private readonly _saved: DispatchEvent = new DispatchEvent();

    public readonly form: ToDoItemFormViewModel = new ToDoItemFormViewModel();

    public get saved(): IEvent {
        return this._saved;
    }

    public save(): void {
        const newToDoItem = new ToDoItem(this.form.description.value, this.form.state.value);
        const todoItems: ToDoItem[] = JSON.parse(localStorage.getItem("todo-items") || "[]");
        todoItems.unshift(newToDoItem);
        localStorage.setItem("todo-items", JSON.stringify(todoItems));

        this._saved.dispatch(this);
    }
}