// Catches all primitve types
type Primitive = string | number | boolean | null | undefined;

// Table data
export type TableData = {
    [key: string]: Primitive;
};

// Represents function that standard .sort() method accepts
export type SortableFunction<T> = ((a: T, b: T) => number) | undefined

// Todo sorting entry
export interface SortableEntry<T> {
    [key: string]: true | SortableFunction<T>
}

// Todo sorting config
export type SortableConfig<T> = true | SortableEntry<T>