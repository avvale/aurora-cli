// ignored file
import { OAuthClientGrantType } from '@api/graphql';

export const boundedContexts = [
    {
        id      : '1effdcd9-c1a0-410f-a49d-b2bf6ce34ac7',
        name    : 'OAuth',
        root    : 'o-auth',
        sort    : 30,
        isActive: true,
    },
];

export const permissions = [

    { id: '9593e97b-7871-4344-8ab1-30a68b260f88',  name: 'oAuth.access',                               boundedContextId: '1effdcd9-c1a0-410f-a49d-b2bf6ce34ac7', roleIds: []},

    { id: '5faf12a6-a7cf-431e-82ba-7afd5d2d647b',  name: 'oAuth.accessToken.access',                   boundedContextId: '1effdcd9-c1a0-410f-a49d-b2bf6ce34ac7', roleIds: []},
    { id: '207b76d5-31d6-4d21-bf24-8e71e5ff042f',  name: 'oAuth.accessToken.get',                      boundedContextId: '1effdcd9-c1a0-410f-a49d-b2bf6ce34ac7', roleIds: []},
    { id: 'a6b36557-f04d-4e3b-9074-3f87934a34b7',  name: 'oAuth.accessToken.create',                   boundedContextId: '1effdcd9-c1a0-410f-a49d-b2bf6ce34ac7', roleIds: []},
    { id: 'a7869db1-3ddd-45a9-8ac2-91501711bc28',  name: 'oAuth.accessToken.update',                   boundedContextId: '1effdcd9-c1a0-410f-a49d-b2bf6ce34ac7', roleIds: []},
    { id: '02ab3092-fe75-4189-9401-167991d5d1c9',  name: 'oAuth.accessToken.upsert',                   boundedContextId: '1effdcd9-c1a0-410f-a49d-b2bf6ce34ac7', roleIds: []},
    { id: '6d664e35-387d-40b0-a621-aca94bb796e4',  name: 'oAuth.accessToken.delete',                   boundedContextId: '1effdcd9-c1a0-410f-a49d-b2bf6ce34ac7', roleIds: []},

    { id: '41b6c788-9fd9-4698-a4c0-ac68469b1d19',  name: 'oAuth.application.access',                   boundedContextId: '1effdcd9-c1a0-410f-a49d-b2bf6ce34ac7', roleIds: []},
    { id: '8aacc44f-c850-4b16-a010-dcfcea74247f',  name: 'oAuth.application.get',                      boundedContextId: '1effdcd9-c1a0-410f-a49d-b2bf6ce34ac7', roleIds: []},
    { id: 'e3cc1a22-44d7-45b7-a8a8-369e2d959d4a',  name: 'oAuth.application.create',                   boundedContextId: '1effdcd9-c1a0-410f-a49d-b2bf6ce34ac7', roleIds: []},
    { id: '0e701ea8-3e74-49f7-9428-ed629041ec42',  name: 'oAuth.application.update',                   boundedContextId: '1effdcd9-c1a0-410f-a49d-b2bf6ce34ac7', roleIds: []},
    { id: '9c94a5da-ff66-42ec-a2b3-59cb93bb6658',  name: 'oAuth.application.upsert',                   boundedContextId: '1effdcd9-c1a0-410f-a49d-b2bf6ce34ac7', roleIds: []},
    { id: '70ba4d49-67db-419d-9b05-969c270ae473',  name: 'oAuth.application.delete',                   boundedContextId: '1effdcd9-c1a0-410f-a49d-b2bf6ce34ac7', roleIds: []},

    { id: 'c1570d84-822e-4d6c-8380-02dd72fe5c53',  name: 'oAuth.client.access',                        boundedContextId: '1effdcd9-c1a0-410f-a49d-b2bf6ce34ac7', roleIds: []},
    { id: '3ab3747c-de06-4895-9a46-48361041b11b',  name: 'oAuth.client.get',                           boundedContextId: '1effdcd9-c1a0-410f-a49d-b2bf6ce34ac7', roleIds: []},
    { id: '2738f574-b258-4967-abcb-47c7df1aa846',  name: 'oAuth.client.create',                        boundedContextId: '1effdcd9-c1a0-410f-a49d-b2bf6ce34ac7', roleIds: []},
    { id: 'cab87c84-76f8-4b47-8cb4-3ec2aed7d85d',  name: 'oAuth.client.update',                        boundedContextId: '1effdcd9-c1a0-410f-a49d-b2bf6ce34ac7', roleIds: []},
    { id: 'bc1c7f2a-cdb0-4452-a566-1a2b65c754bb',  name: 'oAuth.client.upsert',                        boundedContextId: '1effdcd9-c1a0-410f-a49d-b2bf6ce34ac7', roleIds: []},
    { id: 'e78e5f9e-8297-4d61-808b-7c5c79baa607',  name: 'oAuth.client.delete',                        boundedContextId: '1effdcd9-c1a0-410f-a49d-b2bf6ce34ac7', roleIds: []},

    { id: '53b8bb99-a4c8-4b1d-bc5d-6bd93d2cb7e1',  name: 'oAuth.refreshToken.access',                  boundedContextId: '1effdcd9-c1a0-410f-a49d-b2bf6ce34ac7', roleIds: []},
    { id: '82712131-e76f-4765-a783-bb4f34329616',  name: 'oAuth.refreshToken.get',                     boundedContextId: '1effdcd9-c1a0-410f-a49d-b2bf6ce34ac7', roleIds: []},
    { id: 'd23ffc44-6093-48d1-9239-841dcbbe393e',  name: 'oAuth.refreshToken.create',                  boundedContextId: '1effdcd9-c1a0-410f-a49d-b2bf6ce34ac7', roleIds: []},
    { id: 'e2735211-c1cc-4b4d-a30a-d8a73fb0b592',  name: 'oAuth.refreshToken.update',                  boundedContextId: '1effdcd9-c1a0-410f-a49d-b2bf6ce34ac7', roleIds: []},
    { id: '470262f9-4be0-4575-8ae7-4ee2988b63ae',  name: 'oAuth.refreshToken.upsert',                  boundedContextId: '1effdcd9-c1a0-410f-a49d-b2bf6ce34ac7', roleIds: []},
    { id: '316cca9d-408d-4012-929b-f3432b041688',  name: 'oAuth.refreshToken.delete',                  boundedContextId: '1effdcd9-c1a0-410f-a49d-b2bf6ce34ac7', roleIds: []},

    { id: '18de9544-b1c9-4b2f-b2ca-7d9848685f74',  name: 'oAuth.scope.access',                         boundedContextId: '1effdcd9-c1a0-410f-a49d-b2bf6ce34ac7', roleIds: []},
    { id: '2f641835-bd74-413f-b2bf-400676b488ef',  name: 'oAuth.scope.get',                            boundedContextId: '1effdcd9-c1a0-410f-a49d-b2bf6ce34ac7', roleIds: []},
    { id: 'ff0ddb5b-ad82-421f-9763-387c34859e70',  name: 'oAuth.scope.create',                         boundedContextId: '1effdcd9-c1a0-410f-a49d-b2bf6ce34ac7', roleIds: []},
    { id: '00b6441b-a7db-404c-8cd2-aaa2c95d0b8d',  name: 'oAuth.scope.update',                         boundedContextId: '1effdcd9-c1a0-410f-a49d-b2bf6ce34ac7', roleIds: []},
    { id: 'c628e2f9-95c1-4e77-b8d7-309e46570069',  name: 'oAuth.scope.upsert',                         boundedContextId: '1effdcd9-c1a0-410f-a49d-b2bf6ce34ac7', roleIds: []},
    { id: 'ce28ebaa-5700-4eb9-a2f2-bf06c78e9da9',  name: 'oAuth.scope.delete',                         boundedContextId: '1effdcd9-c1a0-410f-a49d-b2bf6ce34ac7', roleIds: []},

    { id: '95603abf-22d8-4fdf-9552-7b4175efd29c',  name: 'oAuth.applicationClient.access',             boundedContextId: '1effdcd9-c1a0-410f-a49d-b2bf6ce34ac7', roleIds: []},
    { id: '63f712c7-ac75-453a-88ca-325a7025ebc1',  name: 'oAuth.applicationClient.get',                boundedContextId: '1effdcd9-c1a0-410f-a49d-b2bf6ce34ac7', roleIds: []},
    { id: 'f3a8a2ed-c819-462c-8943-60f3c28138d6',  name: 'oAuth.applicationClient.create',             boundedContextId: '1effdcd9-c1a0-410f-a49d-b2bf6ce34ac7', roleIds: []},
    { id: '7817dafd-8f3d-4a9b-98a9-f0070fca5e18',  name: 'oAuth.applicationClient.update',             boundedContextId: '1effdcd9-c1a0-410f-a49d-b2bf6ce34ac7', roleIds: []},
    { id: '43dfdf63-591d-4451-b213-6f6c43778812',  name: 'oAuth.applicationClient.upsert',             boundedContextId: '1effdcd9-c1a0-410f-a49d-b2bf6ce34ac7', roleIds: []},
    { id: '75314d89-d74e-4dc7-ad40-d1b94d9f54aa',  name: 'oAuth.applicationClient.delete',             boundedContextId: '1effdcd9-c1a0-410f-a49d-b2bf6ce34ac7', roleIds: []},

];

export const applications = [
    {
        id       : '8bb03dc8-c97b-4e06-b1b0-3c62e108fd80',
        name     : 'Aurora',
        code     : 'aurora',
        secret   : '$2y$10$EOA/SKEwKRgHPw64kO4LZ.6oy5b8kl6JzW/mCROMfSq6S38/IiywG',
        isMaster : true,
        clientIds: [],
    },
];

export const clients = [
    {
        id                 : '333910d9-394b-42d7-b3e0-0c7ae7a54478',
        grantType          : OAuthClientGrantType.PASSWORD,
        name               : 'Aurora - Password Grant',
        secret             : 'om9QPNdkNJc09JgzTTwvcL4897E5EhbAGWqwkwtA',
        authUrl            : null,
        redirect           : null,
        scopeOptions       : [],
        expiredAccessToken : 3600,
        expiredRefreshToken: 7200,
        isActive           : true,
        isMaster           : true,
        applicationIds     : ['8bb03dc8-c97b-4e06-b1b0-3c62e108fd80'],
        applications, // mock related applications
    },
    {
        id                 : '4454f638-58d3-4764-8491-b35af26cfaa5',
        grantType          : OAuthClientGrantType.CLIENT_CREDENTIALS,
        name               : 'Aurora - Client Credentials',
        secret             : 'LxLh2FOxci4vxDPdY@WgkmJvC$4tkYemkGuWhqPv',
        authUrl            : null,
        redirect           : null,
        scopeOptions       : [],
        expiredAccessToken : 3600,
        expiredRefreshToken: 7200,
        isActive           : true,
        isMaster           : true,
        applicationIds     : ['8bb03dc8-c97b-4e06-b1b0-3c62e108fd80'],
        applications, // mock related applications
    },
];