export declare class DI<R, K extends keyof R = keyof R> {
    private readonly registry;
    constructor(parent?: Map<K, any>);
    get(key: K): R[K];
    has(key: K): boolean;
    set(key: K, value: R[K]): void;
    unset(key: K): void;
    reset(): void;
    domain(): DI<R>;
}
