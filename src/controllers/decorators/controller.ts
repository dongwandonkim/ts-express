import 'reflect-metadata';
import { AppRouter } from '../../AppRouter';

export function controller(routePrefix: string) {
  return function (target: Function) {
    const router = AppRouter.getInstance();

    for (let key in target.prototype) {
      // looping for all available methods in Controller
      const routeHandler = target.prototype[key]; // assign method

      const path = Reflect.getMetadata('path', target.prototype, key); // get metadata
      const method = Reflect.getMetadata('method', target.prototype, key);

      if (path && method === 'get') {
        router.get(`${routePrefix}${path}`, routeHandler);
      }
    }
  };
}
