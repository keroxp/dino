# dino
1KB type safe DI (Dependency Injection) library for Deno/Node
## Usage

```ts
import {DI} from "https://deno.land/x/dino/mod.ts"
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
