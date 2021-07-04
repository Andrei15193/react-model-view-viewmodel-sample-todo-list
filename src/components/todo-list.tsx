import type { ChangeEventHandler } from "react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useViewModelType, watchCollection, watchViewModel } from "react-model-view-viewmodel";
import { ToDoItemState } from "../models/to-do-item-state";
import { ToDoItemViewModel } from "../view-models/todo-item-view-model";
import { ToDoListViewModel } from "../view-models/todo-list-view-model";
import { AddToDoItemForm } from "./add-todo-item-form";
import { EditToDoItemForm } from "./edit-todo-item-form";

export function ToDoList(): JSX.Element {
    const [selectedIndex, setSelectedIndex] = useState<number | undefined>(undefined);
    const [showAddForm, setShowAddForm] = useState(false);

    const viewModel = useViewModelType(ToDoListViewModel);
    watchCollection(viewModel.items);

    const showAddFormCallback = useCallback(() => { setShowAddForm(true) }, []);

    const reloadItems = useCallback(() => { setShowAddForm(false); setSelectedIndex(undefined); viewModel.load(); }, [viewModel]);

    const filterChangedCallback: ChangeEventHandler<HTMLInputElement> = useCallback(
        event => { viewModel.filter = event.target.value; },
        [viewModel]
    );

    useEffect(() => { viewModel.load(); }, []);

    if (selectedIndex !== undefined)
        return (
            <EditToDoItemForm itemIndex={selectedIndex} onSave={reloadItems} onDelete={reloadItems} onCancel={reloadItems} />
        );
    else
        return (
            <>
                <div className="form-group">
                    <input value={viewModel.filter} onChange={filterChangedCallback} />
                </div>
                {!showAddForm && <button onClick={showAddFormCallback}>Add</button>}
                {showAddForm && <AddToDoItemForm onSave={reloadItems} onCancel={reloadItems} />}
                <div className="todo-list">
                    {viewModel.items.map((item, index) => <ToDoListItem key={index} item={item} selectItem={() => setSelectedIndex(index)} />)}
                </div>
            </>
        );
}

interface IToDoListItemProps {
    readonly item: ToDoItemViewModel;

    selectItem(): void;
}

function ToDoListItem({ item, selectItem }: IToDoListItemProps): JSX.Element {
    const progressCallback = useCallback(() => item.progress(), [item]);

    watchViewModel(item);

    return (
        <div className="todo-list-item">
            <div className="todo-list-item-content">
                {item.description}
                <ToDoListItemState state={item.state} />
            </div>
            <div className="todo-list-item-actions">
                <button onClick={selectItem}>Edit</button>
                <button onClick={progressCallback} disabled={!item.canProgress}>{">"}</button>
            </div>
        </div>
    );
}

interface IToDoListItemStateProps {
    readonly state: ToDoItemState;
}

function ToDoListItemState({ state }: IToDoListItemStateProps): JSX.Element | null {
    switch (state) {
        case ToDoItemState.ToDo:
            return (
                <div className="todo-list-item-state-todo">To do</div>
            );

        case ToDoItemState.InProgress:
            return (
                <div className="todo-list-item-state-in-progress">Doing</div>
            );

        case ToDoItemState.Done:
            return (
                <div className="todo-list-item-state-done">Done</div>
            );

        default:
            return null;
    }
}