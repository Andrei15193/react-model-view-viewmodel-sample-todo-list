import type { ChangeEventHandler } from "react";
import React, { useCallback } from "react";
import { watchViewModel } from "react-model-view-viewmodel";
import { ToDoItemState } from "../models/to-do-item-state";
import { ToDoItemFormViewModel } from "../view-models/todo-item-form-view-model";

export interface IToDoItemFormProps {
    readonly form: ToDoItemFormViewModel;
}

export function ToDoItemForm({ form }: IToDoItemFormProps): JSX.Element {
    watchViewModel(form.description);
    watchViewModel(form.state);

    const descriptionChangedCallback: ChangeEventHandler<HTMLInputElement> = useCallback(
        (event) => { form.description.value = event.target.value; },
        [form.description]
    );

    const stateChangedCallback: ChangeEventHandler<HTMLSelectElement> = useCallback(
        (event) => { form.state.value = Number(event.target.value); },
        [form.state]
    );

    return (
        <div className="form">
            <div className="form-group">
                <label htmlFor={form.description.name}>{form.description.name}</label>
                <input id={form.description.name} name={form.description.name} value={form.description.value} onChange={descriptionChangedCallback} />
                {form.description.isInvalid && <div>{form.description.error}</div>}
            </div>
            <div className="form-group">
                <label htmlFor={form.state.name}>{form.state.name}</label>
                <select id={form.state.name} name={form.state.name} value={form.state.value} onChange={stateChangedCallback}>
                    <option value={ToDoItemState.ToDo}>To do</option>
                    <option value={ToDoItemState.InProgress}>Doing</option>
                    <option value={ToDoItemState.Done}>Done</option>
                </select>
                {form.state.isInvalid && <div>{form.state.error}</div>}
            </div>
        </div>
    );
}