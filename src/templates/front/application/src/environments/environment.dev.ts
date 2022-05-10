export const environment = {
    production: true,
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
        applicationCode  : '',
        applicationSecret: '',
    },
};
