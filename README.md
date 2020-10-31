# dino 
![CI](https://github.com/keroxp/dino/workflows/CI/badge.svg)

1KB type safe DI (Dependency Injection) library for Deno/Node


## Installation

### Deno

```ts
import {DI} from "https://deno.land/x/dino@{version}/mod.ts"
```

### Node

Add configuration to `.npmrc`
```
@keroxp:registry="https://npm.pkg.github.com"
```
```bash
npm install @keroxp/dino
```

```ts
import {DI} from "@keroxp/dino"
```

## Usage

```ts
interface Deps {
  service: IService
  repository: IRepository
}
interface IService {
  send(message: string): Promise<void>
}
class Service implements IService {
  async send(message: string) {}
}
interface IRepository {
  get(key: string): string
}
class Respository implements IRepository {
  get(key: string): string {
    return "value"
  }
}
const di = new DI<Deps>(); // <- instantiate with dependency types
di.set("service", new Service())
di.set("repository", new Repository())

const service = di.get("service"); 
service.send("message"); // <- type safe
const repository = di.get("repository"); 
repository.get("key"); // <- type safe

 // error (doesn't exist in Deps)
di.set("something");
di.get("anything");
```

## Lazy Loader

```ts

const di = new DI<{something: number}>()
di.setLazy("something", () => 1);
di.has("something") // false
const val = di.get("something") // 1

```
