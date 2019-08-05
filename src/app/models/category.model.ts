export class Category {
    id?: string;
    name: string;
    tech_name: string;

    constructor(name: string, techName: string) {
        this.name = name;
        this.tech_name = techName;
    }

    public get techName() {
        return this.tech_name;
    }
}