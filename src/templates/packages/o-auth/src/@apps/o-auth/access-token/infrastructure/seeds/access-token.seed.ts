/* eslint-disable quotes */
/* eslint-disable key-spacing */

export const accessTokens = [
    {
        id       : 'c2bdb79b-033e-4751-a740-a989e8e580fc',
        clientId : '333910d9-394b-42d7-b3e0-0c7ae7a54478',
        scopes   : ['write', 'read'],
        accountId: '8ed38d94-d2ba-4735-8a20-e9ed889e914f',
        token    : 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJqaXQiOiI4NTliM2Y2NC02YzhlLTQwYzUtOTQ5ZC01ZWFiYjUwMTQ0M2UiLCJhY2kiOiI5NDhhNTMwOC1hNDlkLTQyZGMtOWVhMy03NDkwZTEyMDAwMGIiLCJpc3MiOiJIYWRlcyBUZXN0aW5nIE9BdXRoIiwiaWF0IjoxNjE5NzM1MTMzLCJuYmYiOjE2MTk3MzUxMzMsImV4cCI6MTYxOTczNTczM30.JcXt2BlfsB3IXefLczSocsorpU7LwdSauK1f_dAea3vDjfmpoJtxdQHfQUSAGqseMVqZ9L1YU-uvmq-o94yLDrFKg7AdiiKCTmU-7ZnOo2tZTn81Ixjb1Bjkbb2MfJTUgG8H5asQoRpZ1liN-Cnx8IymIJRvmzukf3POgqvQU_wWgI0Yj2Pk1GKn20NNf13D5MUwy-iHrpzuIr6l2uEVCrjq7XzccSRBRa03I31ax4VbsdCwSseLswBsaWbiXRo0vAm8VNOySD1m7K8p9tKxZdUm64nx9A70fA0b73ug1nrYxaxA9bPdi6N1Ejb4IPRiJR_L7Le1wk6gGJAwPJmbyg',
        name     : 'AccessToken 01',
        isRevoked: false,
        expiresAt: '2050-01-01 00:00:00',
    },
    {
        id       : '86d096bf-7fbb-41e3-971d-207a7b4d232f',
        clientId : '333910d9-394b-42d7-b3e0-0c7ae7a54478',
        scopes   : ['write', 'read'],
        accountId: '64a99509-782c-4fac-8890-01350cf12113',
        token    : 'invalid-token',
        name     : 'AccessToken 02',
        isRevoked: false,
        expiresAt: '2050-01-01 00:00:00',
    },
];

export const accessTokensToCreate = [
    {
        id: 'b75e5845-5759-4d15-a56f-ce916252f86c',
        clientId: 'ebf8a6ab-0920-4d27-a371-128aa626b37c',
        scopes: ['write', 'read'],
        accountId: '8f500109-de04-4bb9-b4cf-8d8e5997124e',
        name: 'Access token 01',
        expiredAccessToken: 86400,
    },
    {
        id: '6c20fe90-a96d-4e9c-a9ff-1938cc99028e',
        clientId: '06e9e5e8-ac76-4e4e-8c9b-91e9729cc7cc',
        scopes: ['write', 'read'],
        accountId: '1e61a573-04af-48a6-b38b-6b7977cc5ed9',
        name: 'Access token 02',
        expiredAccessToken: 86400,
    },
    {
        id: '563292f2-6b30-4ded-8b9f-8216e2f90002',
        clientId: '00c5447f-bc81-4b77-ba85-de2ad9327eeb',
        scopes: ['write', 'read'],
        accountId: 'f45423f3-9709-4ce7-ab5a-c949782712e7',
        name: 'Access token 03',
        expiredAccessToken: 86400,
    },
    {
        id: '3641eb64-cbd1-4cb5-888d-aa641a1a16e5',
        clientId: '1f51a2bc-c41b-46ef-a384-3246dbfc456d',
        scopes: ['write', 'read'],
        accountId: '2e7972fb-30e0-46bd-a964-42017227a08f',
        name: 'Access token 04',
        expiredAccessToken: 86400,
    },
    {
        id: 'f315f218-92e1-4938-b41a-c2d768405ccf',
        clientId: '21e96fed-5132-4d2d-8b57-9b5a49210422',
        scopes: ['write', 'read'],
        accountId: 'e6b0c0c9-14e8-414c-aa44-bf157c3c2529',
        name: 'Access token 05',
        expiredAccessToken: 86400,
    },
];