/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { IPermissionRepository } from '../../../src/@apps/iam/permission/domain/permission.repository';
import { MockPermissionSeeder } from '../../../src/@apps/iam/permission/infrastructure/mock/mock-permission.seeder';
import { permissions } from '../../../src/@apps/iam/permission/infrastructure/seeds/permission.seed';
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

describe('permission', () =>
{
    let app: INestApplication;
    let credential: OAuthCredential;
    let permissionRepository: IPermissionRepository;
    let permissionSeeder: MockPermissionSeeder;
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
                MockPermissionSeeder,
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

        mockData                        = permissions;
        app                             = module.createNestApplication();
        permissionRepository            = module.get<IPermissionRepository>(IPermissionRepository);
        permissionSeeder                = module.get<MockPermissionSeeder>(MockPermissionSeeder);
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
        await permissionRepository.insert(permissionSeeder.collectionSource);
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

    test('/REST:POST iam/permission/create - Got 400 Conflict, PermissionId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/permission/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                ...mockData[0],
                ...{ id: null },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for PermissionId must be defined, can not be null');
            });
    });

    test('/REST:POST iam/permission/create - Got 400 Conflict, PermissionName property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/permission/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                ...mockData[0],
                ...{ name: null },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for PermissionName must be defined, can not be null');
            });
    });

    test('/REST:POST iam/permission/create - Got 400 Conflict, PermissionBoundedContextId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/permission/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                ...mockData[0],
                ...{ boundedContextId: null },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for PermissionBoundedContextId must be defined, can not be null');
            });
    });

    test('/REST:POST iam/permission/create - Got 400 Conflict, PermissionId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/permission/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                ...mockData[0],
                ...{ id: undefined },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for PermissionId must be defined, can not be undefined');
            });
    });

    test('/REST:POST iam/permission/create - Got 400 Conflict, PermissionName property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/permission/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                ...mockData[0],
                ...{ name: undefined },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for PermissionName must be defined, can not be undefined');
            });
    });

    test('/REST:POST iam/permission/create - Got 400 Conflict, PermissionBoundedContextId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/permission/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                ...mockData[0],
                ...{ boundedContextId: undefined },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for PermissionBoundedContextId must be defined, can not be undefined');
            });
    });

    test('/REST:POST iam/permission/create - Got 400 Conflict, PermissionId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/permission/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                ...mockData[0],
                ...{ id: '*************************************' },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for PermissionId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST iam/permission/create - Got 400 Conflict, PermissionBoundedContextId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/permission/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                ...mockData[0],
                ...{ boundedContextId: '*************************************' },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for PermissionBoundedContextId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST iam/permission/create - Got 400 Conflict, PermissionName is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/permission/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                ...mockData[0],
                ...{ name: '****************************************************************************************************************************************************************************************************************************************************************' },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for PermissionName is too large, has a maximum length of 255');
            });
    });


    test('/REST:POST iam/permission/create - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/permission/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send(mockData[0])
            .expect(409);
    });

    test('/REST:POST iam/permissions/paginate', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/permissions/paginate')
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
                    total: permissionSeeder.collectionResponse.length,
                    count: permissionSeeder.collectionResponse.length,
                    rows : permissionSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt', 'roleIds']))).slice(0, 5),
                });
            });
    });

    test('/REST:POST iam/permissions/get', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/permissions/get')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    permissionSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt', 'roleIds']))),
                );
            });
    });

    test('/REST:POST iam/permission/find - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/permission/find')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '76b17ee9-45f8-4bcb-a220-eb41c82cc52d',
                    },
                },
            })
            .expect(404);
    });

    test('/REST:POST iam/permission/create', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/permission/create')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                ...mockData[0],
                ...{ id: '5b19d6ac-4081-573b-96b3-56964d5326a8' },
            })
            .expect(201);
    });

    test('/REST:POST iam/permission/find', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/permission/find')
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

    test('/REST:GET iam/permission/find/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .get('/iam/permission/find/27f7625d-7e8c-4055-9010-99cc4dc0d242')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .expect(404);
    });

    test('/REST:GET iam/permission/find/{id}', () =>
    {
        return request(app.getHttpServer())
            .get('/iam/permission/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT iam/permission/update - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/iam/permission/update')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                ...mockData[0],
                ...{ id: '70029693-0b6b-4c16-bdf7-2a5c8a519802' },
            })
            .expect(404);
    });

    test('/REST:PUT iam/permission/update', () =>
    {
        return request(app.getHttpServer())
            .put('/iam/permission/update')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                name: 'Tasty Soft Sausages',
                boundedContextId: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                roleIds: [],
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:DELETE iam/permission/delete/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/permission/delete/93a72b59-bdc8-4ea1-9dec-51fdda854629')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .expect(404);
    });

    test('/REST:DELETE iam/permission/delete/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/permission/delete/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .expect(200);
    });

    test('/GraphQL iamCreatePermission - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                query: `
                    mutation ($payload:IamCreatePermissionInput!)
                    {
                        iamCreatePermission (payload:$payload)
                        {
                            id
                            name
                            boundedContextId
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

    test('/GraphQL iamPaginatePermissions', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        iamPaginatePermissions (query:$query constraint:$constraint)
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
                expect(res.body.data.iamPaginatePermissions).toEqual({
                    total: permissionSeeder.collectionResponse.length,
                    count: permissionSeeder.collectionResponse.length,
                    rows : permissionSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt', 'roleIds']))).slice(0, 5),
                });
            });
    });

    test('/GraphQL iamGetPermissions', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        iamGetPermissions (query:$query)
                        {
                            id
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
                for (const [index, value] of res.body.data.iamGetPermissions.entries())
                {
                    expect(permissionSeeder.collectionResponse[index]).toEqual(expect.objectContaining(_.omit(value, ['createdAt', 'updatedAt', 'deletedAt'])));
                }
            });
    });

    test('/GraphQL iamCreatePermission', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                query: `
                    mutation ($payload:IamCreatePermissionInput!)
                    {
                        iamCreatePermission (payload:$payload)
                        {
                            id
                            name
                            boundedContextId
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        name: 'Handmade Frozen Ball',
                        boundedContextId: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.iamCreatePermission).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL iamFindPermission - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindPermission (query:$query)
                        {
                            id
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
                            id: '5bd92b61-f5df-4f97-939a-addd862237a5',
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

    test('/GraphQL iamFindPermission', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindPermission (query:$query)
                        {
                            id
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
                expect(res.body.data.iamFindPermission.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL iamFindPermissionById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        iamFindPermissionById (id:$id)
                        {
                            id
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '6ddc8da9-1361-43cd-a024-47e03e095112',
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

    test('/GraphQL iamFindPermissionById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        iamFindPermissionById (id:$id)
                        {
                            id
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
                expect(res.body.data.iamFindPermissionById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL iamUpdatePermission - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                query: `
                    mutation ($payload:IamUpdatePermissionInput!)
                    {
                        iamUpdatePermission (payload:$payload)
                        {
                            id
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        ...{ id: '7ab2dbbb-b1cc-4caa-9d2c-503342cf5bae' },
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

    test('/GraphQL iamUpdatePermission', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                query: `
                    mutation ($payload:IamUpdatePermissionInput!)
                    {
                        iamUpdatePermission (payload:$payload)
                        {
                            id
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        name: 'Generic Wooden Bacon',
                        boundedContextId: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        roleIds: [],
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.iamUpdatePermission.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL iamDeletePermissionById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeletePermissionById (id:$id)
                        {
                            id
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'bacc4d82-b87c-4335-8759-516b28b59441',
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

    test('/GraphQL iamDeletePermissionById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.accessToken}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeletePermissionById (id:$id)
                        {
                            id
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
                expect(res.body.data.iamDeletePermissionById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    afterAll(async () =>
    {
        await permissionRepository.delete({
            queryStatement: {
                where: {},
            },
        });
        await app.close();
    });
});