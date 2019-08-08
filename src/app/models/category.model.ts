export class Category {
    id?: string;
    name: string;
    tech_name: string;
    isNew: boolean;
    edited: boolean;

    constructor(name: string, techName: string, id?: string, isNew?: boolean, edited?: boolean) {
        this.id = id;
        this.name = name;
        this.tech_name = techName;
        this.isNew = isNew;
        this.edited = edited;
    }

    public get techName() {
        return this.tech_name;
    }
}