export class BaseListObject {
    perLine = 5;
    perPage = 20;
}

export abstract class ListObject<T = any> extends BaseListObject {
    abstract pages(): Promise<number>;
    abstract get(page: number): Promise<T[]>;
    abstract getImage(item: T): string;
    abstract getName(item: T): string;
    abstract getDescription(item: T): string;
    abstract onItemClick(item: T): void;
}
