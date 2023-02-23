/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ITenantRepository } from '@app/iam/tenant/domain/tenant.repository';
import { MockTenantSeeder } from '@app/iam/tenant/infrastructure/mock/mock-tenant.seeder';
import { tenants } from '@app/iam/tenant/infrastructure/seeds/tenant.seed';
import { GraphQLConfigModule } from '@aurora/graphql/graphql-config.module';
import { IamModule } from '@api/iam/iam.module';
import * as request from 'supertest';
import * as _ from 'lodash';

// has OAuth
import { AuthenticationJwtGuard } from '@api/o-auth/shared/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@api/iam/shared/guards/authorization.guard';

// ---- customizations ----
import { OAuthModule } from '@api/o-auth/o-auth.module';

// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('tenant', () =>
{
    let app: INestApplication;
    let tenantRepository: ITenantRepository;
    let tenantSeeder: MockTenantSeeder;

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
                MockTenantSeeder,
            ],
        })
            .overrideGuard(AuthenticationJwtGuard)
            .useValue({ canActivate: () => true })
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        mockData = tenants;
        app = module.createNestApplication();
        tenantRepository = module.get<ITenantRepository>(ITenantRepository);
        tenantSeeder = module.get<MockTenantSeeder>(MockTenantSeeder);

        // seed mock data in memory database
        await tenantRepository.insert(tenantSeeder.collectionSource);

        await app.init();
    });

    test('/REST:POST iam/tenant/create - Got 400 Conflict, TenantId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for TenantId must be defined, can not be null');
            });
    });

    test('/REST:POST iam/tenant/create - Got 400 Conflict, TenantName property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for TenantName must be defined, can not be null');
            });
    });

    test('/REST:POST iam/tenant/create - Got 400 Conflict, TenantIsActive property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                isActive: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for TenantIsActive must be defined, can not be null');
            });
    });

    test('/REST:POST iam/tenant/create - Got 400 Conflict, TenantId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for TenantId must be defined, can not be undefined');
            });
    });

    test('/REST:POST iam/tenant/create - Got 400 Conflict, TenantName property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for TenantName must be defined, can not be undefined');
            });
    });

    test('/REST:POST iam/tenant/create - Got 400 Conflict, TenantIsActive property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                isActive: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for TenantIsActive must be defined, can not be undefined');
            });
    });

    test('/REST:POST iam/tenant/create - Got 400 Conflict, TenantId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for TenantId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST iam/tenant/create - Got 400 Conflict, TenantName is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: '****************************************************************************************************************************************************************************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for TenantName is too large, has a maximum length of 255');
            });
    });

    test('/REST:POST iam/tenant/create - Got 400 Conflict, TenantCode is too large, has a maximum length of 50', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                code: '***************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for TenantCode is too large, has a maximum length of 50');
            });
    });

    test('/REST:POST iam/tenant/create - Got 400 Conflict, TenantIsActive has to be a boolean value', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                isActive: 'true',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for TenantIsActive has to be a boolean value');
            });
    });

    test('/REST:POST iam/tenant/create - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant/create')
            .set('Accept', 'application/json')
            .send(mockData[0])
            .expect(409);
    });

    test('/REST:POST iam/tenants/paginate', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenants/paginate')
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
                    total: tenantSeeder.collectionResponse.length,
                    count: tenantSeeder.collectionResponse.length,
                    rows : tenantSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt', 'accountIds']))).slice(0, 5),
                });
            });
    });

    test('/REST:POST iam/tenants/get', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenants/get')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    tenantSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt', 'accountIds']))),
                );
            });
    });

    test('/REST:POST iam/tenant/find - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: '5e77bccd-e64c-5723-9cb4-dfb67de19649',
                    },
                },
            })
            .expect(404);
    });

    test('/REST:POST iam/tenant/create', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                code: 'aurora', // code is a unique key
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
            })
            .expect(201);
    });

    test('/REST:POST iam/tenant/find', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant/find')
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

    test('/REST:POST iam/tenant/find/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant/find/06b2b4cf-78ee-5db5-98bf-aad352079976')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:POST iam/tenant/find/{id}', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT iam/tenant/update - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/iam/tenant/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '35c293b5-db6e-59e0-88df-ea556972e0f4',
            })
            .expect(404);
    });

    test('/REST:PUT iam/tenant/update', () =>
    {
        return request(app.getHttpServer())
            .put('/iam/tenant/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                code: 'aurora', // code is a unique key
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:DELETE iam/tenant/delete/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/tenant/delete/cfd7f16e-0f0c-5727-ab22-0c4a9543a9d0')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE iam/tenant/delete/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/tenant/delete/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test('/GraphQL iamCreateTenant - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:IamCreateTenantInput!)
                    {
                        iamCreateTenant (payload:$payload)
                        {
                            id
                            name
                            code
                            logo
                            isActive
                            meta
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

    test('/GraphQL iamPaginateTenants', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        iamPaginateTenants (query:$query constraint:$constraint)
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
                expect(res.body.data.iamPaginateTenants).toEqual({
                    total: tenantSeeder.collectionResponse.length,
                    count: tenantSeeder.collectionResponse.length,
                    rows : tenantSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt', 'accountIds']))).slice(0, 5),
                });
            });
    });

    test('/GraphQL iamGetTenants', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        iamGetTenants (query:$query)
                        {
                            id
                            name
                            code
                            logo
                            isActive
                            meta
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
                for (const [index, value] of res.body.data.iamGetTenants.entries())
                {
                    expect(tenantSeeder.collectionResponse[index]).toEqual(expect.objectContaining(_.omit(value, ['createdAt', 'updatedAt', 'deletedAt'])));
                }
            });
    });

    test('/GraphQL iamCreateTenant', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:IamCreateTenantInput!)
                    {
                        iamCreateTenant (payload:$payload)
                        {
                            id
                            name
                            code
                            logo
                            isActive
                            meta
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        code: 'aurora', // code is a unique key
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.iamCreateTenant).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL iamFindTenant - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindTenant (query:$query)
                        {
                            id
                            name
                            code
                            logo
                            isActive
                            meta
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
                            id: 'f15a04af-0a45-54ef-9e8a-1960792a29c2',
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

    test('/GraphQL iamFindTenant', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindTenant (query:$query)
                        {
                            id
                            name
                            code
                            logo
                            isActive
                            meta
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
                expect(res.body.data.iamFindTenant.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL iamFindTenantById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        iamFindTenantById (id:$id)
                        {
                            id
                            name
                            code
                            logo
                            isActive
                            meta
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '7f0e1d2c-7f72-5cdf-afb8-85017e892e4e',
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

    test('/GraphQL iamFindTenantById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        iamFindTenantById (id:$id)
                        {
                            id
                            name
                            code
                            logo
                            isActive
                            meta
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
                expect(res.body.data.iamFindTenantById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL iamUpdateTenantById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:IamUpdateTenantByIdInput!)
                    {
                        iamUpdateTenantById (payload:$payload)
                        {
                            id
                            name
                            code
                            logo
                            isActive
                            meta
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: 'ca2019ab-646b-5d22-bc62-b85c4120d400',
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

    test('/GraphQL iamUpdateTenantById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:IamUpdateTenantByIdInput!)
                    {
                        iamUpdateTenantById (payload:$payload)
                        {
                            id
                            name
                            code
                            logo
                            isActive
                            meta
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        code: 'aurora', // code is a unique key
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.iamUpdateTenantById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL iamUpdateTenants', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:IamUpdateTenantsInput! $query: QueryStatement)
                    {
                        iamUpdateTenants (payload:$payload query:$query)
                        {
                            id
                            name
                            code
                            logo
                            isActive
                            meta
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        code: 'aurora', // code is a unique key
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
                expect(res.body.data.iamUpdateTenants[0].id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL iamDeleteTenantById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteTenantById (id:$id)
                        {
                            id
                            name
                            code
                            logo
                            isActive
                            meta
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'a33b8c38-64fa-50f6-9716-30e2a84ae986',
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

    test('/GraphQL iamDeleteTenantById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteTenantById (id:$id)
                        {
                            id
                            name
                            code
                            logo
                            isActive
                            meta
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
                expect(res.body.data.iamDeleteTenantById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    afterAll(async () =>
    {
        await tenantRepository.delete({
            queryStatement: {
                where: {},
            },
        });
        await app.close();
    });
});