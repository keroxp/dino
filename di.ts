// (c) 2020 Yusuke Sakurai. MIT License.
export class DI<R> {
  private registry = new Map<keyof R, any>();
  private flags = new Map<keyof R, boolean>();
  private loaders = new Map<keyof R, () => any>();
  constructor() {}

  get<K extends Extract<keyof R, string>>(key: K): R[K] {
    if (this.has(key)) {
      return this.registry.get(key);
    }
    return this.load(key);
  }

  private load<K extends keyof R>(key: K): R[K] {
    const loader = this.loaders.get(key);
    if (!loader) {
      throw new Error(`${key} is not registered`);
    }
    const val = loader();
    this.set(key, val);
    this.loaders.delete(key);
    return val;
  }

  has<K extends keyof R>(key: K): boolean {
    return this.flags.has(key);
  }

  set<K extends keyof R>(key: K, value: R[K]): void {
    this.registry.set(key, value);
    this.flags.set(key, true);
  }

  setLazy<K extends keyof R>(key: K, loader: () => R[K]): void {
    this.loaders.set(key, loader);
  }

  unset<K extends keyof R>(key: K): void {
    this.registry.delete(key);
    this.flags.delete(key);
  }

  reset() {
    this.registry.clear();
    this.flags.clear();
  }
}
