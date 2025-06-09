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
    },
    appearance: {
        theme : 'theme-default',
        layout: 'classy',
    },
    msEntraId: {
        tenant     : 'a42e5409-0ade-4beb-8099-84afd4e0f1ec',
        authority  : 'https://login.microsoftonline.com/a42e5409-0ade-4beb-8099-84afd4e0f1ec',
        clientId   : '2335f98c-157c-4b47-b9a9-2460d3a6f187',
        redirectUri: 'http://localhost:4200',
        scopes     : ['api://fdd5a468-ad9f-4c84-8ef5-f8123008826c/access_as_user'],
    },
};
