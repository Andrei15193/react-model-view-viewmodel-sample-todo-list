import type { IFormFieldViewModel } from "react-model-view-viewmodel";
import { FormFieldViewModel, registerValidators } from "react-model-view-viewmodel";
import { FormFieldCollectionViewModel } from "react-model-view-viewmodel";
import { ToDoItemState } from "../models/to-do-item-state";

export class ToDoItemFormViewModel extends FormFieldCollectionViewModel {
    public constructor() {
        super();
        registerValidators(this.description = this.addField("Description", ""), [required]);
        registerValidators(this.state = this.addField("State", ToDoItemState.ToDo), [required]);
    }

    public readonly description: FormFieldViewModel<string>;

    public readonly state: FormFieldViewModel<ToDoItemState>;
}

function required(field: IFormFieldViewModel<any>): string | undefined {
    if (field === null || field === undefined || (typeof field.value === "string" && field.value.length === 0))
        return `${field.name} field is required.`;
    else
        return undefined;
}