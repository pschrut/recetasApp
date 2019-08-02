export class Category {
    id?: string;
    _name: string;
    _techName: string;

    constructor(name: string, techName: string) {
        this._name = name;
        this._techName = techName;
    }

    get name(): string {
        return this._name;
    }

    get techName(): string {
        return this._techName;
    }
}