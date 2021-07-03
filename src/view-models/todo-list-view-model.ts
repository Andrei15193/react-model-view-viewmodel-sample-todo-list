import type { IObservableCollection, IReadOnlyObservableCollection } from "react-model-view-viewmodel";
import { observableCollection, ViewModel } from "react-model-view-viewmodel";
import { ToDoItem } from "../models/todo-item";
import { ToDoItemViewModel } from "./todo-item-view-model";

export class ToDoListViewModel extends ViewModel {
    private readonly _items: IObservableCollection<ToDoItemViewModel> = observableCollection<ToDoItemViewModel>();

    public get items(): IReadOnlyObservableCollection<ToDoItemViewModel> {
        return this._items;
    }

    public load(): void {
        const todoItems: ToDoItem[] = JSON.parse(localStorage.getItem("todo-items") || "[]");
        this._items.reset(...todoItems.map((todoItem, index) => new ToDoItemViewModel(index, todoItem)));
    }
}