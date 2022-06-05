import type { IObservableCollection, IReadOnlyObservableCollection } from "react-model-view-viewmodel";
import { ObservableCollection, ViewModel } from "react-model-view-viewmodel";
import { ToDoItem } from "../models/todo-item";
import { ToDoItemViewModel } from "./todo-item-view-model";

export class ToDoListViewModel extends ViewModel {
    private _allItems: readonly ToDoItemViewModel[] = [];
    private _filter: string = "";
    private readonly _items: IObservableCollection<ToDoItemViewModel> = new ObservableCollection<ToDoItemViewModel>();

    public get items(): IReadOnlyObservableCollection<ToDoItemViewModel> {
        return this._items;
    }

    public get filter(): string {
        return this._filter;
    }

    public set filter(value: string) {
        if (this._filter !== value) {
            this._filter = value || "";
            this.notifyPropertiesChanged("filter");
            this._filterItems();
        }
    }

    public load(): void {
        const todoItems: ToDoItem[] = JSON.parse(localStorage.getItem("todo-items") || "[]");
        this._allItems = todoItems.map((todoItem, index) => new ToDoItemViewModel(index, todoItem));
        this._filterItems();
    }

    private _filterItems(): void {
        const filteredItems = this._filter.length === 0
            ? this._allItems
            : this._allItems.filter(item => item.description.toLocaleLowerCase().includes(this._filter.toLocaleLowerCase()));
        this._items.reset(...filteredItems);
    }
}