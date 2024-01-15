/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { IamModule } from '@api/iam/iam.module';
import { AuthorizationPermissionsGuard } from '@api/iam/shared/guards/authorization-permissions.guard';
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { IamIPermissionRepository, iamMockPermissionData, IamMockPermissionSeeder } from '@app/iam/permission';
import { GraphQLConfigModule } from '@aurora/graphql/graphql-config.module';
import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as _ from 'lodash';
import * as request from 'supertest';

// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('permission', () =>
{
    let app: INestApplication;
    let permissionRepository: IamIPermissionRepository;
    let permissionSeeder: IamMockPermissionSeeder;

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
                IamMockPermissionSeeder,
            ],
        })
            .overrideGuard(AuthenticationJwtGuard)
            .useValue({ canActivate: () => true })
            .overrideGuard(AuthorizationPermissionsGuard)
            .useValue({ canActivate: () => true })
            .compile();

        mockData = iamMockPermissionData;
        app = module.createNestApplication();
        permissionRepository = module.get<IamIPermissionRepository>(IamIPermissionRepository);
        permissionSeeder = module.get<IamMockPermissionSeeder>(IamMockPermissionSeeder);

        // seed mock data in memory database
        await permissionRepository.insert(permissionSeeder.collectionSource);

        await app.init();
    });

    test('/REST:POST iam/permission/create - Got 400 Conflict, PermissionId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/permission/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for IamPermissionId must be defined, can not be null');
            });
    });

    test('/REST:POST iam/permission/create - Got 400 Conflict, PermissionName property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/permission/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for IamPermissionName must be defined, can not be null');
            });
    });

    test('/REST:POST iam/permission/create - Got 400 Conflict, PermissionBoundedContextId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/permission/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                boundedContextId: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for IamPermissionBoundedContextId must be defined, can not be null');
            });
    });

    test('/REST:POST iam/permission/create - Got 400 Conflict, PermissionId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/permission/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for IamPermissionId must be defined, can not be undefined');
            });
    });

    test('/REST:POST iam/permission/create - Got 400 Conflict, PermissionName property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/permission/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for IamPermissionName must be defined, can not be undefined');
            });
    });

    test('/REST:POST iam/permission/create - Got 400 Conflict, PermissionBoundedContextId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/permission/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                boundedContextId: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for IamPermissionBoundedContextId must be defined, can not be undefined');
            });
    });

    test('/REST:POST iam/permission/create - Got 400 Conflict, PermissionId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/permission/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for IamPermissionId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST iam/permission/create - Got 400 Conflict, PermissionBoundedContextId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/permission/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                boundedContextId: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for IamPermissionBoundedContextId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST iam/permission/create - Got 400 Conflict, PermissionName is too large, has a maximum length of 127', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/permission/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: '********************************************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for IamPermissionName is too large, has a maximum length of 127');
            });
    });


    test('/REST:POST iam/permission/create - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/permission/create')
            .set('Accept', 'application/json')
            .send(mockData[0])
            .expect(409);
    });

    test('/REST:POST iam/permissions/paginate', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/permissions/paginate')
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
            .send({
                query:
                {
                    where:
                    {
                        id: 'f93fb9f9-3302-5320-8b65-ba7668c86803',
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
            .send({
                ...mockData[0],
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
            })
            .expect(201);
    });

    test('/REST:POST iam/permission/find', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/permission/find')
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

    test('/REST:POST iam/permission/find/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/permission/find/704f8ef6-0cfb-5615-858c-24330d0447cf')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:POST iam/permission/find/{id}', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/permission/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
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
            .send({
                ...mockData[0],
                id: '3d7d17f1-0ebb-5782-85ac-1f61d54f4e37',
            })
            .expect(404);
    });

    test('/REST:PUT iam/permission/update', () =>
    {
        return request(app.getHttpServer())
            .put('/iam/permission/update')
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

    test('/REST:DELETE iam/permission/delete/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/permission/delete/6a34eee0-e47a-53fb-8e79-0165c19e0d40')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE iam/permission/delete/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/permission/delete/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test('/GraphQL iamCreatePermission - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                expect(res.body.errors[0].extensions.originalError.statusCode).toBe(409);
                expect(res.body.errors[0].extensions.originalError.message).toContain('already exist in database');
            });
    });

    test('/GraphQL iamPaginatePermissions', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                        ...mockData[0],
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
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
                            id: '77a0eb4b-dc58-529b-aada-d0b216559be0',
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

    test('/GraphQL iamFindPermission', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                    id: '4d2957df-26d6-57b4-8d35-27fdd1873ebe',
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

    test('/GraphQL iamFindPermissionById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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

    test('/GraphQL iamUpdatePermissionById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:IamUpdatePermissionByIdInput!)
                    {
                        iamUpdatePermissionById (payload:$payload)
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
                        id: '5d85dcc9-2ccb-5647-96eb-99fa4ef851bc',
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

    test('/GraphQL iamUpdatePermissionById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:IamUpdatePermissionByIdInput!)
                    {
                        iamUpdatePermissionById (payload:$payload)
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
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.iamUpdatePermissionById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL iamUpdatePermissions', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:IamUpdatePermissionsInput! $query: QueryStatement)
                    {
                        iamUpdatePermissions (payload:$payload query:$query)
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
                expect(res.body.data.iamUpdatePermissions[0].id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL iamDeletePermissionById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                    id: '5b99bbd9-7c3c-5db8-a34d-651021f189db',
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

    test('/GraphQL iamDeletePermissionById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
