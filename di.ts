// (c) 2020 Yusuke Sakurai. MIT License.
export class DI<R, K extends keyof R = keyof R> {
  private readonly registry = new Map<K, any>();
  constructor(parent: Map<K, any> = new Map<K, any>()) {
    this.registry = new Map<K, any>(parent.entries());
  }

  get(key: K): R[K] {
    const val = this.registry.get(key);
    if (!val) {
      throw new Error(`${key} is not registered`);
    }
    return val;
  }

  has(key: K): boolean {
    return this.registry.has(key);
  }

  set(key: K, value: R[K]): void {
    this.registry.set(key, value);
  }

  unset(key: K): void {
    this.registry.delete(key);
  }

  reset() {
    this.registry.clear();
  }

  domain(): DI<R> {
    return new DI<R>(this.registry);
  }
}
