// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: true,
    debug     : false,
    api       : {
        graphql: 'http://localhost:8080/graphql',
        rest   : 'http://localhost:8080',
    },
    lang: {
        base    : 'es',
        fallback: 'es',
        langs   : ['es','en'],
    },
    oAuth: {
        applicationCode  : 'aurora',
        applicationSecret: '$2y$10$EOA/SKEwKRgHPw64kO4LZ.6oy5b8kl6JzW/mCROMfSq6S38/IiywG',
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
