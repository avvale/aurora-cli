/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { IScopeRepository } from '@app/o-auth/scope/domain/scope.repository';
import { MockScopeSeeder } from '@app/o-auth/scope/infrastructure/mock/mock-scope.seeder';
import { scopes } from '@app/o-auth/scope/infrastructure/seeds/scope.seed';
import { GraphQLConfigModule } from '@aurora/graphql/graphql-config.module';
import { OAuthModule } from '@api/o-auth/o-auth.module';
import * as request from 'supertest';
import * as _ from 'lodash';

// has OAuth
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('scope', () =>
{
    let app: INestApplication;
    let scopeRepository: IScopeRepository;
    let scopeSeeder: MockScopeSeeder;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let mockData: any;

    // set timeout to 60s by default are 5s
    jest.setTimeout(60000);

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
                        id: '13e5f3b7-e953-560a-b8e7-da8bf93a7931',
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

    test('/REST:POST o-auth/scope/find/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/scope/find/544fb8a0-6763-5cf0-87cf-4ba8b63dad4c')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:POST o-auth/scope/find/{id}', () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/scope/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
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
                id: '7c157dc4-cad2-5ca2-bbea-281696dc62e2',
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
            .delete('/o-auth/scope/delete/7e1473d9-a00b-5325-8bff-a61aa5ad2aa1')
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
                            id: 'c05f5fd0-c01a-54fa-9e5c-d7bbd74e338c',
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
                    id: 'e8d441b5-18dc-50dd-bcd5-a6b3574f0497',
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

    test('/GraphQL oAuthUpdateScopeById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:OAuthUpdateScopeByIdInput!)
                    {
                        oAuthUpdateScopeById (payload:$payload)
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
                        id: '6072dc9e-501c-5c04-b507-7157039e91bc',
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

    test('/GraphQL oAuthUpdateScopeById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:OAuthUpdateScopeByIdInput!)
                    {
                        oAuthUpdateScopeById (payload:$payload)
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
                expect(res.body.data.oAuthUpdateScopeById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL oAuthUpdateScopes', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:OAuthUpdateScopesInput! $query: QueryStatement)
                    {
                        oAuthUpdateScopes (payload:$payload query:$query)
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
                    query: {
                        where: {
                            id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        },
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.oAuthUpdateScopes[0].id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
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
                    id: '59478b11-e972-57a4-9ecc-1264c6b534f2',
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