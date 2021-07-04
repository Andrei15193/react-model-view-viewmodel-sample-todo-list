import React, { useCallback, useEffect, useRef, useState } from "react";
import { watchEvent, watchViewModel } from "react-model-view-viewmodel";
import { EditToDoItemViewModel } from "../view-models/edit-todo-item-view-model";
import { ToDoItemForm } from "./todo-item-form";

export interface IEditToDoItemFormProps {
    readonly itemIndex: number;
    readonly onSave?: () => void;
    readonly onDelete?: () => void;
    readonly onCancel?: () => void;
}

export function EditToDoItemForm({ itemIndex, onSave, onDelete, onCancel }: IEditToDoItemFormProps): JSX.Element {
    const { current: viewModel } = useRef(new EditToDoItemViewModel());

    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    const editCallback = useCallback(() => { viewModel.save(); }, []);
    const deleteCallback = useCallback(() => { viewModel.delete(); }, []);
    const cancelCallback = useCallback(() => { onCancel && onCancel(); }, []);
    const showDeleteConfirmationCallback = useCallback(() => setShowDeleteConfirmation(true), []);
    const hideDeleteConfirmationCallback = useCallback(() => setShowDeleteConfirmation(false), []);

    watchEvent(viewModel.saved, () => { onSave && onSave(); });
    watchEvent(viewModel.deleted, () => { onDelete && onDelete(); });

    watchViewModel(viewModel.form);

    useEffect(() => { viewModel.load(itemIndex) }, [itemIndex]);

    return (
        <>
            <ToDoItemForm form={viewModel.form} />
            {
                !showDeleteConfirmation && <div>
                    <button onClick={editCallback} disabled={viewModel.form.isInvalid}>Edit</button>
                    <button onClick={cancelCallback}>Cancel</button>
                    <button onClick={showDeleteConfirmationCallback}>Delete</button>
                </div>
            }
            {
                showDeleteConfirmation && <div>
                    <p>Deleting an item is permanent, please confirm your action.</p>
                    <button onClick={deleteCallback}>Delete</button>
                    <button onClick={hideDeleteConfirmationCallback}>Cancel</button>
                </div>
            }
        </>
    );
}