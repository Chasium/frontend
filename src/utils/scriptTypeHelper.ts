type EndWithScript<T extends string> = T extends `${string}Script` ? T : never;
type AllString<T> = T extends string ? T : never;
export type ScriptFields<T> = EndWithScript<AllString<keyof T>>;
