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
        applicationSecret: '',
    },
};
