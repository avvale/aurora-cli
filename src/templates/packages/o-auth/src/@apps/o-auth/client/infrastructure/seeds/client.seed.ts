import { OAuthClientGrantType } from '../../../../../graphql';
import { applications } from '../../../../../@apps/o-auth/application/infrastructure/seeds/application.seed';

export const clients = [
    {
        id                 : '333910d9-394b-42d7-b3e0-0c7ae7a54478',
        grantType          : OAuthClientGrantType.PASSWORD,
        name               : 'Aurora - Password Grant',
        secret             : 'om9QPNdkNJc09JgzTTwvcL4897E5EhbAGWqwkwtA',
        authUrl            : null,
        redirect           : null,
        scopes             : ['write', 'read'],
        expiredAccessToken : 3600,
        expiredRefreshToken: 7200,
        isActive           : true,
        isMaster           : true,
        applicationIds     : ['8bb03dc8-c97b-4e06-b1b0-3c62e108fd80'],
        applications, // mock related applications
    },
];