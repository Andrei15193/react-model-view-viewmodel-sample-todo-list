import React, { useCallback, useRef } from "react";
import { watchEvent, watchViewModel } from "react-model-view-viewmodel";
import { AddToDoItemViewModel } from "../view-models/add-todo-item-view-model";
import { ToDoItemForm } from "./todo-item-form";

export interface IAddToDoItemFormProps {
    readonly onSave?: () => void;
    readonly onCancel?: () => void;
}

export function AddToDoItemForm({ onSave, onCancel }: IAddToDoItemFormProps): JSX.Element {
    const { current: viewModel } = useRef(new AddToDoItemViewModel());

    const addCallback = useCallback(() => { viewModel.save(); }, []);
    const cancelCallback = useCallback(() => { onCancel && onCancel(); }, []);

    watchEvent(viewModel.saved, () => { onSave && onSave(); });

    watchViewModel(viewModel.form);

    return (
        <>
            <ToDoItemForm form={viewModel.form} />
            <div>
                <button onClick={addCallback} disabled={viewModel.form.isInvalid}>Add</button>
                <button onClick={cancelCallback}>Cancel</button>
            </div>
        </>
    );
}