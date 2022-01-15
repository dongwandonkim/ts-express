import 'reflect-metadata';
import express from 'express';

export const router = express.Router();

export function controller(routePrefix: string) {
  return function (target: Function) {
    for (let key in target.prototype) {
      // looping for all available methods in Controller
      const routeHandler = target.prototype[key]; // assign method

      const path = Reflect.getMetadata('path', target.prototype, key); // get metadata

      if (path) {
        router.get(`${routePrefix}${path}`, routeHandler);
      }
    }
  };
}
