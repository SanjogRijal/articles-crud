import { EventEmitter } from 'typeorm/platform/PlatformTools';

const eventEmitter = new EventEmitter();

export function loggedInEvent(callbackFunctions: VoidFunction[]) {
  eventEmitter.on('loggedIn', () => {
    callbackFunctions.forEach((callbackFunction: VoidFunction) => {
      callbackFunction();
    });
  });
}

export function loggedOutEvent(callbackFunctions: VoidFunction[]) {
  eventEmitter.on('logout', () => {
    callbackFunctions.forEach((callbackFunction: VoidFunction) => {
      callbackFunction();
    });
  });
}
