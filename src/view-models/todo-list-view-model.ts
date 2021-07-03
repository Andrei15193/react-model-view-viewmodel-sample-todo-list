import type { IObservableCollection, IReadOnlyObservableCollection } from "react-model-view-viewmodel";
import { observableCollection, ViewModel } from "react-model-view-viewmodel";
import { ToDoItem } from "../models/todo-item";

export class ToDoListViewModel extends ViewModel {
    private readonly _items: IObservableCollection<ToDoItem> = observableCollection<ToDoItem>();

    public get items(): IReadOnlyObservableCollection<ToDoItem> {
        return this._items;
    }

    public load(): void {
        const todoItems: ToDoItem[] = JSON.parse(localStorage.getItem("todo-items") || "[]");
        this._items.reset(...todoItems);
    }
}