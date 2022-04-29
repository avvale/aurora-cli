/* eslint-disable quotes */
/* eslint-disable key-spacing */
import * as fs from 'fs';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModuleOptions } from '@nestjs/jwt';
import { ITenantRepository } from '../../../src/@apps/iam/tenant/domain/tenant.repository';
import { MockTenantSeeder } from '../../../src/@apps/iam/tenant/infrastructure/mock/mock-tenant.seeder';
import { tenants } from '../../../src/@apps/iam/tenant/infrastructure/seeds/tenant.seed';
import { GraphQLConfigModule } from '../../../src/@aurora/graphql/graphql-config.module';
import { IamModule } from '../../../src/@api/iam/iam.module';
import * as request from 'supertest';
import * as _ from 'lodash';



// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('tenant', () =>
{
    let app: INestApplication;
    let repository: ITenantRepository;
    let seeder: MockTenantSeeder;
    const jwtOptions: JwtModuleOptions = {
        privateKey: fs.readFileSync('src/oauth-private.key', 'utf8'),
        publicKey: fs.readFileSync('src/oauth-public.key', 'utf8'),
        signOptions: {
            algorithm: 'RS256',
        },
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let mockData: any;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ...importForeignModules,
                IamModule.forRoot(jwtOptions),
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
            .compile();

        mockData        = tenants;
        app             = module.createNestApplication();
        repository      = module.get<ITenantRepository>(ITenantRepository);
        seeder          = module.get<MockTenantSeeder>(MockTenantSeeder);

        // seed mock data in memory database
        await repository.insert(seeder.collectionSource);

        await app.init();
    });

    test('/REST:POST iam/tenant/create - Got 400 Conflict, TenantId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ id: null },
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
                ...{ name: null },
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
                ...{ isActive: null },
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
                ...{ id: undefined },
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
                ...{ name: undefined },
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
                ...{ isActive: undefined },
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
                ...{ id: '*************************************' },
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
                ...{ name: '****************************************************************************************************************************************************************************************************************************************************************' },
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
                ...{ code: '***************************************************' },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for TenantCode is too large, has a maximum length of 50');
            });
    });

    test('/REST:POST iam/tenant/create - Got 400 Conflict, TenantLogo is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ logo: '****************************************************************************************************************************************************************************************************************************************************************' },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for TenantLogo is too large, has a maximum length of 255');
            });
    });

    test('/REST:POST iam/tenant/create - Got 400 Conflict, TenantIsActive has to be a boolean value', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ isActive: 'true' },
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
                    total: seeder.collectionResponse.length,
                    count: seeder.collectionResponse.length,
                    rows : seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt', 'accountIds']))).slice(0, 5),
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
                    seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt', 'accountIds']))),
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
                        id: 'ce22386f-478d-4fb3-ae52-5f945f92200d',
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
                ...{ id: '5b19d6ac-4081-573b-96b3-56964d5326a8' },
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

    test('/REST:GET iam/tenant/find/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .get('/iam/tenant/find/aadaada3-74a5-4803-8c8a-5cd7a4dbb8b6')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:GET iam/tenant/find/{id}', () =>
    {
        return request(app.getHttpServer())
            .get('/iam/tenant/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
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
                ...{ id: 'e8371640-b0b6-421f-8f3c-87660cfce4ea' },
            })
            .expect(404);
    });

    test('/REST:PUT iam/tenant/update', () =>
    {
        return request(app.getHttpServer())
            .put('/iam/tenant/update')
            .set('Accept', 'application/json')
            .send({
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                name: 'Refined Rubber Tuna',
                code: 'q1ym4k74auym2p9txlq38ta451pv5o5fg8mngspxxjhpexvbz',
                logo: 'mq7wzlpbzu84fdfmjd59o4fehi1daie38i8stjostmrc85747fl1s4swo13fulza0wi5oc0hl0dsw7ysot07uqzf982uvwp0edfh4haz7ke040p63lbyjcea502wntvkurdhpj87lesps415p9euk2kqskgarkfx3suj7pzin82rf5dkc8i9rmkdr6xefmgdhghej3k2c22ph34gzq3wiryw356bio7xvsa2dh2tednvxpayghoukrmb65msjq',
                isActive: true,
                data: { "foo" : "bar" },
                accountIds: [],
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
            .delete('/iam/tenant/delete/02b79daa-d874-48a9-9492-3084e39ac0b5')
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
                            data
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
                    total: seeder.collectionResponse.length,
                    count: seeder.collectionResponse.length,
                    rows : seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt', 'accountIds']))).slice(0, 5),
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
                            data
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
                    expect(seeder.collectionResponse[index]).toEqual(expect.objectContaining(_.omit(value, ['createdAt', 'updatedAt', 'deletedAt'])));
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
                            data
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        name: 'Generic Wooden Soap',
                        code: 'so9v2inhfe0d3xvdnvge2fksafqj8yfuqdf6s8vz0scf90em6',
                        logo: 'm7s3mds0kf5r4axwxz6z8fffkaplxpi7kpqgw7vmr2d9b8bbdl0bjy7qsmuo7hixwb1mziej6p08t92j761dnqcr80ni58taibme6vzv5pevmk6a7f3vbtbbqlwr02wazelldqstprzzs7pgyn5hcv2auzd3lw1bmxpb1vn0lns1g34lhwqb34jt03l4e0osyaq9s0swl8itv5tmwugl7ovjuncud1wc9c7bmhx8ekgiqvvlnoft9qyeryip9x',
                        isActive: true,
                        data: { "foo" : "bar" },
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
                            data
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
                            id: '71d51b77-89b2-482d-961f-324a65e57fe2',
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
                            data
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
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '88d8d733-1c3d-4988-96da-9d148758888b',
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
                            data
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

    test('/GraphQL iamUpdateTenant - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:IamUpdateTenantInput!)
                    {
                        iamUpdateTenant (payload:$payload)
                        {
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        ...{ id: 'ce69d62a-f428-4544-8c3c-dc79ee269e3d' },
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

    test('/GraphQL iamUpdateTenant', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:IamUpdateTenantInput!)
                    {
                        iamUpdateTenant (payload:$payload)
                        {
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        name: 'Ergonomic Wooden Table',
                        code: 'fsq0l78k7xaumqr6mw2ix3c97456n3tngqlh55aqqia064ojb',
                        logo: '1nxut13bvu4arbc9zl425ozxlvtz2mgogl84vnb13fsl0bb16b5hoyxmq39ewd4gjb4r5o73qbd2tj1cil88os0zvczpvu0mj6gdfq5w8yloarmhi79p67f4eaff6xbzt3onfkyqx3obhuzjnk6e91q0m576fwm811g6dt6x8dmh2ggvklri8vvso9w77k3trdlqmtknwsizdbz7dpex40lcq6scco8cj4wjrfmebuq9i2r8jq46jzqq6cw8o7',
                        isActive: false,
                        data: { "foo" : "bar" },
                        accountIds: [],
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.iamUpdateTenant.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
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
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '8f162a5a-4026-47eb-9eab-175cb122faba',
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
                            data
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
        await repository.delete({
            queryStatement: {
                where: {},
            },
        });
        await app.close();
    });
});