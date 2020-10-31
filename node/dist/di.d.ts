export declare class DI<R> {
    private registry;
    private flags;
    private loaders;
    constructor();
    get<K extends Extract<keyof R, string>>(key: K): R[K];
    private load;
    has<K extends keyof R>(key: K): boolean;
    set<K extends keyof R>(key: K, value: R[K]): void;
    setLazy<K extends keyof R>(key: K, loader: () => R[K]): void;
    unset<K extends keyof R>(key: K): void;
    reset(): void;
}
