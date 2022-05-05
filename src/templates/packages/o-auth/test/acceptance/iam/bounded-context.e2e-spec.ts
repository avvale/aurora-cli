/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { IBoundedContextRepository } from '../../../src/@apps/iam/bounded-context/domain/bounded-context.repository';
import { MockBoundedContextSeeder } from '../../../src/@apps/iam/bounded-context/infrastructure/mock/mock-bounded-context.seeder';
import { boundedContexts } from '../../../src/@apps/iam/bounded-context/infrastructure/seeds/bounded-context.seed';
import { GraphQLConfigModule } from '../../../src/@aurora/graphql/graphql-config.module';
import { IamModule } from '../../../src/@api/iam/iam.module';
import { OAuthClientGrantType, OAuthCredential } from '../../../src/graphql';
import * as request from 'supertest';
import * as _ from 'lodash';

// ---- customizations ----
import { jwtConfig } from '../../../src/@apps/o-auth/shared/jwt-config';
import { AuthorizationGuard } from '../../../src/@api/iam/shared/guards/authorization.guard';
import { AuthModule } from '../../../src/@apps/o-auth/shared/modules/auth.module';
import { OAuthModule } from '../../../src/@api/o-auth/o-auth.module';
import { MockApplicationSeeder } from '../../../src/@apps/o-auth/application/infrastructure/mock/mock-application.seeder';
import { OAuthCreateCredentialHandler } from '../../../src/@api/o-auth/credential/handlers/o-auth-create-credential.handler';
import { IApplicationRepository } from '../../../src/@apps/o-auth/application/domain/application.repository';
import { MockAccessTokenSeeder } from '../../../src/@apps/o-auth/access-token/infrastructure/mock/mock-access-token.seeder';
import { IAccessTokenRepository } from '../../../src/@apps/o-auth/access-token';
import { MockClientSeeder } from '../../../src/@apps/o-auth/client/infrastructure/mock/mock-client.seeder';
import { IClientRepository } from '../../../src/@apps/o-auth/client';
import { MockAccountSeeder } from '../../../src/@apps/iam/account/infrastructure/mock/mock-account.seeder';
import { IAccountRepository } from '../../../src/@apps/iam/account/domain/account.repository';
import { MockUserSeeder } from '../../../src/@apps/iam/user/infrastructure/mock/mock-user.seeder';
import { IUserRepository } from '../../../src/@apps/iam/user/domain/user.repository';

// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('bounded-context', () =>
{
    let app: INestApplication;
    let credential: OAuthCredential;
    let boundedContextRepository: IBoundedContextRepository;
    let boundedContextSeeder: MockBoundedContextSeeder;
    let oAuthCreateCredentialHandler: OAuthCreateCredentialHandler;
    let applicationRepository: IApplicationRepository;
    let applicationSeeder: MockApplicationSeeder;
    let accessTokenRepository: IAccessTokenRepository;
    let accessTokenSeeder: MockAccessTokenSeeder;
    let clientRepository: IClientRepository;
    let clientSeeder: MockClientSeeder;
    let accountRepository: IAccountRepository;
    let accountSeeder: MockAccountSeeder;
    let userRepository: IUserRepository;
    let userSeeder: MockUserSeeder;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let mockData: any;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ...importForeignModules,
                IamModule,
                OAuthModule,
                AuthModule.forRoot(jwtConfig),
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
                MockBoundedContextSeeder,
                MockApplicationSeeder,
                MockAccessTokenSeeder,
                MockAccountSeeder,
                MockClientSeeder,
                MockUserSeeder,
            ],
        })
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        mockData                        = boundedContexts;
        app                             = module.createNestApplication();
        boundedContextRepository        = module.get<IBoundedContextRepository>(IBoundedContextRepository);
        boundedContextSeeder            = module.get<MockBoundedContextSeeder>(MockBoundedContextSeeder);
        oAuthCreateCredentialHandler    = module.get<OAuthCreateCredentialHandler>(OAuthCreateCredentialHandler);
        accountRepository               = module.get<IAccountRepository>(IAccountRepository);
        accountSeeder                   = module.get<MockAccountSeeder>(MockAccountSeeder);
        applicationRepository           = module.get<IApplicationRepository>(IApplicationRepository);
        applicationSeeder               = module.get<MockApplicationSeeder>(MockApplicationSeeder);
        clientRepository                = module.get<IClientRepository>(IClientRepository);
        clientSeeder                    = module.get<MockClientSeeder>(MockClientSeeder);
        accessTokenRepository           = module.get<IAccessTokenRepository>(IAccessTokenRepository);
        accessTokenSeeder               = module.get<MockAccessTokenSeeder>(MockAccessTokenSeeder);
        userRepository                  = module.get<IUserRepository>(IUserRepository);
        userSeeder                      = module.get<MockUserSeeder>(MockUserSeeder);

        // seed mock data in memory database
        await boundedContextRepository.insert(boundedContextSeeder.collectionSource);
        await applicationRepository.insert(applicationSeeder.collectionSource);
        await clientRepository.insert(clientSeeder.collectionSource);
        await accountRepository.insert(accountSeeder.collectionSource);
        await accessTokenRepository.insert(accessTokenSeeder.collectionSource);
        await userRepository.insert(userSeeder.collectionSource);

        await app.init();

        credential = await oAuthCreateCredentialHandler.main(
            {
                username: 'john.doe@gmail.com',
                password: '1111',
                grantType: OAuthClientGrantType.PASSWORD,
            },
            'Basic YXVyb3JhOiQyeSQxMCRFT0EvU0tFd0tSZ0hQdzY0a080TFouNm95NWI4a2w2SnpXL21DUk9NZlNxNlMzOC9JaXl3Rw==',
        );
    });

    test('/REST:POST iam/bounded-context/create - Got 400 Conflict, BoundedContextId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                ...mockData[0],
                id: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for BoundedContextId must be defined, can not be null');
            });
    });

    test('/REST:POST iam/bounded-context/create - Got 400 Conflict, BoundedContextName property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                ...mockData[0],
                name: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for BoundedContextName must be defined, can not be null');
            });
    });

    test('/REST:POST iam/bounded-context/create - Got 400 Conflict, BoundedContextRoot property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                ...mockData[0],
                root: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for BoundedContextRoot must be defined, can not be null');
            });
    });

    test('/REST:POST iam/bounded-context/create - Got 400 Conflict, BoundedContextIsActive property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                ...mockData[0],
                isActive: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for BoundedContextIsActive must be defined, can not be null');
            });
    });

    test('/REST:POST iam/bounded-context/create - Got 400 Conflict, BoundedContextId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                ...mockData[0],
                id: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for BoundedContextId must be defined, can not be undefined');
            });
    });

    test('/REST:POST iam/bounded-context/create - Got 400 Conflict, BoundedContextName property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                ...mockData[0],
                ...{ name: undefined },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for BoundedContextName must be defined, can not be undefined');
            });
    });

    test('/REST:POST iam/bounded-context/create - Got 400 Conflict, BoundedContextRoot property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                ...mockData[0],
                ...{ root: undefined },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for BoundedContextRoot must be defined, can not be undefined');
            });
    });

    test('/REST:POST iam/bounded-context/create - Got 400 Conflict, BoundedContextIsActive property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                ...mockData[0],
                ...{ isActive: undefined },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for BoundedContextIsActive must be defined, can not be undefined');
            });
    });

    test('/REST:POST iam/bounded-context/create - Got 400 Conflict, BoundedContextId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                ...mockData[0],
                ...{ id: '*************************************' },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for BoundedContextId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST iam/bounded-context/create - Got 400 Conflict, BoundedContextName is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                ...mockData[0],
                ...{ name: '****************************************************************************************************************************************************************************************************************************************************************' },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for BoundedContextName is too large, has a maximum length of 255');
            });
    });

    test('/REST:POST iam/bounded-context/create - Got 400 Conflict, BoundedContextRoot is too large, has a maximum length of 30', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                ...mockData[0],
                ...{ root: '*******************************' },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for BoundedContextRoot is too large, has a maximum length of 30');
            });
    });

    test('/REST:POST iam/bounded-context/create - Got 400 Conflict, BoundedContextSort is too large, has a maximum length of 6', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                ...mockData[0],
                ...{ sort: 1111111 },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for BoundedContextSort is too large, has a maximum length of 6');
            });
    });

    test('/REST:POST iam/bounded-context/create - Got 400 Conflict, BoundedContextIsActive has to be a boolean value', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                ...mockData[0],
                ...{ isActive: 'true' },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for BoundedContextIsActive has to be a boolean value');
            });
    });

    test('/REST:POST iam/bounded-context/create - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send(mockData[0])
            .expect(409);
    });

    test('/REST:POST iam/bounded-contexts/paginate', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-contexts/paginate')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
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
            .set('Authorization', `Bearer ${credential.accessToken}`)
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
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '8004dfa4-dfd0-4143-97b2-2fdccae06b39',
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
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                ...mockData[0],
                ...{ id: '5b19d6ac-4081-573b-96b3-56964d5326a8' },
            })
            .expect(201);
    });

    test('/REST:POST iam/bounded-context/find', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context/find')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
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

    test('/REST:GET iam/bounded-context/find/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-context/find/512ad7c1-477e-4db8-b880-de3838959211')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .expect(404);
    });

    test('/REST:GET iam/bounded-context/find/{id}', () =>
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-context/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
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
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                ...mockData[0],
                ...{ id: '4bfe3bb2-be1f-4ec5-ad74-7550d7ffb13e' },
            })
            .expect(404);
    });

    test('/REST:PUT iam/bounded-context/update', () =>
    {
        return request(app.getHttpServer())
            .put('/iam/bounded-context/update')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
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
            .delete('/iam/bounded-context/delete/bb579b73-7b8f-4ab0-9fab-d892e95d2374')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .expect(404);
    });

    test('/REST:DELETE iam/bounded-context/delete/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/bounded-context/delete/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .expect(200);
    });

    test('/GraphQL iamCreateBoundedContext - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
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
                expect(res.body.errors[0].extensions.response.statusCode).toBe(409);
                expect(res.body.errors[0].extensions.response.message).toContain('already exist in database');
            });
    });

    test('/GraphQL iamPaginateBoundedContexts', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
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
            .set('Authorization', `Bearer ${credential.accessToken}`)
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
            .set('Authorization', `Bearer ${credential.accessToken}`)
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
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        name: 'Tasty Fresh Car',
                        root: 'xf9m6tekkb8jpcd0erbo2402qt1eb',
                        sort: 79182,
                        isActive: false,
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
            .set('Authorization', `Bearer ${credential.accessToken}`)
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
                            id: 'a4cfa42e-5b58-4ea4-bf87-4f3e7264e460',
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

    test('/GraphQL iamFindBoundedContext', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
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
            .set('Authorization', `Bearer ${credential.accessToken}`)
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
                    id: 'cee8f29d-bbb5-4078-8f46-d0380453dde0',
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

    test('/GraphQL iamFindBoundedContextById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
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

    test('/GraphQL iamUpdateBoundedContext - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                query: `
                    mutation ($payload:IamUpdateBoundedContextInput!)
                    {
                        iamUpdateBoundedContext (payload:$payload)
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
                        ...{ id: '96e632db-aea8-48de-a7cc-e328187639ae' },
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

    test('/GraphQL iamUpdateBoundedContext', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                query: `
                    mutation ($payload:IamUpdateBoundedContextInput!)
                    {
                        iamUpdateBoundedContext (payload:$payload)
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
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        name: 'Rustic Fresh Fish',
                        root: 'i0diqvyvepn5tmz8gqn9f4kpunrk0',
                        sort: 97326,
                        isActive: false,
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.iamUpdateBoundedContext.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL iamDeleteBoundedContextById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
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
                    id: '77c2de7a-1e93-4e20-8e59-160ed19ae1ea',
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

    test('/GraphQL iamDeleteBoundedContextById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
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