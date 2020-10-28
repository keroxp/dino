// (c) 2020 Yusuke Sakurai. MIT License.
export class DI<R> {
  private readonly registry = new Map<any, any>();
  constructor(parent: Map<any, any> = new Map<any, any>()) {
    this.registry = new Map<any, any>(parent.entries());
  }

  get<K extends keyof R>(key: K): R[K] {
    const val = this.registry.get(key);
    if (!val) {
      throw new Error(`${key} is not registered`);
    }
    return val;
  }

  has<K extends keyof R>(key: K): boolean {
    return this.registry.has(key);
  }

  set<K extends keyof R>(key: K, value: R[K]): void {
    this.registry.set(key, value);
  }

  unset<K extends keyof R>(key: K): void {
    this.registry.delete(key);
  }

  reset() {
    this.registry.clear();
  }

  domain(): DI<R> {
    return new DI<R>(this.registry);
  }
}
