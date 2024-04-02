/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { IamModule } from '@api/iam/iam.module';
import { AuthorizationPermissionsGuard } from '@api/iam/shared/guards/authorization-permissions.guard';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { IamIBoundedContextRepository, iamMockBoundedContextData, IamMockBoundedContextSeeder } from '@app/iam/bounded-context';
import { GraphQLConfigModule } from '@aurora/modules';
import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as _ from 'lodash';
import * as request from 'supertest';

// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('bounded-context', () =>
{
    let app: INestApplication;
    let boundedContextRepository: IamIBoundedContextRepository;
    let boundedContextSeeder: IamMockBoundedContextSeeder;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let mockData: any;

    // set timeout to 60s by default are 5s
    jest.setTimeout(60000);

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ...importForeignModules,
                IamModule,
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
                IamMockBoundedContextSeeder,
            ],
        })
            .overrideGuard(AuthenticationJwtGuard)
            .useValue({ canActivate: () => true })
            .overrideGuard(AuthorizationPermissionsGuard)
            .useValue({ canActivate: () => true })
            .compile();

        mockData = iamMockBoundedContextData;
        app = module.createNestApplication();
        boundedContextRepository = module.get<IamIBoundedContextRepository>(IamIBoundedContextRepository);
        boundedContextSeeder = module.get<IamMockBoundedContextSeeder>(IamMockBoundedContextSeeder);

        // seed mock data in memory database
        await boundedContextRepository.insert(boundedContextSeeder.collectionSource);

        await app.init();
    });

    test('/REST:POST iam/bounded-context/create - Got 400 Conflict, BoundedContextId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for IamBoundedContextId must be defined, can not be null');
            });
    });

    test('/REST:POST iam/bounded-context/create - Got 400 Conflict, BoundedContextName property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for IamBoundedContextName must be defined, can not be null');
            });
    });

    test('/REST:POST iam/bounded-context/create - Got 400 Conflict, BoundedContextRoot property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                root: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for IamBoundedContextRoot must be defined, can not be null');
            });
    });

    test('/REST:POST iam/bounded-context/create - Got 400 Conflict, BoundedContextIsActive property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                isActive: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for IamBoundedContextIsActive must be defined, can not be null');
            });
    });

    test('/REST:POST iam/bounded-context/create - Got 400 Conflict, BoundedContextId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for IamBoundedContextId must be defined, can not be undefined');
            });
    });

    test('/REST:POST iam/bounded-context/create - Got 400 Conflict, BoundedContextName property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for IamBoundedContextName must be defined, can not be undefined');
            });
    });

    test('/REST:POST iam/bounded-context/create - Got 400 Conflict, BoundedContextRoot property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                root: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for IamBoundedContextRoot must be defined, can not be undefined');
            });
    });

    test('/REST:POST iam/bounded-context/create - Got 400 Conflict, BoundedContextIsActive property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                isActive: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for IamBoundedContextIsActive must be defined, can not be undefined');
            });
    });

    test('/REST:POST iam/bounded-context/create - Got 400 Conflict, BoundedContextId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for IamBoundedContextId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST iam/bounded-context/create - Got 400 Conflict, BoundedContextName is too large, has a maximum length of 128', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: '*********************************************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for IamBoundedContextName is too large, has a maximum length of 128');
            });
    });

    test('/REST:POST iam/bounded-context/create - Got 400 Conflict, BoundedContextRoot is too large, has a maximum length of 64', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                root: '*****************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for IamBoundedContextRoot is too large, has a maximum length of 64');
            });
    });

    test('/REST:POST iam/bounded-context/create - Got 400 Conflict, BoundedContextIsActive has to be a boolean value', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                isActive: 'true',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for IamBoundedContextIsActive has to be a boolean value');
            });
    });

    test('/REST:POST iam/bounded-context/create - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context/create')
            .set('Accept', 'application/json')
            .send(mockData[0])
            .expect(409);
    });

    test('/REST:POST iam/bounded-contexts/paginate', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-contexts/paginate')
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
                    total: boundedContextSeeder.collectionResponse.length,
                    count: boundedContextSeeder.collectionResponse.length,
                    rows : boundedContextSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/REST:POST iam/bounded-contexts/get', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-contexts/get')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    boundedContextSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))),
                );
            });
    });

    test('/REST:POST iam/bounded-context/find - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: '9adba201-128a-5512-a6ab-26f5e6a77b4a',
                    },
                },
            })
            .expect(404);
    });

    test('/REST:POST iam/bounded-context/create', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
            })
            .expect(201);
    });

    test('/REST:POST iam/bounded-context/find', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context/find')
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

    test('/REST:POST iam/bounded-context/find/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context/find/e35a6ccf-851c-5eb8-8667-f82277e9abcf')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:POST iam/bounded-context/find/{id}', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT iam/bounded-context/update - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/iam/bounded-context/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '13c0b7b9-3149-5beb-bab5-4ddd5ff80aea',
            })
            .expect(404);
    });

    test('/REST:PUT iam/bounded-context/update', () =>
    {
        return request(app.getHttpServer())
            .put('/iam/bounded-context/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:DELETE iam/bounded-context/delete/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/bounded-context/delete/72b5c3b8-a2e7-5cab-ba4b-b0952bf46590')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE iam/bounded-context/delete/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/bounded-context/delete/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test('/GraphQL iamCreateBoundedContext - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:IamCreateBoundedContextInput!)
                    {
                        iamCreateBoundedContext (payload:$payload)
                        {
                            id
                            name
                            root
                            sort
                            isActive
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
                expect(res.body.errors[0].extensions.originalError.statusCode).toBe(409);
                expect(res.body.errors[0].extensions.originalError.message).toContain('already exist in database');
            });
    });

    test('/GraphQL iamPaginateBoundedContexts', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        iamPaginateBoundedContexts (query:$query constraint:$constraint)
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
                expect(res.body.data.iamPaginateBoundedContexts).toEqual({
                    total: boundedContextSeeder.collectionResponse.length,
                    count: boundedContextSeeder.collectionResponse.length,
                    rows : boundedContextSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/GraphQL iamGetBoundedContexts', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        iamGetBoundedContexts (query:$query)
                        {
                            id
                            name
                            root
                            sort
                            isActive
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
                for (const [index, value] of res.body.data.iamGetBoundedContexts.entries())
                {
                    expect(boundedContextSeeder.collectionResponse[index]).toEqual(expect.objectContaining(_.omit(value, ['createdAt', 'updatedAt', 'deletedAt'])));
                }
            });
    });

    test('/GraphQL iamCreateBoundedContext', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:IamCreateBoundedContextInput!)
                    {
                        iamCreateBoundedContext (payload:$payload)
                        {
                            id
                            name
                            root
                            sort
                            isActive
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.iamCreateBoundedContext).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL iamFindBoundedContext - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindBoundedContext (query:$query)
                        {
                            id
                            name
                            root
                            sort
                            isActive
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
                            id: 'fef2d1d1-e7f7-5a89-8c52-3e581aeaf368',
                        },
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.originalError.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.originalError.message).toContain('not found');
            });
    });

    test('/GraphQL iamFindBoundedContext', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindBoundedContext (query:$query)
                        {
                            id
                            name
                            root
                            sort
                            isActive
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
                expect(res.body.data.iamFindBoundedContext.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL iamFindBoundedContextById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        iamFindBoundedContextById (id:$id)
                        {
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '5219450c-f94d-5467-bfdb-778729cbc06d',
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.originalError.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.originalError.message).toContain('not found');
            });
    });

    test('/GraphQL iamFindBoundedContextById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        iamFindBoundedContextById (id:$id)
                        {
                            id
                            name
                            root
                            sort
                            isActive
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
                expect(res.body.data.iamFindBoundedContextById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL iamUpdateBoundedContextById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:IamUpdateBoundedContextByIdInput!)
                    {
                        iamUpdateBoundedContextById (payload:$payload)
                        {
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: '6628f75a-3c04-5c80-a862-3f868cde7513',
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.originalError.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.originalError.message).toContain('not found');
            });
    });

    test('/GraphQL iamUpdateBoundedContextById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:IamUpdateBoundedContextByIdInput!)
                    {
                        iamUpdateBoundedContextById (payload:$payload)
                        {
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.iamUpdateBoundedContextById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL iamUpdateBoundedContexts', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:IamUpdateBoundedContextsInput! $query: QueryStatement)
                    {
                        iamUpdateBoundedContexts (payload:$payload query:$query)
                        {
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
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
                expect(res.body.data.iamUpdateBoundedContexts[0].id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL iamDeleteBoundedContextById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteBoundedContextById (id:$id)
                        {
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '35385106-8942-51d0-aeb9-583c721c828d',
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.originalError.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.originalError.message).toContain('not found');
            });
    });

    test('/GraphQL iamDeleteBoundedContextById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteBoundedContextById (id:$id)
                        {
                            id
                            name
                            root
                            sort
                            isActive
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
                expect(res.body.data.iamDeleteBoundedContextById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    afterAll(async () =>
    {
        await boundedContextRepository.delete({
            queryStatement: {
                where: {},
            },
        });
        await app.close();
    });
});
