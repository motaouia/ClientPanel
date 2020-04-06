// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //contnet of firebaseConfig
    firebase : {
    apiKey: "XXXXXXX",
    authDomain: "clientpanelprod-a63fa.firebaseapp.com",
    databaseURL: "https://clientpanelprod-a63fa.firebaseio.com",
    projectId: "clientpanelprod-a63fa",
    storageBucket: "clientpanelprod-a63fa.appspot.com",
    messagingSenderId: "XXXXXXX",
    appId: "XXXXXXX",
    measurementId: "XXXXXXX"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
