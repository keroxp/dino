// (c) 2020 Yusuke Sakurai. MIT License.
export class DI {
    constructor() {
        this.registry = new Map();
        this.flags = new Map();
        this.loaders = new Map();
    }
    get(key) {
        if (this.has(key)) {
            return this.registry.get(key);
        }
        return this.load(key);
    }
    load(key) {
        const loader = this.loaders.get(key);
        if (!loader) {
            throw new Error(`${key} is not registered`);
        }
        const val = loader();
        this.set(key, val);
        this.loaders.delete(key);
        return val;
    }
    has(key) {
        return this.flags.has(key);
    }
    set(key, value) {
        this.registry.set(key, value);
        this.flags.set(key, true);
    }
    setLazy(key, loader) {
        this.loaders.set(key, loader);
    }
    unset(key) {
        this.registry.delete(key);
        this.flags.delete(key);
    }
    reset() {
        this.registry.clear();
        this.flags.clear();
    }
}
