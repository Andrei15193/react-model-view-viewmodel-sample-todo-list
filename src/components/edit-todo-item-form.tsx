import React, { useCallback, useEffect, useRef } from "react";
import { watchEvent } from "react-model-view-viewmodel";
import { EditToDoItemViewModel } from "../view-models/edit-todo-item-view-model";
import { ToDoItemForm } from "./todo-item-form";

export interface IEditToDoItemFormProps {
    readonly itemIndex: number;
    readonly onSave?: () => void;
    readonly onCancel?: () => void;
}

export function EditToDoItemForm({ itemIndex, onSave, onCancel }: IEditToDoItemFormProps): JSX.Element {
    const { current: viewModel } = useRef(new EditToDoItemViewModel());

    const editCallback = useCallback(() => { viewModel.save(); }, []);
    const cancelCallback = useCallback(() => { onCancel && onCancel(); }, []);

    watchEvent(viewModel.saved, () => { onSave && onSave(); })

    useEffect(() => { viewModel.load(itemIndex) }, [itemIndex]);

    return (
        <>
            <ToDoItemForm form={viewModel.form} />
            <div>
                <button onClick={editCallback}>Edit</button>
                <button onClick={cancelCallback}>Cancel</button>
            </div>
        </>
    );
}