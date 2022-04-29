/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { IRefreshTokenRepository } from '../../../src/@apps/o-auth/refresh-token/domain/refresh-token.repository';
import { MockRefreshTokenSeeder } from '../../../src/@apps/o-auth/refresh-token/infrastructure/mock/mock-refresh-token.seeder';
import { refreshTokens } from '../../../src/@apps/o-auth/refresh-token/infrastructure/seeds/refresh-token.seed';
import { GraphQLConfigModule } from '../../../src/@aurora/graphql/graphql-config.module';
import { OAuthModule } from '../../../src/@api/o-auth/o-auth.module';
import * as request from 'supertest';
import * as _ from 'lodash';



// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('refresh-token', () =>
{
    let app: INestApplication;
    let repository: IRefreshTokenRepository;
    let seeder: MockRefreshTokenSeeder;

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
                MockRefreshTokenSeeder,
            ],
        })
            .compile();

        mockData        = refreshTokens;
        app             = module.createNestApplication();
        repository      = module.get<IRefreshTokenRepository>(IRefreshTokenRepository);
        seeder          = module.get<MockRefreshTokenSeeder>(MockRefreshTokenSeeder);

        // seed mock data in memory database
        await repository.insert(seeder.collectionSource);

        await app.init();
    });

    test('/REST:POST o-auth/refresh-token/create - Got 400 Conflict, RefreshTokenId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ id: null },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for RefreshTokenId must be defined, can not be null');
            });
    });

    test('/REST:POST o-auth/refresh-token/create - Got 400 Conflict, RefreshTokenAccessTokenId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ accessTokenId: null },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for RefreshTokenAccessTokenId must be defined, can not be null');
            });
    });

    test('/REST:POST o-auth/refresh-token/create - Got 400 Conflict, RefreshTokenToken property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ token: null },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for RefreshTokenToken must be defined, can not be null');
            });
    });

    test('/REST:POST o-auth/refresh-token/create - Got 400 Conflict, RefreshTokenIsRevoked property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ isRevoked: null },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for RefreshTokenIsRevoked must be defined, can not be null');
            });
    });

    test('/REST:POST o-auth/refresh-token/create - Got 400 Conflict, RefreshTokenId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ id: undefined },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for RefreshTokenId must be defined, can not be undefined');
            });
    });

    test('/REST:POST o-auth/refresh-token/create - Got 400 Conflict, RefreshTokenAccessTokenId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ accessTokenId: undefined },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for RefreshTokenAccessTokenId must be defined, can not be undefined');
            });
    });

    test('/REST:POST o-auth/refresh-token/create - Got 400 Conflict, RefreshTokenToken property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ token: undefined },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for RefreshTokenToken must be defined, can not be undefined');
            });
    });

    test('/REST:POST o-auth/refresh-token/create - Got 400 Conflict, RefreshTokenIsRevoked property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ isRevoked: undefined },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for RefreshTokenIsRevoked must be defined, can not be undefined');
            });
    });

    test('/REST:POST o-auth/refresh-token/create - Got 400 Conflict, RefreshTokenId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ id: '*************************************' },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for RefreshTokenId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST o-auth/refresh-token/create - Got 400 Conflict, RefreshTokenAccessTokenId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ accessTokenId: '*************************************' },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for RefreshTokenAccessTokenId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST o-auth/refresh-token/create - Got 400 Conflict, RefreshTokenIsRevoked has to be a boolean value', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ isRevoked: 'true' },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for RefreshTokenIsRevoked has to be a boolean value');
            });
    });
    test('/REST:POST o-auth/refresh-token/create - Got 400 Conflict, RefreshTokenExpiresAt has to be a timestamp value', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ expiresAt: '****' },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for RefreshTokenExpiresAt has to be a timestamp value');
            });
    });

    test('/REST:POST o-auth/refresh-token/create - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token/create')
            .set('Accept', 'application/json')
            .send(mockData[0])
            .expect(409);
    });

    test('/REST:POST o-auth/refresh-tokens/paginate', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-tokens/paginate')
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

    test('/REST:POST o-auth/refresh-tokens/get', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-tokens/get')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))),
                );
            });
    });

    test('/REST:POST o-auth/refresh-token/find - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: '761ab78e-fdf6-4a55-b881-7d456004695b',
                    },
                },
            })
            .expect(404);
    });

    test('/REST:POST o-auth/refresh-token/create', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ id: '5b19d6ac-4081-573b-96b3-56964d5326a8' },
            })
            .expect(201);
    });

    test('/REST:POST o-auth/refresh-token/find', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/refresh-token/find')
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

    test('/REST:GET o-auth/refresh-token/find/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/refresh-token/find/8dac8857-8dc5-4c00-9d98-e1fce0ccf090')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:GET o-auth/refresh-token/find/{id}', () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/refresh-token/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT o-auth/refresh-token/update - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/o-auth/refresh-token/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ id: 'c408c7f1-c9a9-48fa-b8be-fc86ddbbd34d' },
            })
            .expect(404);
    });

    test('/REST:PUT o-auth/refresh-token/update', () =>
    {
        return request(app.getHttpServer())
            .put('/o-auth/refresh-token/update')
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

    test('/REST:DELETE o-auth/refresh-token/delete/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/refresh-token/delete/6a866d68-3c33-460c-9a0f-15c8f7a1c860')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE o-auth/refresh-token/delete/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/refresh-token/delete/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test('/GraphQL oAuthCreateRefreshToken - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:OAuthCreateRefreshTokenInput!)
                    {
                        oAuthCreateRefreshToken (payload:$payload)
                        {
                            id
                            accessTokenId
                            token
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

    test('/GraphQL oAuthPaginateRefreshTokens', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        oAuthPaginateRefreshTokens (query:$query constraint:$constraint)
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
                expect(res.body.data.oAuthPaginateRefreshTokens).toEqual({
                    total: seeder.collectionResponse.length,
                    count: seeder.collectionResponse.length,
                    rows : seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/GraphQL oAuthGetRefreshTokens', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthGetRefreshTokens (query:$query)
                        {
                            id
                            accessTokenId
                            token
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
                for (const [index, value] of res.body.data.oAuthGetRefreshTokens.entries())
                {
                    expect(seeder.collectionResponse[index]).toEqual(expect.objectContaining(_.omit(value, ['createdAt', 'updatedAt', 'deletedAt'])));
                }
            });
    });

    test('/GraphQL oAuthCreateRefreshToken', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:OAuthCreateRefreshTokenInput!)
                    {
                        oAuthCreateRefreshToken (payload:$payload)
                        {
                            id
                            accessTokenId
                            token
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
                expect(res.body.data.oAuthCreateRefreshToken).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL oAuthFindRefreshToken - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindRefreshToken (query:$query)
                        {
                            id
                            accessTokenId
                            token
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
                            id: '8e673ef7-29d7-44d5-8e1b-10692651602a',
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

    test('/GraphQL oAuthFindRefreshToken', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindRefreshToken (query:$query)
                        {
                            id
                            accessTokenId
                            token
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
                expect(res.body.data.oAuthFindRefreshToken.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL oAuthFindRefreshTokenById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindRefreshTokenById (id:$id)
                        {
                            id
                            accessTokenId
                            token
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '24959ee0-a71f-43cb-90bb-aa970bd58808',
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

    test('/GraphQL oAuthFindRefreshTokenById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindRefreshTokenById (id:$id)
                        {
                            id
                            accessTokenId
                            token
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
                expect(res.body.data.oAuthFindRefreshTokenById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL oAuthUpdateRefreshToken - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:OAuthUpdateRefreshTokenInput!)
                    {
                        oAuthUpdateRefreshToken (payload:$payload)
                        {
                            id
                            accessTokenId
                            token
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
                        ...{ id: '9d45a94d-6182-4f6d-8f21-3cff98daf0ce' },
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

    test('/GraphQL oAuthUpdateRefreshToken', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:OAuthUpdateRefreshTokenInput!)
                    {
                        oAuthUpdateRefreshToken (payload:$payload)
                        {
                            id
                            accessTokenId
                            token
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
                expect(res.body.data.oAuthUpdateRefreshToken.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL oAuthDeleteRefreshTokenById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteRefreshTokenById (id:$id)
                        {
                            id
                            accessTokenId
                            token
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'a3cd333d-74c5-4d1c-9fdf-d57cdd136f55',
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

    test('/GraphQL oAuthDeleteRefreshTokenById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteRefreshTokenById (id:$id)
                        {
                            id
                            accessTokenId
                            token
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
                expect(res.body.data.oAuthDeleteRefreshTokenById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
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