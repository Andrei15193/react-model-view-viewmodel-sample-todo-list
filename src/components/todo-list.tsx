import React, { useCallback, useEffect, useRef, useState } from "react";
import { watchCollection } from "react-model-view-viewmodel";
import { ToDoItemState } from "../models/to-do-item-state";
import { ToDoItem } from "../models/todo-item";
import { ToDoListViewModel } from "../view-models/todo-list-view-model";
import { AddToDoItemForm } from "./add-todo-item-form";

export function ToDoList(): JSX.Element {
    const [showAddForm, setShowAddForm] = useState(false);

    const { current: viewModel } = useRef(new ToDoListViewModel());
    watchCollection(viewModel.items);

    const showAddFormCallback = useCallback(() => { setShowAddForm(true) }, []);

    const reloadItems = useCallback(() => { setShowAddForm(false); viewModel.load(); }, [viewModel]);

    useEffect(() => { viewModel.load(); }, []);

    return (
        <>
            {!showAddForm && <button onClick={showAddFormCallback}>Add</button>}
            {showAddForm && <AddToDoItemForm onSave={reloadItems} onCancel={reloadItems} />}
            <div className="todo-list">
                {viewModel.items.map((item, index) => <ToDoListItem key={index} item={item} />)}
            </div>
        </>
    )
}

export interface IToDoListItemProps {
    readonly item: ToDoItem;
}

function ToDoListItem({ item }: IToDoListItemProps): JSX.Element {
    return (
        <div className="todo-list-item">
            {item.description}
            <ToDoListItemState state={item.state} />
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