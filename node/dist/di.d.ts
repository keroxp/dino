export declare class DI<R> {
    private readonly registry;
    constructor(parent?: Map<any, any>);
    get<K extends keyof R>(key: K): R[K];
    has<K extends keyof R>(key: K): boolean;
    set<K extends keyof R>(key: K, value: R[K]): void;
    unset<K extends keyof R>(key: K): void;
    reset(): void;
    domain(): DI<R>;
}
