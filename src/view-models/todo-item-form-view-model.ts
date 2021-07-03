import type { FormFieldViewModel } from "react-model-view-viewmodel";
import { FormFieldCollectionViewModel } from "react-model-view-viewmodel";
import { ToDoItemState } from "../models/to-do-item-state";

export class ToDoItemFormViewModel extends FormFieldCollectionViewModel {
    public constructor() {
        super();
        this.description = this.addField("Description", "");
        this.state = this.addField("State", ToDoItemState.ToDo);
    }

    public readonly description: FormFieldViewModel<string>;

    public readonly state: FormFieldViewModel<ToDoItemState>;
}