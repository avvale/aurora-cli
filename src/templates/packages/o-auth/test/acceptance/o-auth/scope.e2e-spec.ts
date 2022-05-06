/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { IScopeRepository } from '../../../src/@apps/o-auth/scope/domain/scope.repository';
import { MockScopeSeeder } from '../../../src/@apps/o-auth/scope/infrastructure/mock/mock-scope.seeder';
import { scopes } from '../../../src/@apps/o-auth/scope/infrastructure/seeds/scope.seed';
import { GraphQLConfigModule } from '../../../src/@aurora/graphql/graphql-config.module';
import { OAuthModule } from '../../../src/@api/o-auth/o-auth.module';
import * as request from 'supertest';
import * as _ from 'lodash';

// has OAuth
import { AuthenticationJwtGuard } from 'src/@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '../../../src/@api/iam/shared/guards/authorization.guard';

// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('scope', () =>
{
    let app: INestApplication;
    let scopeRepository: IScopeRepository;
    let scopeSeeder: MockScopeSeeder;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let mockData: any;

    // set timeout to 15s by default are 5s
    jest.setTimeout(15000);

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
                MockScopeSeeder,
            ],
        })
            .overrideGuard(AuthenticationJwtGuard)
            .useValue({ canActivate: () => true })
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        mockData = scopes;
        app = module.createNestApplication();
        scopeRepository = module.get<IScopeRepository>(IScopeRepository);
        scopeSeeder = module.get<MockScopeSeeder>(MockScopeSeeder);

        // seed mock data in memory database
        await scopeRepository.insert(scopeSeeder.collectionSource);

        await app.init();
    });

    test('/REST:POST o-auth/scope/create - Got 400 Conflict, ScopeId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/scope/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ScopeId must be defined, can not be null');
            });
    });

    test('/REST:POST o-auth/scope/create - Got 400 Conflict, ScopeCode property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/scope/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                code: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ScopeCode must be defined, can not be null');
            });
    });

    test('/REST:POST o-auth/scope/create - Got 400 Conflict, ScopeName property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/scope/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ScopeName must be defined, can not be null');
            });
    });

    test('/REST:POST o-auth/scope/create - Got 400 Conflict, ScopeId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/scope/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ScopeId must be defined, can not be undefined');
            });
    });

    test('/REST:POST o-auth/scope/create - Got 400 Conflict, ScopeCode property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/scope/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                code: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ScopeCode must be defined, can not be undefined');
            });
    });

    test('/REST:POST o-auth/scope/create - Got 400 Conflict, ScopeName property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/scope/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ScopeName must be defined, can not be undefined');
            });
    });

    test('/REST:POST o-auth/scope/create - Got 400 Conflict, ScopeId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/scope/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ScopeId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST o-auth/scope/create - Got 400 Conflict, ScopeCode is too large, has a maximum length of 20', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/scope/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                code: '*********************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ScopeCode is too large, has a maximum length of 20');
            });
    });

    test('/REST:POST o-auth/scope/create - Got 400 Conflict, ScopeName is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/scope/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: '****************************************************************************************************************************************************************************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for ScopeName is too large, has a maximum length of 255');
            });
    });


    test('/REST:POST o-auth/scope/create - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/scope/create')
            .set('Accept', 'application/json')
            .send(mockData[0])
            .expect(409);
    });

    test('/REST:POST o-auth/scopes/paginate', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/scopes/paginate')
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
                    total: scopeSeeder.collectionResponse.length,
                    count: scopeSeeder.collectionResponse.length,
                    rows : scopeSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/REST:POST o-auth/scopes/get', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/scopes/get')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    scopeSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))),
                );
            });
    });

    test('/REST:POST o-auth/scope/find - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/scope/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: '4eb237a0-19b1-414a-90e1-83409c57e7de',
                    },
                },
            })
            .expect(404);
    });

    test('/REST:POST o-auth/scope/create', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/scope/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                code: 'TEST:E2E',
            })
            .expect(201);
    });

    test('/REST:POST o-auth/scope/find', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/scope/find')
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

    test('/REST:GET o-auth/scope/find/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/scope/find/acdbef90-0fdb-4a56-b892-e1fbce10d2cf')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:GET o-auth/scope/find/{id}', () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/scope/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT o-auth/scope/update - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/o-auth/scope/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '8b3f4d2d-a0ff-4ecb-8d44-d17c25427c8c',
            })
            .expect(404);
    });

    test('/REST:PUT o-auth/scope/update', () =>
    {
        return request(app.getHttpServer())
            .put('/o-auth/scope/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                code: 'TEST:E2E',
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:DELETE o-auth/scope/delete/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/scope/delete/44f2844a-04d1-429c-96ff-50764a0d7a7d')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE o-auth/scope/delete/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/scope/delete/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test('/GraphQL oAuthCreateScope - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:OAuthCreateScopeInput!)
                    {
                        oAuthCreateScope (payload:$payload)
                        {
                            id
                            code
                            name
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

    test('/GraphQL oAuthPaginateScopes', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        oAuthPaginateScopes (query:$query constraint:$constraint)
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
                expect(res.body.data.oAuthPaginateScopes).toEqual({
                    total: scopeSeeder.collectionResponse.length,
                    count: scopeSeeder.collectionResponse.length,
                    rows : scopeSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/GraphQL oAuthGetScopes', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthGetScopes (query:$query)
                        {
                            id
                            code
                            name
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
                for (const [index, value] of res.body.data.oAuthGetScopes.entries())
                {
                    expect(scopeSeeder.collectionResponse[index]).toEqual(expect.objectContaining(_.omit(value, ['createdAt', 'updatedAt', 'deletedAt'])));
                }
            });
    });

    test('/GraphQL oAuthCreateScope', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:OAuthCreateScopeInput!)
                    {
                        oAuthCreateScope (payload:$payload)
                        {
                            id
                            code
                            name
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        code: 'TEST:E2E',
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.oAuthCreateScope).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL oAuthFindScope - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindScope (query:$query)
                        {
                            id
                            code
                            name
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
                            id: '6dd68558-00ad-4416-a13f-4feb93708c08',
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

    test('/GraphQL oAuthFindScope', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindScope (query:$query)
                        {
                            id
                            code
                            name
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
                expect(res.body.data.oAuthFindScope.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL oAuthFindScopeById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindScopeById (id:$id)
                        {
                            id
                            code
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'e89d4209-1824-4f9b-bfb0-7a6d13190c81',
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

    test('/GraphQL oAuthFindScopeById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindScopeById (id:$id)
                        {
                            id
                            code
                            name
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
                expect(res.body.data.oAuthFindScopeById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL oAuthUpdateScope - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:OAuthUpdateScopeInput!)
                    {
                        oAuthUpdateScope (payload:$payload)
                        {
                            id
                            code
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: 'd72847bc-64b9-4948-9deb-31b02837e5b8',
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

    test('/GraphQL oAuthUpdateScope', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:OAuthUpdateScopeInput!)
                    {
                        oAuthUpdateScope (payload:$payload)
                        {
                            id
                            code
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        code: 'TEST:E2E',
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.oAuthUpdateScope.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL oAuthDeleteScopeById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteScopeById (id:$id)
                        {
                            id
                            code
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'f5d2b42c-9a2f-447d-bb5d-9be27ac2693a',
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

    test('/GraphQL oAuthDeleteScopeById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteScopeById (id:$id)
                        {
                            id
                            code
                            name
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
                expect(res.body.data.oAuthDeleteScopeById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    afterAll(async () =>
    {
        await scopeRepository.delete({
            queryStatement: {
                where: {},
            },
        });
        await app.close();
    });
});