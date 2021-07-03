import type { ToDoItemState } from "./to-do-item-state";

export class ToDoItem {
    public constructor(description: string, state: ToDoItemState) {
        this.description = description;
        this.state = state;
    }

    public readonly description: string;

    public readonly state: ToDoItemState;
}