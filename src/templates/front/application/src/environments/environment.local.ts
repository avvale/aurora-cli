export const environment = {
    production: false,
    debug     : true,
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
