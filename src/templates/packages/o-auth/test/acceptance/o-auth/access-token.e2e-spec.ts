/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAccessTokenRepository } from '../../../src/@apps/o-auth/access-token/domain/access-token.repository';
import { MockAccessTokenSeeder } from '../../../src/@apps/o-auth/access-token/infrastructure/mock/mock-access-token.seeder';
import { accessTokens } from '../../../src/@apps/o-auth/access-token/infrastructure/seeds/access-token.seed';
import { GraphQLConfigModule } from '../../../src/@aurora/graphql/graphql-config.module';
import { OAuthModule } from '../../../src/@api/o-auth/o-auth.module';
import * as request from 'supertest';
import * as _ from 'lodash';



// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('access-token', () =>
{
    let app: INestApplication;
    let repository: IAccessTokenRepository;
    let seeder: MockAccessTokenSeeder;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let mockData: any;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ...importForeignModules,
                OAuthModule,
                GraphQLConfigModule,
                SequelizeModule.forRootAsync({
                    imports   : [ConfigModule],
                    inject    : [ConfigService],
                    useFactory: (configService: ConfigService) =>
                    {
                        return {
                            dialect       : configService.get('TEST_DATABASE_DIALECT'),
                            storage       : configService.get('TEST_DATABASE_STORAGE'),
                            host          : configService.get('TEST_DATABASE_HOST'),
                            port          : +configService.get('TEST_DATABASE_PORT'),
                            username      : configService.get('TEST_DATABASE_USER'),
                            password      : configService.get('TEST_DATABASE_PASSWORD'),
                            database      : configService.get('TEST_DATABASE_SCHEMA'),
                            synchronize   : configService.get('TEST_DATABASE_SYNCHRONIZE'),
                            logging       : configService.get('TEST_DATABASE_LOGGIN') === 'true' ? console.log : false,
                            autoLoadModels: true,
                            models        : [],
                        };
                    },
                }),
            ],
            providers: [
                MockAccessTokenSeeder,
            ],
        })
            .compile();

        mockData        = accessTokens;
        app             = module.createNestApplication();
        repository      = module.get<IAccessTokenRepository>(IAccessTokenRepository);
        seeder          = module.get<MockAccessTokenSeeder>(MockAccessTokenSeeder);

        // seed mock data in memory database
        await repository.insert(seeder.collectionSource);

        await app.init();
    });

    test('/REST:POST o-auth/access-token/create - Got 400 Conflict, AccessTokenId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ id: null },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AccessTokenId must be defined, can not be null');
            });
    });

    test('/REST:POST o-auth/access-token/create - Got 400 Conflict, AccessTokenClientId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ clientId: null },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AccessTokenClientId must be defined, can not be null');
            });
    });

    test('/REST:POST o-auth/access-token/create - Got 400 Conflict, AccessTokenToken property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ token: null },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AccessTokenToken must be defined, can not be null');
            });
    });

    test('/REST:POST o-auth/access-token/create - Got 400 Conflict, AccessTokenIsRevoked property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ isRevoked: null },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AccessTokenIsRevoked must be defined, can not be null');
            });
    });

    test('/REST:POST o-auth/access-token/create - Got 400 Conflict, AccessTokenId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ id: undefined },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AccessTokenId must be defined, can not be undefined');
            });
    });

    test('/REST:POST o-auth/access-token/create - Got 400 Conflict, AccessTokenClientId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ clientId: undefined },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AccessTokenClientId must be defined, can not be undefined');
            });
    });

    test('/REST:POST o-auth/access-token/create - Got 400 Conflict, AccessTokenToken property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ token: undefined },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AccessTokenToken must be defined, can not be undefined');
            });
    });

    test('/REST:POST o-auth/access-token/create - Got 400 Conflict, AccessTokenIsRevoked property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ isRevoked: undefined },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AccessTokenIsRevoked must be defined, can not be undefined');
            });
    });

    test('/REST:POST o-auth/access-token/create - Got 400 Conflict, AccessTokenId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ id: '*************************************' },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AccessTokenId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST o-auth/access-token/create - Got 400 Conflict, AccessTokenClientId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ clientId: '*************************************' },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AccessTokenClientId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST o-auth/access-token/create - Got 400 Conflict, AccessTokenAccountId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ accountId: '*************************************' },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AccessTokenAccountId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST o-auth/access-token/create - Got 400 Conflict, AccessTokenName is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ name: '****************************************************************************************************************************************************************************************************************************************************************' },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AccessTokenName is too large, has a maximum length of 255');
            });
    });

    test('/REST:POST o-auth/access-token/create - Got 400 Conflict, AccessTokenIsRevoked has to be a boolean value', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ isRevoked: 'true' },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AccessTokenIsRevoked has to be a boolean value');
            });
    });
    test('/REST:POST o-auth/access-token/create - Got 400 Conflict, AccessTokenExpiresAt has to be a timestamp value', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ expiresAt: '****' },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AccessTokenExpiresAt has to be a timestamp value');
            });
    });

    test('/REST:POST o-auth/access-token/create - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token/create')
            .set('Accept', 'application/json')
            .send(mockData[0])
            .expect(409);
    });

    test('/REST:POST o-auth/access-tokens/paginate', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-tokens/paginate')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    offset: 0,
                    limit: 5,
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual({
                    total: seeder.collectionResponse.length,
                    count: seeder.collectionResponse.length,
                    rows : seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/REST:POST o-auth/access-tokens/get', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-tokens/get')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))),
                );
            });
    });

    test('/REST:POST o-auth/access-token/find - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: '6282fc20-1f44-4f79-871a-38c4ceca1ba4',
                    },
                },
            })
            .expect(404);
    });

    test('/REST:POST o-auth/access-token/create', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ id: '5b19d6ac-4081-573b-96b3-56964d5326a8' },
            })
            .expect(201);
    });

    test('/REST:POST o-auth/access-token/find', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:GET o-auth/access-token/find/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/find/753a1eb6-41da-4455-a1d7-c2fd083572b1')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:GET o-auth/access-token/find/{id}', () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT o-auth/access-token/update - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/o-auth/access-token/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ id: 'f5e01fb7-94df-4d35-b227-3e20f1c7962d' },
            })
            .expect(404);
    });

    test('/REST:PUT o-auth/access-token/update', () =>
    {
        return request(app.getHttpServer())
            .put('/o-auth/access-token/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ id: '5b19d6ac-4081-573b-96b3-56964d5326a8' },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:DELETE o-auth/access-token/delete/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/delete/33bf0f72-e3de-4948-880c-b02d3815987f')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE o-auth/access-token/delete/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/delete/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test('/GraphQL oAuthCreateAccessToken - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:OAuthCreateAccessTokenInput!)
                    {
                        oAuthCreateAccessToken (payload:$payload)
                        {
                            id
                            clientId
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
                        }
                    }
                `,
                variables:
                {
                    payload: _.omit(mockData[0], ['createdAt','updatedAt','deletedAt']),
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.response.statusCode).toBe(409);
                expect(res.body.errors[0].extensions.response.message).toContain('already exist in database');
            });
    });

    test('/GraphQL oAuthPaginateAccessTokens', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        oAuthPaginateAccessTokens (query:$query constraint:$constraint)
                        {
                            total
                            count
                            rows
                        }
                    }
                `,
                variables:
                {
                    query:
                    {
                        offset: 0,
                        limit: 5,
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.oAuthPaginateAccessTokens).toEqual({
                    total: seeder.collectionResponse.length,
                    count: seeder.collectionResponse.length,
                    rows : seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/GraphQL oAuthGetAccessTokens', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthGetAccessTokens (query:$query)
                        {
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {},
            })
            .expect(200)
            .then(res =>
            {
                for (const [index, value] of res.body.data.oAuthGetAccessTokens.entries())
                {
                    expect(seeder.collectionResponse[index]).toEqual(expect.objectContaining(_.omit(value, ['createdAt', 'updatedAt', 'deletedAt'])));
                }
            });
    });

    test('/GraphQL oAuthCreateAccessToken', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:OAuthCreateAccessTokenInput!)
                    {
                        oAuthCreateAccessToken (payload:$payload)
                        {
                            id
                            clientId
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        ...{ id: '5b19d6ac-4081-573b-96b3-56964d5326a8' },
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.oAuthCreateAccessToken).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL oAuthFindAccessToken - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindAccessToken (query:$query)
                        {
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables:
                {
                    query:
                    {
                        where:
                        {
                            id: '14a8bdbe-9295-4c95-b3d4-dc84e319a512',
                        },
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.response.message).toContain('not found');
            });
    });

    test('/GraphQL oAuthFindAccessToken', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindAccessToken (query:$query)
                        {
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables:
                {
                    query:
                    {
                        where:
                        {
                            id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        },
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.oAuthFindAccessToken.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL oAuthFindAccessTokenById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindAccessTokenById (id:$id)
                        {
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '55fa3020-fa08-44c7-8b4b-dda8f67b8cd7',
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.response.message).toContain('not found');
            });
    });

    test('/GraphQL oAuthFindAccessTokenById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindAccessTokenById (id:$id)
                        {
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.oAuthFindAccessTokenById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL oAuthUpdateAccessToken - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:OAuthUpdateAccessTokenInput!)
                    {
                        oAuthUpdateAccessToken (payload:$payload)
                        {
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        ...{ id: '53b9fe39-fdd8-4601-a037-ce70ea8e0abf' },
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.response.message).toContain('not found');
            });
    });

    test('/GraphQL oAuthUpdateAccessToken', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:OAuthUpdateAccessTokenInput!)
                    {
                        oAuthUpdateAccessToken (payload:$payload)
                        {
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        ...{ id: '5b19d6ac-4081-573b-96b3-56964d5326a8' },
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.oAuthUpdateAccessToken.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL oAuthDeleteAccessTokenById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteAccessTokenById (id:$id)
                        {
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '5eff2ece-b4f6-4ec2-8c64-c4aa05bf3cf1',
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.response.message).toContain('not found');
            });
    });

    test('/GraphQL oAuthDeleteAccessTokenById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteAccessTokenById (id:$id)
                        {
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.oAuthDeleteAccessTokenById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    afterAll(async () =>
    {
        await repository.delete({
            queryStatement: {
                where: {},
            },
        });
        await app.close();
    });
});