// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { STORAGE_KEYS } from '../app/_configs/storage_keys.config';

export const environment = {
  production: false,
  baseUrl: 'http://localhost:8080',
  bucketBaseUrl: 'https://s3-sa-east-1.amazonaws.com/curso-ionic-apf',
  STORAGE_KEYS: STORAGE_KEYS
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
